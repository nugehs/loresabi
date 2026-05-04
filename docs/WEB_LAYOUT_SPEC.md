# LoreSabi by Bashbop - Web Layout Spec

## Purpose

The first Figma pass only covers mobile screens. The web-first product also needs desktop layouts because search, SEO, country pages, and explainers will be discovered and shared on the web.

Target desktop frame size: `1440 x 1024`.

## Web Screen 1: Homepage / Search

Primary job: let users search or choose a country immediately.

Layout:

- Top nav with logo, Countries, Trends, Saved, For schools, Try Pro.
- Hero section with headline: "Understand any country without the confusion."
- Supporting copy explaining history, culture, current affairs, pop culture, flags, and search curiosity.
- Large centered search bar.
- Country chips: Nigeria, Ghana, United Kingdom, South Africa, Japan.
- Right-side visual panel with cards:
  - "Did Nigeria have a different flag before?"
  - "What does Ghana's Black Star mean?"
- Below hero: four trending curiosity cards.

Desktop behavior:

- Hero becomes two-column.
- Search remains prominent.
- Trending cards become a 4-column grid.

## Web Screen 2: Country Page

Primary job: make a country feel explorable and alive.

Layout:

- Header/nav.
- Large country hero band.
- Country flag and country name.
- Description: "The simple guide to Nigeria's history, culture, politics, pop culture, national symbols, and live curiosity signals."
- Follow country button.
- Tabs:
  - Overview
  - History
  - Culture
  - Current affairs
  - Pop culture
  - Trends
- Main content:
  - 60-second country summary
  - "How Nigeria got its name" card
  - "Old flags and symbols" card
  - "What people are searching in Nigeria" row/list

Desktop behavior:

- Hero is wide.
- Overview content becomes a 2-3 column layout.
- Trending search list has more horizontal detail than mobile.

## Web Screen 3: Explainer Page

Primary job: answer one question clearly and show sources.

Example topic: "Did Nigeria have another flag before?"

Layout:

- Header/nav.
- Category label: History explainer.
- Large question title.
- Metadata: updated date, source count, read time.
- Save and share buttons.
- Main grid:
  - Left: short answer card.
  - Right: image comparison card with old flag and current flag.
- Below:
  - Why it matters.
  - Timeline.
  - Sources card.
  - Related questions.

Desktop behavior:

- Answer and image sit side-by-side.
- Timeline can sit in a right column or below depending on content length.
- Sources should remain visible and trustworthy, not hidden.

## Web Screen 4: Trends Dashboard

Primary job: show what people are searching, reading, and talking about by country.

Layout:

- Header/nav.
- Page title: "Trends by country."
- Description.
- Filter chips:
  - Global
  - Nigeria
  - Current affairs
  - Pop culture
- Trend table/list:
  - Rank
  - Topic
  - Category
  - Reason
  - Trend score
- Right-side Pro card:
  - Saved country packs
  - Offline reading
  - Audio briefings
  - School packs
  - Diaspora guides
  - Advanced trend alerts

Desktop behavior:

- Trends become a dashboard/table.
- Pro monetization card sits in the right sidebar.

## Visual Direction

- Mobile and web should share the same design language.
- Keep the UI clean, trustworthy, and readable.
- Avoid making it look like a generic AI chatbot.
- Use cards for individual content items, not entire page sections.
- Use country imagery, flags, maps, and image comparison panels.
- Keep sources and attribution visible.

## Figma Status

Desktop web screens still need to be added to the Figma file:

https://www.figma.com/design/fy2ZD2q6dXKusqCsZHOxtE

Current blocker: Figma Starter MCP tool-call limit was reached while trying to add the web frames.
