# LoreSabi

LoreSabi by Bashbop is a web-first knowledge product for understanding countries through simple explainers, culture, current affairs, pop culture, national symbols, and live curiosity signals.

## Product Direction

LoreSabi helps users search questions like:

- Why is Nigeria called Nigeria?
- Did Nigeria have another flag before?
- What does Ghana's Black Star mean?
- Why are people protesting in France?
- What does japa mean?

The product returns structured answers with short summaries, timelines, images, related questions, and sources.

## MVP Focus

- Web-first, mobile-friendly application
- Country pages
- Searchable explainers
- Trending curiosity by country
- Source and image attribution
- Internal AI-assisted research and writing pipeline

## Documentation

- [Product brief](docs/PRODUCT_BRIEF.md)
- [Roadmap](docs/ROADMAP.md)
- [Tasks](docs/TASKS.md)
- [Content plan](docs/CONTENT_PLAN.md)
- [Technical architecture](docs/TECH_ARCHITECTURE.md)
- [Web layout spec](docs/WEB_LAYOUT_SPEC.md)
- [Design foundation](docs/DESIGN_FOUNDATION.md)
- [AI model strategy](docs/AI_MODEL_STRATEGY.md)

## Current Status

This repository now contains the initial TypeScript monorepo scaffold: Next.js web app, NestJS API app, shared packages, Docker development setup, Prisma schema, initial migration, and Nigeria starter seed content.

## Local Development

Start local Postgres on host port `15432`:

```sh
docker compose up -d postgres
```

Apply the database schema and seed starter content:

```sh
npm run db:migrate
npm run db:seed
```

Run the web app and API:

```sh
npm run dev:web
npm run dev:api
```

## Figma

Initial design file:

https://www.figma.com/design/fy2ZD2q6dXKusqCsZHOxtE
