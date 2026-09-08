# syntax=docker/dockerfile:1
FROM node:22-alpine
RUN apk add --no-cache libc6-compat && corepack enable
WORKDIR /app

# 1) Залежності (усі — потрібні для збірки)
COPY package.json pnpm-lock.yaml* ./
RUN pnpm config set onlyBuiltDependencies[] sharp 2>/dev/null || true
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm rebuild sharp esbuild || true

# 2) Код + збірка
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV PAYLOAD_SECRET=build-time-placeholder
ENV DATABASE_URI=postgres://build:build@localhost:5432/build
RUN pnpm build

# 3) Рантайм
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV MEDIA_DIR=/app/media
RUN mkdir -p /app/media
EXPOSE 3000

# Спершу застосувати міграції (без сіду), потім старт (сід у onInit при першому запиті)
CMD ["sh","-c","SEED_ON_INIT=false pnpm payload migrate && pnpm start"]
