#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# White.Lev.Travel — одноразовий bootstrap на сервері (Debian, системний nginx,
# нативний Postgres, docker compose). Запускати НА СЕРВЕРІ під root:
#
#     ssh root@91.245.76.78
#     cd /opt/white.lev.travel/web && git pull --ff-only && bash server-bootstrap.sh
#
# Скрипт ідемпотентний — можна ганяти повторно. Сусідні сайти (green.lev.travel
# та ін.) не чіпає: Postgres тільки reload (не restart), nginx — лише після
# `nginx -t`.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

DOMAIN="white.lev.travel"
APP_PORT="3300"                 # порт docker-контейнера на 127.0.0.1
ACME_WEBROOT="/var/www/certbot"
CERT_EMAIL="gor@miotex.com"
COMPOSE_DIR="/opt/${DOMAIN}/web"
NGINX_SITE="/etc/nginx/sites-available/white-lev-travel"
NGINX_LINK="/etc/nginx/sites-enabled/white-lev-travel"

say() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31mПОМИЛКА: %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" = "0" ] || die "запусти під root"

# ─── 1. Postgres: пустити docker-мережу до бази whitelevtravel ────────────────
say "Postgres: pg_hba.conf"
HBA="$(sudo -u postgres psql -tAc 'SHOW hba_file;')"
[ -f "$HBA" ] || die "не знайшов pg_hba.conf ($HBA)"

HBA_LINE='host    whitelevtravel    wlt    172.16.0.0/12    scram-sha-256'
if grep -qF '172.16.0.0/12' "$HBA" && grep -q 'whitelevtravel' "$HBA" \
   && grep -E '^\s*host\s+whitelevtravel\s+wlt\s+172\.16\.0\.0/12' "$HBA" >/dev/null; then
  echo "  запис уже є — пропускаю"
else
  cp -a "$HBA" "/root/pg_hba.conf.bak.$(date +%s)"
  echo "$HBA_LINE" >> "$HBA"
  echo "  додав: $HBA_LINE"
  echo "  бекап: /root/pg_hba.conf.bak.*"
fi
sudo -u postgres psql -tAc 'SELECT pg_reload_conf();' >/dev/null
echo "  pg_reload_conf() OK"

# ─── 2. Перезапустити застосунок (міграції + сід — самі при старті) ───────────
say "docker compose: перезапуск web"
cd "$COMPOSE_DIR" || die "немає $COMPOSE_DIR"
BUILD_FLAG="${BUILD:+--build}"          # BUILD=1 bash ... → перезбирати образ
docker compose up -d ${BUILD_FLAG} --remove-orphans web
docker compose ps

say "Чекаю готовності застосунку (міграції + сід можуть тривати ~1–3 хв)"
DEADLINE=$(( $(date +%s) + 300 ))       # до 5 хв
code_admin="000"
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  code_admin="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${APP_PORT}/admin" || true)"
  case "$code_admin" in
    200|301|302|307|308) echo "  /admin -> HTTP ${code_admin} — готово"; break ;;
    *) printf '  ще стартує (HTTP %s)…\r' "$code_admin"; sleep 5 ;;
  esac
done
echo
if ! case "$code_admin" in 200|301|302|307|308) true ;; *) false ;; esac; then
  echo "  --- останні логи ---"
  docker compose logs --tail 60 web || true
  die "застосунок не піднявся за 5 хв (HTTP ${code_admin}). Дивись логи вище."
fi

# ─── 3. nginx: HTTP-вхост (ACME + редірект) ──────────────────────────────────
say "nginx: HTTP-вхост"
cat > "$NGINX_SITE" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root ${ACME_WEBROOT};
        default_type text/plain;
        try_files \$uri =404;
    }
    location / {
        return 308 https://${DOMAIN}\$request_uri;
    }
}
EOF
ln -sf "$NGINX_SITE" "$NGINX_LINK"
nginx -t
systemctl reload nginx
echo "  HTTP-вхост активний"

# ─── 4. TLS-сертифікат ──────────────────────────────────────────────────────
say "certbot: сертифікат для ${DOMAIN}"
if [ -d "/etc/letsencrypt/live/${DOMAIN}" ]; then
  echo "  сертифікат уже є — пропускаю випуск"
else
  mkdir -p "$ACME_WEBROOT"
  # --cert-name: окрема lineage, щоб certbot не плутав із наявним сертифікатом
  # для IP (91.245.76.78) на тому ж webroot і не питав про --expand.
  certbot certonly --webroot -w "$ACME_WEBROOT" \
    -d "$DOMAIN" --cert-name "$DOMAIN" \
    --non-interactive --agree-tos -m "$CERT_EMAIL"
fi

# ─── 5. nginx: повний вхост (HTTP + HTTPS-проксі на контейнер) ────────────────
say "nginx: HTTPS-вхост"
cat > "$NGINX_SITE" <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN};

    location ^~ /.well-known/acme-challenge/ {
        root ${ACME_WEBROOT};
        default_type text/plain;
        try_files \$uri =404;
    }
    location / {
        return 308 https://${DOMAIN}\$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name ${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:WhiteLevSSL:10m;

    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    client_max_body_size 20m;

    location / {
        proxy_pass http://127.0.0.1:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 60s;
    }
}
EOF
nginx -t
systemctl reload nginx

# ─── 6. Підсумкова перевірка ────────────────────────────────────────────────
say "Перевірка ззовні"
sleep 2
printf '  https://%s          -> HTTP %s\n' "$DOMAIN" "$(curl -sS -o /dev/null -w '%{http_code}' "https://${DOMAIN}/" || echo ERR)"
printf '  https://%s/admin    -> HTTP %s\n' "$DOMAIN" "$(curl -sS -o /dev/null -w '%{http_code}' "https://${DOMAIN}/admin" || echo ERR)"

say "Готово."
cat <<EOF

  Сайт:   https://${DOMAIN}
  Адмінка: https://${DOMAIN}/admin   (логін — ADMIN_EMAIL/ADMIN_PASSWORD з ${COMPOSE_DIR}/.env)

  Автодеплой при пуші в main уже налаштований (.github/workflows/deploy.yml).
  Лишилось один раз додати в GitHub → Settings → Secrets and variables → Actions:
    DEPLOY_HOST = 91.245.76.78
    DEPLOY_USER = root
    DEPLOY_PORT = 22
    DEPLOY_PATH = /opt/${DOMAIN}
    DEPLOY_SSH_KEY = <приватний ключ, що має доступ root на сервер>
EOF
