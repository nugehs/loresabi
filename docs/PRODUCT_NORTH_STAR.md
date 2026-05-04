# LoreSabi Product North Star

## The Product

LoreSabi helps people understand countries through the questions people are asking now.

The core loop is:

```text
Question or trend
-> simple context answer
-> source/review status
-> related questions
```

## What It Is

- A country context product.
- A curiosity and trends explainer.
- A plain-English layer over culture, current affairs, pop culture, history, names, flags, slang, and symbols.
- A reviewed knowledge product where AI helps behind the scenes.

## What It Is Not

- Not Wikipedia.
- Not a generic chatbot.
- Not a news feed.
- Not an admin dashboard.
- Not an AI writing toy.
- Not a country profile directory.

## Public Surface

Public navigation should focus on:

- Search
- Trends
- Countries
- Saved

Internal routes are useful, but they must not define the user-facing product:

- `/drafts`
- `/editorial`
- `/attribution`
- `/ops`

These are production tools, not the product promise.

## Content Rule

AI can draft. AI cannot verify.

Every answer should clearly be one of:

- Published and source-reviewed.
- Draft / context preview.
- Tracked question with no explainer yet.

## Trend Rule

LoreSabi must not present seeded or guessed rows as live trending searches.

Every public signal must show its source label:

- Google Trends
- Wikipedia pageviews
- News signal
- Internal search
- Editorial seed

Use `curiosity signals` when the page mixes source types. Use `trending searches` only when the underlying source is real search-demand data.

## No-Drift Rule

Before adding a feature, ask:

Does this help a user understand a country through a question, trend, or cultural/current-affairs context?

If no, park it.
