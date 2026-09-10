#!/usr/bin/env bash
# Деплой White.Lev.Travel на сервер.
# Запускати з теки web/ на сервері (де лежить docker-compose.yml та .env).
set -euo pipefail

echo "==> git fetch + ff-only pull (main)"
if [ -d ../.git ]; then
  # Локальні зміни в самому deploy.sh (напр. chmod) не мають блокувати pull.
  git -C .. checkout -- web/deploy.sh 2>/dev/null || true
  git -C .. fetch origin main
  before=$(git -C .. rev-parse HEAD)
  if ! git -C .. merge --ff-only origin/main; then
    echo "ПОМИЛКА: не вдалося зробити fast-forward до origin/main." >&2
    echo "  Розберися з локальними змінами в /opt/white.lev.travel і повтори." >&2
    exit 1
  fi
  after=$(git -C .. rev-parse HEAD)
  if [ "$before" = "$after" ]; then
    echo "  вже на актуальному коміті ($after)"
  else
    echo "  $before -> $after"
  fi
else
  echo "ПОМИЛКА: $(cd .. && pwd) — не git-репозиторій." >&2
  exit 1
fi

echo "==> docker compose up -d --build"
docker compose up -d --build --remove-orphans

echo "==> чекаю готовності /admin"
for _ in $(seq 1 45); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${APP_PORT:-3300}/admin" || true)
  case "$code" in 200|301|302|307|308) break ;; esac
  sleep 4
done
echo "  /admin -> HTTP ${code:-?}"

echo "==> статус"
docker compose ps
echo "Готово. Сайт: https://${SITE_ADDRESS:-ordo.lev.plus}  ·  Адмінка: /admin"
