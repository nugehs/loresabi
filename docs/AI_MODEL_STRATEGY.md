# LoreSabi by Bashbop - AI Model Strategy

## Decision

LoreSabi should start with an OpenAI-first model stack:

- Cheap worker model: GPT-5 nano
- Main explainer model: GPT-5 mini
- Optional fallback later: Gemini Flash-Lite, DeepSeek V4 Flash, or Groq-hosted open models

This keeps the MVP simple, reliable, and cost-conscious without locking the product into a single model forever.

## Why OpenAI First

OpenAI is the best first choice for the MVP because it gives LoreSabi:

- Strong structured outputs
- Good instruction following
- Good developer experience
- Easy model upgrades
- Reliable enough quality for user-facing explainers
- A cheap nano model for background work

The goal is not to chase the absolute cheapest token price on day one. The goal is to keep costs low while avoiding messy integration and quality problems.

## Model Routing

Use GPT-5 nano for cheap, high-volume internal tasks:

- Classify user search queries
- Detect country, topic, and category
- Summarize source snippets
- Generate related questions
- Tag trends
- Normalize metadata
- Draft SEO titles and descriptions

Use GPT-5 mini for user-facing content:

- Short answers
- Full explainers
- Timelines
- "Why it matters" sections
- Country summaries
- Sensitive current affairs drafts
- Higher-quality rewrite passes

Use a stronger model later only when needed:

- High-risk current affairs
- Politically sensitive topics
- Complex history involving conflict, ethnicity, or religion
- Final editorial review for premium content

## Cost Control Rules

- Always check the database before generating.
- Store generated explainers instead of regenerating on every request.
- Keep source extraction separate from final writing.
- Use GPT-5 nano for classification and tagging.
- Use GPT-5 mini only when the output is user-facing or quality-sensitive.
- Use batch jobs for offline content generation when possible.
- Cache stable system prompts and reusable country context.
- Track token usage per task type from day one.

## Content Safety Rules

For sensitive topics, the model must:

- Use multiple sources.
- Separate facts from interpretation.
- Avoid inflammatory wording.
- Show uncertainty where claims are disputed.
- Mark drafts as `needs_review` before publication.

Sensitive topics include:

- Politics
- Elections
- Religion
- Ethnicity
- Conflict
- Crime
- Public health
- Active protests
- Breaking news

## Fallback Strategy

Do not add fallback providers in the MVP unless OpenAI cost or availability becomes a real problem.

Possible future fallbacks:

- Gemini Flash-Lite for cheap multimodal processing.
- DeepSeek V4 Flash for low-cost draft generation.
- Groq-hosted open models for very fast simple classification.

Model fallback should be implemented behind an internal provider interface so the app can route tasks without changing product code.

## MVP Environment Variables

Expected starting variables:

```text
OPENAI_API_KEY=
AI_CHEAP_MODEL=gpt-5-nano
AI_MAIN_MODEL=gpt-5-mini
```

Later optional variables:

```text
GEMINI_API_KEY=
DEEPSEEK_API_KEY=
GROQ_API_KEY=
```
