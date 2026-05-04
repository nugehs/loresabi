# LoreSabi by Bashbop - Technical Architecture

## Recommended Stack

- Frontend: Next.js + TypeScript
- Styling: Tailwind CSS
- UI: custom components based on Figma, optionally shadcn/ui
- Database: Postgres
- DB provider: Supabase or Neon
- ORM: Prisma
- Auth: Clerk or Supabase Auth later
- Storage: Supabase Storage or Cloudflare R2
- AI: OpenAI API
- Search: Postgres full-text first, vector search later
- Jobs: Inngest or Trigger.dev
- Hosting: Vercel
- Analytics: PostHog
- Payments: Stripe later

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

## Technical Principle

Do not generate every answer from scratch on every request. Generate, store, review, reuse, and update explainers over time so the product becomes a durable knowledge library.
