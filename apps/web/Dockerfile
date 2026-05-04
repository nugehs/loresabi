FROM node:22-alpine AS base
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/database/package.json packages/database/package.json
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev", "-w", "@loresabi/web"]
