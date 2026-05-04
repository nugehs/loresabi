# LoreSabi by Bashbop - Technical Architecture

## Recommended Stack

- Repository: TypeScript monorepo
- Frontend app: Next.js + TypeScript
- Backend API: NestJS + TypeScript
- Styling: Tailwind CSS
- UI: custom components based on Figma, optionally shadcn/ui
- Database: Postgres
- DB provider: Supabase or Neon
- ORM: Prisma
- Auth: Clerk or Supabase Auth later
- Storage: Supabase Storage or Cloudflare R2
- AI: provider-based API layer, DeepSeek active locally first, OpenAI optional later
- Search: Postgres full-text first, vector search later
- Jobs: BullMQ for NestJS workers, or Trigger.dev/Inngest if managed jobs are preferred
- Hosting: Vercel for web, Render/Fly.io/Railway for API
- Analytics: PostHog
- Payments: Stripe later

## Monorepo Structure

```text
loresabi/
  apps/
    web/        # Next.js public web application
    api/        # NestJS backend API and worker entrypoint
  packages/
    database/   # Prisma schema and generated client
    shared/     # Shared TypeScript types, constants, helpers
  docs/
```

Next.js owns public pages, SEO, and the user experience. NestJS owns backend APIs, content workflows, AI orchestration, review workflows, and future billing/auth integrations.

## Backend Modules

Initial NestJS modules:

- CountriesModule
- ExplainersModule
- SourcesModule
- ImagesModule
- TrendsModule
- SearchModule
- AiModule
- ReviewModule

Later NestJS modules:

- UsersModule
- BillingModule
- SubscriptionsModule
- AudioModule
- NotificationsModule

## Docker

Development Docker setup is included at the repo root.

Services:

- `web`: Next.js app on port `3000`
- `api`: NestJS API on port `4000`
- `postgres`: local Postgres database on port `5432`

Use Docker for local parity when database-backed features begin. For early UI-only work, running `npm run dev:web` directly is also fine.

## App Structure

Expected routes:

- `/`
- `/countries`
- `/countries/[countrySlug]`
- `/countries/[countrySlug]/[topicSlug]`
- `/search`
- `/trends`
- `/trends/[countrySlug]`
- `/saved`
- `/pro`

## Core Data Model

Initial tables:

- users
- countries
- topics
- explainers
- sources
- images
- trends
- search_logs
- saved_items

Later tables:

- subscriptions
- content_reviews
- source_claims
- translations
- audio_briefings
- country_packs

## Content Flow

```text
User searches
↓
Check existing explainers in DB
↓
If found: show structured explainer
↓
If missing: create draft from trusted sources
↓
Store draft as needs_review
↓
Publish after review
```

## Internal Worker Pipeline

Start with three workers:

1. Research worker
   - Finds sources
   - Extracts claims
   - Saves source metadata

2. Explainer worker
   - Writes short answer
   - Creates context, timeline, related questions
   - Keeps output structured

3. Image worker
   - Finds reusable images
   - Checks license and attribution
   - Saves image metadata

Later workers:

- Trend scout
- Fact check
- Translation
- Audio briefing
- Update checker

## AI Model Strategy

LoreSabi should use a tiered model setup instead of one model for every task.

Current provider:

- DeepSeek

Default models:

- `deepseek-v4-flash` for first-pass internal drafts.
- OpenAI `gpt-5-mini` later for higher-quality user-facing or sensitive drafting.

Use GPT-5 nano for:

- Query classification
- Country/topic/category detection
- Source snippet summarization
- Related question generation
- Metadata tagging
- Trend classification

Use GPT-5 mini for:

- Short answer generation
- Full explainer drafting
- Timeline generation
- "Why it matters" sections
- Sensitive topics such as politics, ethnicity, religion, conflict, elections, and active current affairs

Potential fallback providers:

- Gemini Flash-Lite for low-cost multimodal or backup generation.
- DeepSeek V4 Flash for low-cost drafting experiments.
- Groq-hosted open models for ultra-fast, simple classification tasks.

Do not expose provider choice to users in the MVP. Keep model routing internal.

## Technical Principle

Do not generate every answer from scratch on every request. Generate, store, review, reuse, and update explainers over time so the product becomes a durable knowledge library.
