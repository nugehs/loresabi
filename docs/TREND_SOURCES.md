# LoreSabi Trend Sources

LoreSabi must not present guessed or seeded content as real trending demand.

The public product can show a trend only when the source type is visible beside the item. If the source is not live yet, the row must be labelled as an editorial seed or prototype seed.

## Source Hierarchy

1. Google Trends
   - Best fit for real search demand.
   - Official access is currently through the Google Trends API alpha.
   - Use only official access or a provider with clear terms.
   - Product label: `Google Trends`.
   - Reference: https://developers.google.com/search/apis/trends

2. Wikimedia Pageviews
   - Reliable public proxy for what people are reading and looking up.
   - Useful for country pages, historical figures, pop culture, flags, elections, and current events.
   - Product label: `Wikipedia pageviews`.
   - Reference: https://doc.wikimedia.org/generated-data-platform/aqs/analytics-api/reference/page-views.html

3. GDELT
   - Reliable current-affairs and news-attention signal.
   - Useful for topics that are being covered widely in public news sources.
   - Product label: `News signal`.
   - Reference: https://blog.gdeltproject.org/gdelt-doc-2-0-api-debuts/

4. Internal Search
   - Real signal from LoreSabi users.
   - Useful after the product has users and enough query volume.
   - Product label: `Internal search`.

5. Editorial Seed
   - Starter content used for development, onboarding, demos, and initial editorial planning.
   - Never describe this as a live trend.
   - Product label: `Editorial seed`.

## Public Copy Rule

Use `curiosity signals` when multiple source types are mixed.

Use `trending searches` only for rows from a real search-demand source such as Google Trends or another approved search trends provider.

Use `what people are reading` only for Wikimedia pageview rows.

Use `news signal` or `current-affairs signal` only for GDELT/news rows.

## MVP Implementation Rule

Until Wikimedia, GDELT, or Google Trends ingestion is active, seeded rows must remain clearly labelled:

- `Editorial seed`
- `Seed`
- `Starter signal awaiting a live reliable source`

This keeps LoreSabi aligned with its original idea: helping people understand countries through real questions and signals, not pretending a seed database is public demand.
