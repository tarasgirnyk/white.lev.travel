# White.Lev.Travel — сайт («Білий Лев»)

Тримовний (UA / EN / PL) сайт заміського комплексу приватних будинків:
лендінг, каталог будинків (Compact / Comfort / VIP), сторінки типів,
економіка для інвестора, локація, інтерактивний генплан, блог/новини та
форма заявок. Дизайн — темний монохром бренду «Білий Лев» + стриманий
теплий акцент.

## Стек

- **Next.js 15** (App Router) + **React 19**
- **Payload CMS 3** (адмінка на `/admin`, REST на `/api/*`, GraphQL на `/api/graphql`)
- **PostgreSQL 16** (на продакшн-сервері — нативний інстанс на хості, не в контейнері)
- **Tailwind CSS v4**
- Деплой: **Docker Compose** (застосунок + Caddy з авто-TLS), автодеплой — **GitHub Actions** (`.github/workflows/deploy.yml`)

## Локальний запуск

```bash
cd web
cp .env.example .env         # заповни PAYLOAD_SECRET, DATABASE_URI, ADMIN_*
pnpm install
pnpm payload migrate         # створити схему БД
pnpm dev                     # http://localhost:3000  (адмінка: /admin)
```

При першому запуску з `SEED_ON_INIT=true` база наповнюється трьома типами
будинків (Compact/Comfort/VIP) у трьох мовах і створюється адмін
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
  seed/                       # автосід (будинки з planning/11,13,15 + 16)
  migrations/                # міграції схеми БД (комітяться)
  middleware.ts              # редірект локалі + заголовок x-locale
```

## Деплой (сервер, нативний Postgres + Docker)

Сайт використовує **вже наявний на сервері Postgres** (не піднімає свій
контейнер із БД — щоб не конфліктувати з іншими проєктами на цьому ж
сервері). `web`-контейнер бачить хост через `host.docker.internal`
(налаштовано в `docker-compose.yml` через `extra_hosts: host-gateway`).

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

### 2. Один раз — перше розгортання

```bash
git clone https://github.com/tarasgirnyk/white.lev.travel.git /opt/white.lev.travel
cd /opt/white.lev.travel/web
cp .env.production.example .env
# заповни: PAYLOAD_SECRET, DATABASE_URI (з паролем із кроку 1),
# ADMIN_PASSWORD, SITE_ADDRESS (домен має вже вказувати на цей сервер)
./deploy.sh                    # git pull + docker compose up -d --build
```

`docker-compose.yml` піднімає:
- **web** — Next/Payload; на старті застосовує міграції, потім сідить БД (onInit);
- **caddy** — реверс-проксі з автоматичним HTTPS для `SITE_ADDRESS`.

Медіа зберігаються у volume `media`. Адмінка — `https://<домен>/admin`.

### 3. Автодеплой при кожному пуші в `main`

У GitHub репозиторію → **Settings → Secrets and variables → Actions**
додай секрети: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`
(приватний ключ окремого deploy-юзера/ключа), `DEPLOY_PORT`,
`DEPLOY_PATH` (`/opt/white.lev.travel`). Після цього workflow
`.github/workflows/deploy.yml` сам заходить по SSH і виконує
`web/deploy.sh` при кожному пуші в `main` — без ручного доступу.

> ⚠️ Усі фінансові цифри на сайті — гіпотези за ринком 2026 і не є
> інвестиційною порадою (див. `planning/16_investor_package.md`).
