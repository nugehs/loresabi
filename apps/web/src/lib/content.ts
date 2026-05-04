export const countries = [
  {
    name: "Nigeria",
    slug: "nigeria",
    region: "West Africa",
    summary:
      "Africa's most populous country, shaped by pre-colonial kingdoms, British colonial rule, independence in 1960, oil politics, Nollywood, Afrobeats, and a huge diaspora.",
    status: "Live MVP country",
  },
  {
    name: "Ghana",
    slug: "ghana",
    region: "West Africa",
    summary:
      "A country with deep Akan, Ewe, Ga, and northern histories, known globally through the Gold Coast, independence leadership, highlife, hiplife, and the Black Star.",
    status: "Coming next",
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    region: "Europe",
    summary:
      "A union of nations with layered monarchy, parliament, empire, migration, music, media, class, football, and current political debates.",
    status: "Coming next",
  },
  {
    name: "United States",
    slug: "united-states",
    region: "North America",
    summary:
      "A federal republic shaped by indigenous history, migration, slavery, civil rights, global power, entertainment, technology, and state-by-state politics.",
    status: "Coming later",
  },
  {
    name: "South Africa",
    slug: "south-africa",
    region: "Southern Africa",
    summary:
      "A multilingual country shaped by indigenous kingdoms, Dutch and British colonial histories, apartheid, democracy, music, sport, and regional influence.",
    status: "Coming later",
  },
];

export type StaticCountry = (typeof countries)[number];

export const nigeriaExplainers = [
  {
    title: "Did Nigeria have another flag before?",
    slug: "old-nigerian-flag",
    category: "History",
    readTime: "4 min read",
    shortAnswer:
      "Yes. Before independence, Nigeria used British colonial flags. The current green-white-green flag became the national flag on October 1, 1960.",
    whyItMatters:
      "Flags show political history. Nigeria's old colonial flag represented British rule, while the current flag represented independence and national identity.",
    status: "Published demo",
  },
  {
    title: "How did Nigeria get its name?",
    slug: "how-nigeria-got-its-name",
    category: "Name origin",
    readTime: "3 min read",
    shortAnswer:
      "Nigeria's name comes from the River Niger and was suggested in the colonial period as a way to describe the Niger area.",
    whyItMatters:
      "The name connects geography, colonial history, and national identity in one simple question.",
    status: "Draft seed",
  },
  {
    title: "Who designed Nigeria's current flag?",
    slug: "who-designed-nigerias-flag",
    category: "Symbols",
    readTime: "2 min read",
    shortAnswer:
      "The green-white-green flag was designed by Michael Taiwo Akinkunmi before Nigeria's independence.",
    whyItMatters:
      "It turns a national symbol into a human story rather than just a design fact.",
    status: "Draft seed",
  },
  {
    title: "What does japa mean?",
    slug: "what-does-japa-mean",
    category: "Culture",
    readTime: "3 min read",
    shortAnswer:
      "Japa is Nigerian slang often used to describe leaving the country, especially for work, study, or a new life abroad.",
    whyItMatters:
      "It captures migration pressure, ambition, frustration, humour, and diaspora life in one word.",
    status: "Draft seed",
  },
];

export type StaticExplainer = (typeof nigeriaExplainers)[number];

export const trendingItems = [
  {
    rank: "01",
    country: "Nigeria",
    topic: "Old Nigerian flag",
    category: "History",
    change: "+42%",
    reason: "A viral post about colonial symbols is making people ask what Nigeria used before 1960.",
  },
  {
    rank: "02",
    country: "Nigeria",
    topic: "Food prices explained",
    category: "Current affairs",
    change: "+18%",
    reason: "A current affairs topic that should require source review before publication.",
  },
  {
    rank: "03",
    country: "Nigeria",
    topic: "Japa meaning",
    category: "Culture",
    change: "+15%",
    reason: "Diaspora and migration discussions keep pushing the slang into wider searches.",
  },
  {
    rank: "04",
    country: "Ghana",
    topic: "Black Star meaning",
    category: "Symbols",
    change: "+24%",
    reason: "People are connecting flag symbols with independence history and football identity.",
  },
];

export type StaticTrend = (typeof trendingItems)[number];

export const timeline = [
  {
    year: "Before 1960",
    event: "British colonial flags were used in Nigeria.",
  },
  {
    year: "1959",
    event: "Michael Taiwo Akinkunmi designed the current Nigerian flag.",
  },
  {
    year: "October 1, 1960",
    event: "The green-white-green flag was adopted at independence.",
  },
];

export const sources = [
  "Wikipedia",
  "Wikimedia Commons",
  "National archives",
  "Official historical references",
];
