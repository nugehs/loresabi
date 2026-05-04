# LoreSabi by Bashbop - AI Model Strategy

## Decision

LoreSabi should use a provider-based AI layer.

Current local provider:

- DeepSeek API
- Default model: `deepseek-v4-flash`

Later optional provider:

- OpenAI API
- Main explainer model: `gpt-5-mini`
- Cheap worker model: decide when background workers are active

This keeps the product moving now without making the code depend permanently on one AI vendor.

## Why DeepSeek Now

DeepSeek is the current practical choice because the key is already available and the API is OpenAI-compatible enough for the explainer draft flow.

Use it for:

- Internal draft generation
- Short explainer starting points
- Metadata and category suggestions later

DeepSeek output must still be treated as draft material. Published current affairs, politics, history, ethnicity, religion, public health, and conflict topics need source review before going live.

## OpenAI Later

OpenAI can be added later by setting `OPENAI_API_KEY` and switching `AI_PROVIDER=openai`.

Use OpenAI for:

- Higher quality rewrite passes
- More sensitive explainers
- Structured output-heavy workers
- Production content review workflows

## Model Routing

Use the cheapest reliable model for internal worker tasks:

- Classify user search queries
- Detect country, topic, and category
- Summarize source snippets
- Generate related questions
- Tag trends
- Normalize metadata
- Draft SEO titles and descriptions

Use a stronger model for user-facing content:

- Short answers
- Full explainers
- Timelines
- "Why it matters" sections
- Country summaries
- Sensitive current affairs drafts
- Higher-quality rewrite passes

## Cost Control Rules

- Always check the database before generating.
- Store generated explainers instead of regenerating on every request.
- Keep source extraction separate from final writing.
- Use batch jobs for offline content generation when possible.
- Cache stable prompts and reusable country context.
- Track token usage per task type before public launch.

## Content Safety Rules

For sensitive topics, the model must:

- Use multiple sources.
- Separate facts from interpretation.
- Avoid inflammatory wording.
- Show uncertainty where claims are disputed.
- Keep drafts in review before publication.

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

## Environment Variables

Current local variables:

```text
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

Later optional variables:

```text
OPENAI_API_KEY=
AI_MAIN_MODEL=gpt-5-mini
```
