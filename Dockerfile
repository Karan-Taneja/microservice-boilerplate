FROM node:16.6.0-alpine AS base
WORKDIR /usr/src/app
COPY package*.json ./

FROM base AS development
LABEL stage=intermediate
ENV NODE_ENV=development
RUN pnpm install
COPY . .
CMD ["pnpm", "run", "dev"]

FROM development AS builder
RUN pnpm run build

FROM base AS production
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile
COPY --from=builder /usr/src/app/src/docs ./src/docs
COPY --from=builder /usr/src/app/dist ./src
CMD ["node", "src/server.js"]
