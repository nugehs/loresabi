# Segzy Setup Actions

These are the remaining things Codex cannot complete without your private accounts or DNS access.

## Required Before Public Deployment

- [ ] Create or confirm the Coolify Postgres service.
- [ ] Add `DATABASE_URL` to the Coolify API service.
- [x] Add local DeepSeek key for draft generation.
- [ ] Add these AI variables to production when deploying:
  - `AI_PROVIDER=deepseek`
  - `DEEPSEEK_API_KEY`
  - `DEEPSEEK_BASE_URL=https://api.deepseek.com`
  - `DEEPSEEK_MODEL=deepseek-v4-flash`
- [ ] Create an OpenAI API key later only if switching provider or adding a higher-quality review pass.
- [ ] Create or connect the Coolify web and API services.
- [ ] Add `NEXT_PUBLIC_API_URL` for the production API URL.
- [ ] Set `DEFAULT_VIEWER_COUNTRY`, for example `GB`.
- [ ] Point `loresabi.com` DNS when the first public deployment is ready.

## Parked: Paid Features

- [ ] Create Stripe account.
- [ ] Decide pricing for Pro, school packs, or country packs.
- [ ] Add Stripe keys only after the Pro feature shape is final.

Payment is on hold for now. Do not treat Stripe as a launch blocker.

## Required Before Real Current-Affairs Launch

- [ ] Choose allowed news/current-affairs sources.
- [ ] Decide whether sensitive topics need manual approval before appearing in public search.
- [ ] Decide whether user-generated search logs can be used for public trend signals.
