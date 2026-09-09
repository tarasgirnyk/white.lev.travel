# White.Lev.Travel — сайт («Білий Лев»)

Тримовний (UA / EN / PL) сайт заміського комплексу приватних будинків:
лендінг, каталог будинків (4 тематичні Comfort для двох дорослих), сторінки типів,
економіка для інвестора, локація, інтерактивний генплан, блог/новини та
форма заявок. Дизайн — темний монохром бренду «Білий Лев» + стриманий
теплий акцент.

## Стек

- **Next.js 15** (App Router) + **React 19**
- **Payload CMS 3** (адмінка на `/admin`, REST на `/api/*`, GraphQL на `/api/graphql`)
- **PostgreSQL 16** (на продакшн-сервері — нативний інстанс на хості, не в контейнері)
- **Tailwind CSS v4**
- Деплой: **Docker Compose** (застосунок, слухає локально на 127.0.0.1), TLS/роутинг — системний **nginx** на сервері (як в інших проєктів на цьому хості); автодеплой — **GitHub Actions** (`.github/workflows/deploy.yml`)

## Локальний запуск

```bash
cd web
cp .env.example .env         # заповни PAYLOAD_SECRET, DATABASE_URI, ADMIN_*
pnpm install
pnpm payload migrate         # створити схему БД
pnpm dev                     # http://localhost:3000  (адмінка: /admin)
```

При першому запуску з `SEED_ON_INIT=true` база наповнюється чотирма тематичними Comfort —
(Адам і Єва / Пікассо / Max Royal / Ромео і Джульєтта) у трьох мовах і створюється адмін
(`ADMIN_EMAIL` / `ADMIN_PASSWORD`).

## Структура

```
web/src/
  app/(frontend)/[locale]/   # публічний сайт (uk|en|pl)
  app/(payload)/             # адмінка + API Payload
  collections/               # Houses, Posts, Media, Inquiries, Users
  globals/Settings.ts        # контакти сайту
  components/                 # Header, Footer, HouseCard, HouseSvg, Masterplan, InquiryForm…
  i18n/                       # локалі + словники UI (uk/en/pl)
  seed/                       # автосід (Comfort з planning/13 та 25–30)
  migrations/                # міграції схеми БД (комітяться)
  middleware.ts              # редірект локалі + заголовок x-locale
```

## Деплой (сервер, нативний Postgres + системний nginx)

Сайт використовує **вже наявний на сервері Postgres** (не піднімає свій
контейнер із БД — щоб не конфліктувати з іншими проєктами на цьому ж
сервері). `web`-контейнер бачить хост через `host.docker.internal`
(налаштовано в `docker-compose.yml` через `extra_hosts: host-gateway`).

TLS і роутинг за доменом бере на себе **системний nginx** на хості (порти
80/443 вже зайняті ним під інші проєкти) — так само, як для
green.lev.travel та інших сайтів на цьому сервері. Контейнер `web`
публікується лише локально на `127.0.0.1:3300`.

### 1. Один раз — підготувати базу в нативному Postgres

На сервері, під користувачем, що має доступ до `psql`:

```bash
sudo -u postgres psql <<'SQL'
CREATE USER wlt WITH PASSWORD 'постав-свій-надійний-пароль';
CREATE DATABASE whitelevtravel OWNER wlt;
SQL
```

Postgres має слухати інтерфейс, видимий контейнерам (docker-міст,
зазвичай `172.17.0.0/16`, або весь `0.0.0.0`, якщо порт і так закритий
файрволом ззовні):

```bash
# postgresql.conf
listen_addresses = '*'          # або конкретний IP докер-мосту

# pg_hba.conf — дозволити підключення з докер-мережі
host    whitelevtravel    wlt    172.17.0.0/16    scram-sha-256
```

Після правок — `systemctl restart postgresql`. Переконайся, що порт
5432 не відкритий назовні у файрволі (тільки з докер-мережі/локально).

### 2. Один раз — nginx-вхост і TLS-сертифікат

За зразком інших сайтів на сервері (`/etc/nginx/sites-available/`),
створи `/etc/nginx/sites-available/white-lev-travel`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name white.lev.travel;
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
        default_type text/plain;
        try_files $uri =404;
    }
    location / {
        return 308 https://white.lev.travel$request_uri;
    }
}
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name white.lev.travel;
    ssl_certificate /etc/letsencrypt/live/white.lev.travel/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/white.lev.travel/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:WhiteLevSSL:10m;
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    client_max_body_size 20m;
    location / {
        proxy_pass http://127.0.0.1:3300;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_read_timeout 60s;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/white-lev-travel /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx     # спершу тільки HTTP-блок відпрацює (SSL-файлів ще нема)
certbot certonly --webroot -w /var/www/certbot -d white.lev.travel
nginx -t && systemctl reload nginx     # тепер підхопить сертифікат і 443-блок
```

### 3. Один раз — перше розгортання застосунку

```bash
git clone https://github.com/tarasgirnyk/white.lev.travel.git /opt/white.lev.travel
cd /opt/white.lev.travel/web
cp .env.production.example .env
# заповни: PAYLOAD_SECRET, DATABASE_URI (з паролем із кроку 1), ADMIN_PASSWORD
./deploy.sh                    # git pull + docker compose up -d --build
```

`docker-compose.yml` піднімає **web** (Next/Payload на 127.0.0.1:3300;
на старті застосовує міграції, потім сідить БД через onInit). Медіа —
у volume `media`. Адмінка — `https://white.lev.travel/admin`.

### 4. Автодеплой при кожному пуші в `main`

У GitHub репозиторію → **Settings → Secrets and variables → Actions**
додай секрети: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`
(приватний ключ окремого deploy-юзера/ключа), `DEPLOY_PORT`,
`DEPLOY_PATH` (`/opt/white.lev.travel`). Після цього workflow
`.github/workflows/deploy.yml` сам заходить по SSH і виконує
`web/deploy.sh` при кожному пуші в `main` — без ручного доступу.

> ⚠️ Усі фінансові цифри на сайті — гіпотези за ринком 2026 і не є
> інвестиційною порадою (див. `planning/16_investor_package.md`).


## Актуальна концепція 08.09.2026

Чотири Comfort, кожен тільки для 2 дорослих 18+, без дітей і додаткових місць. Необхідне оснащення, доступне серійне виконання, чотири інтер’єри. Публічний каталог містить чотири погоджені slug з `src/seed/data.ts`; дані цих тем читаються з CMS і редагуються через адмінку. `src/lib/comfort.ts` надає початкові дані для відсутніх записів; зображення за замовчуванням — `public/concepts/`. Грошові показники та площі null до нового кошторису; UI показує «Уточнюється».

Історичні CMS-записи не видаляються й не входять до поточної публічної серії. Seed створює відсутні тематичні slug; наявні записи пропускає. Seed не перезаписує наявні теми й контакти. Зміни чотирьох тематичних записів у CMS відображаються в каталозі; старі slug compact/comfort/vip залишаються поза ним. Форма передає тип comfort, назву теми — у повідомленні заявки; схему БД не змінено.
