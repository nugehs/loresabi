# LoreSabi by Bashbop - Content Plan

## Explainer Format

Every explainer should use this structure:

1. Short answer
2. Why it matters
3. Context
4. Timeline, when useful
5. Key people, places, or terms
6. Related questions
7. Sources
8. Image credits and license
9. Last updated date

Use the full writing and review template in [`EXPLAINER_TEMPLATE.md`](EXPLAINER_TEMPLATE.md).

## First Nigeria Explainers

- [x] How did Nigeria get its name?
- [x] Did Nigeria have another flag before?
- [x] Who designed Nigeria's current flag?
- [x] What does Nigeria's flag mean?
- [x] What was Nigeria called before independence?
- [x] What happened on October 1, 1960?
- [x] Why did Lagos stop being Nigeria's capital?
- [x] What are Nigeria's major languages?
- [x] What does japa mean?
- [x] Why is Nollywood important?

## Nigeria Editorial Queue

The first 10 Nigeria explainers are now seeded into Postgres. The public site only shows `PUBLISHED` explainers; draft explainers appear in the internal `/editorial` queue until source review is complete.

## First Ghana Explainers

- [ ] Why is Ghana called Ghana?
- [ ] What was the Gold Coast?
- [ ] What does Ghana's Black Star mean?
- [ ] Who was Kwame Nkrumah?
- [ ] What does Ghana's flag mean?

## Source Types

Use these source types first:

- Wikipedia and Wikidata for background
- Wikimedia Commons for reusable images
- Official government or archive sources where available
- World Bank, UN, or CIA World Factbook for country data
- Local news and official sources for current affairs
- Wikipedia pageviews and Google Trends for curiosity signals

## Image Rules

- Store image URL, source URL, author/credit, license, and attribution text.
- Prefer Wikimedia Commons for flags, maps, historical images, and public figures.
- Avoid using copyrighted news or celebrity images without licensing.
- Label AI-generated images clearly if used.

## Sensitive Topic Rules

Sensitive topics include politics, conflict, ethnicity, religion, elections, crime, health, and active protests.

For these topics:

- Use at least two credible sources.
- Show uncertainty where facts are disputed.
- Avoid inflammatory wording.
- Separate fact from opinion.
- Keep review status as needs_review until checked.
