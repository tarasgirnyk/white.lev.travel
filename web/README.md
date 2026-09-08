# White.Lev.Travel — сайт («Білий Лев»)

Тримовний (UA / EN / PL) сайт заміського комплексу приватних будинків:
лендінг, каталог будинків (Compact / Comfort / VIP), сторінки типів,
економіка для інвестора, локація, інтерактивний генплан, блог/новини та
форма заявок. Дизайн — темний монохром бренду «Білий Лев» + стриманий
теплий акцент.

## Стек

- **Next.js 15** (App Router) + **React 19**
- **Payload CMS 3** (адмінка на `/admin`, REST на `/api/*`, GraphQL на `/api/graphql`)
- **PostgreSQL 16**
- **Tailwind CSS v4**
- Деплой: **Docker Compose** (застосунок + Postgres + Caddy з авто-TLS)

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

## Деплой (сервер із Docker)

```bash
cd web
cp .env.production.example .env   # заповни секрети та домен
./deploy.sh                        # git pull + docker compose up -d --build
```

`docker-compose.yml` піднімає:
- **db** — Postgres 16 (дані у volume `db-data`),
- **web** — Next/Payload; на старті застосовує міграції, потім сідить БД (onInit),
- **caddy** — реверс-проксі з автоматичним HTTPS для `SITE_ADDRESS`.

Медіа зберігаються у volume `media`. Адмінка — `https://<домен>/admin`.

> ⚠️ Усі фінансові цифри на сайті — гіпотези за ринком 2026 і не є
> інвестиційною порадою (див. `planning/16_investor_package.md`).
