#!/usr/bin/env bash
# Деплой White.Lev.Travel на сервер.
# Запускати з теки web/ на сервері (де лежить docker-compose.yml та .env).
set -euo pipefail

echo "==> git pull (main)"
git -C .. pull --ff-only origin main || echo "  (пропущено: не git-репозиторій або немає доступу)"

echo "==> docker compose up -d --build"
docker compose up -d --build

echo "==> статус"
docker compose ps
echo "Готово. Сайт: https://${SITE_ADDRESS:-white.lev.travel}  ·  Адмінка: /admin"
