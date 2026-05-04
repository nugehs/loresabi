# Segzy Setup Actions

These are the remaining things Codex cannot complete without your private accounts, billing, or DNS access.

## Required Before Public Deployment

- [ ] Create production Postgres database. Recommended for now: Neon, because it is simple with Vercel and has a generous serverless flow.
- [ ] Add `DATABASE_URL` to Vercel and any API hosting environment.
- [ ] Create an OpenAI API key and set `OPENAI_API_KEY`.
- [ ] Confirm model defaults:
  - `AI_CHEAP_MODEL=gpt-5-nano`
  - `AI_MAIN_MODEL=gpt-5-mini`
- [ ] Create or connect the Vercel project.
- [ ] Add `NEXT_PUBLIC_API_URL` for the production API URL.
- [ ] Point `loresabi.com` DNS when the first public deployment is ready.

## Required Before Paid Features

- [ ] Create Stripe account.
- [ ] Decide pricing for Pro, school packs, or country packs.
- [ ] Add Stripe keys only after the Pro feature shape is final.

## Required Before Real Current-Affairs Launch

- [ ] Choose allowed news/current-affairs sources.
- [ ] Decide whether sensitive topics need manual approval before appearing in public search.
- [ ] Decide whether user-generated search logs can be used for public trend signals.
