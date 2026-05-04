import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const nigeriaTopics = [
  {
    slug: "national-symbols",
    title: "National symbols",
    description: "Flags, emblems, anthems, names, and the visible signs that carry national memory.",
  },
  {
    slug: "origin-stories",
    title: "Origin stories",
    description: "Short explainers on how places, names, borders, and public ideas came to be.",
  },
  {
    slug: "current-curiosity",
    title: "Current curiosity",
    description: "Questions people are asking now, grouped into calm explainers instead of noisy feeds.",
  },
  {
    slug: "language-and-slang",
    title: "Language and slang",
    description: "Words, phrases, and everyday language that carry social meaning.",
  },
  {
    slug: "screen-and-music",
    title: "Screen and music",
    description: "Film, music, entertainment, and cultural exports people meet before they understand the context.",
  },
];

const nigeriaExplainers = [
  {
    slug: "old-nigerian-flag",
    title: "Nigeria had a different flag before independence",
    summary:
      "Before the green-white-green flag, colonial Nigeria used British ensign-style flags with a local badge. The independence flag was designed by Michael Taiwo Akinkunmi and first used in 1960.",
    body:
      "Nigeria's current green-white-green flag became official at independence on 1 October 1960. Before then, Nigeria was under British colonial rule and used colonial flags based on British ensigns, with badges representing the territory. The change of flag matters because it was not just a design update: it marked a shift from being represented through empire to choosing a national symbol. The green bands are widely understood as a reference to agriculture and natural wealth, while the white band stands for peace and unity.",
    category: "SYMBOLS",
    status: "PUBLISHED",
    topicSlug: "national-symbols",
    readingTime: 3,
    publishedAt: new Date("2026-05-04T12:00:00.000Z"),
    sources: [
      {
        title: "Nigeria flag overview",
        url: "https://www.britannica.com/topic/flag-of-Nigeria",
        publisher: "Encyclopaedia Britannica",
        type: "ENCYCLOPEDIA",
      },
      {
        title: "Nigeria country profile",
        url: "https://www.britannica.com/place/Nigeria",
        publisher: "Encyclopaedia Britannica",
        type: "ENCYCLOPEDIA",
      },
    ],
    images: [
      {
        url: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg",
        alt: "Nigeria's current green, white, and green national flag",
        credit: "Public domain flag image",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Flag_of_Nigeria.svg",
      },
    ],
  },
  {
    slug: "how-nigeria-got-its-name",
    title: "How Nigeria got its name",
    summary:
      "The name Nigeria is linked to the Niger River and was popularised in the late 19th century during British colonial administration.",
    body:
      "Nigeria's name comes from the Niger River area. The name is commonly credited to Flora Shaw, a journalist who later married British colonial administrator Frederick Lugard. In the late 19th century, she used Nigeria as a shorter way to describe the British-controlled territories around the Niger. The name stayed, even though the country itself contains hundreds of languages, peoples, kingdoms, histories, and identities that existed long before the modern state.",
    category: "HISTORY",
    status: "PUBLISHED",
    topicSlug: "origin-stories",
    readingTime: 3,
    publishedAt: new Date("2026-05-04T12:00:00.000Z"),
    sources: [
      {
        title: "Nigeria country profile",
        url: "https://www.britannica.com/place/Nigeria",
        publisher: "Encyclopaedia Britannica",
        type: "ENCYCLOPEDIA",
      },
      {
        title: "Nigeria overview",
        url: "https://www.cia.gov/the-world-factbook/countries/nigeria/",
        publisher: "CIA World Factbook",
        type: "OFFICIAL",
      },
    ],
    images: [],
  },
  {
    slug: "who-designed-nigerias-flag",
    title: "Who designed Nigeria's current flag?",
    summary:
      "Nigeria's current flag was designed by Michael Taiwo Akinkunmi before independence. This draft will turn the symbol into a short human story.",
    body:
      "Draft brief: explain who Michael Taiwo Akinkunmi was, why the design was selected, what changed before adoption, and how the flag became tied to independence memory. Needs source review before publication.",
    category: "SYMBOLS",
    status: "DRAFT",
    topicSlug: "national-symbols",
    readingTime: 2,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "what-does-nigerias-flag-mean",
    title: "What does Nigeria's flag mean?",
    summary:
      "The green-white-green flag is usually explained through agriculture, natural wealth, peace, and unity. This draft needs source-backed wording.",
    body:
      "Draft brief: explain the common meaning of the colours, avoid overclaiming symbolism, and connect the design to independence. Needs source review before publication.",
    category: "SYMBOLS",
    status: "DRAFT",
    topicSlug: "national-symbols",
    readingTime: 2,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "what-was-nigeria-called-before-independence",
    title: "What was Nigeria called before independence?",
    summary:
      "Modern Nigeria was formed through colonial territories and older societies that were not one single country before British rule.",
    body:
      "Draft brief: explain the difference between pre-colonial kingdoms, protectorates, colony names, the 1914 amalgamation, and the modern state. Needs careful source review before publication.",
    category: "HISTORY",
    status: "DRAFT",
    topicSlug: "origin-stories",
    readingTime: 4,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "what-happened-on-october-1-1960",
    title: "What happened on October 1, 1960?",
    summary:
      "October 1, 1960 is Nigeria's independence date. This explainer will cover the event, what changed, and what did not change overnight.",
    body:
      "Draft brief: explain independence day, the transfer from British colonial rule, major public symbols, and why independence is remembered annually. Needs source review before publication.",
    category: "HISTORY",
    status: "DRAFT",
    topicSlug: "origin-stories",
    readingTime: 3,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "why-did-lagos-stop-being-capital",
    title: "Why did Lagos stop being Nigeria's capital?",
    summary:
      "Nigeria moved its capital from Lagos to Abuja for reasons including geography, planning, and national balance.",
    body:
      "Draft brief: explain why Lagos was capital, why Abuja was selected, when the move happened, and what Lagos remains today. Needs source review before publication.",
    category: "POLITICS",
    status: "DRAFT",
    topicSlug: "current-curiosity",
    readingTime: 4,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "what-are-nigerias-major-languages",
    title: "What are Nigeria's major languages?",
    summary:
      "Nigeria is highly multilingual. This explainer will introduce major languages without flattening hundreds of language communities.",
    body:
      "Draft brief: cover Hausa, Yoruba, Igbo, English, Nigerian Pidgin, and the wider multilingual reality. Needs source review before publication.",
    category: "LANGUAGE",
    status: "DRAFT",
    topicSlug: "language-and-slang",
    readingTime: 4,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "what-does-japa-mean",
    title: "What does japa mean?",
    summary:
      "Japa is Nigerian slang often used to describe leaving the country, especially for work, study, or a new life abroad.",
    body:
      "Draft brief: explain the slang, where it appears in everyday conversation, and how it connects to migration, opportunity, pressure, and diaspora life. Needs source review before publication.",
    category: "CULTURE",
    status: "DRAFT",
    topicSlug: "language-and-slang",
    readingTime: 3,
    publishedAt: null,
    sources: [],
    images: [],
  },
  {
    slug: "why-is-nollywood-important",
    title: "Why is Nollywood important?",
    summary:
      "Nollywood is one of Nigeria's most visible cultural exports and a major way many people encounter Nigerian stories.",
    body:
      "Draft brief: explain Nollywood's growth, its distribution style, cultural influence, and why it matters beyond box office numbers. Needs source review before publication.",
    category: "POP_CULTURE",
    status: "DRAFT",
    topicSlug: "screen-and-music",
    readingTime: 4,
    publishedAt: null,
    sources: [],
    images: [],
  },
];

const starterTrends = [
  { query: "who named nigeria", source: "CURATED", score: 82, region: "global" },
  { query: "old nigeria flag", source: "CURATED", score: 76, region: "global" },
  { query: "nigeria independence flag designer", source: "CURATED", score: 64, region: "global" },
];

async function main() {
  const country = await prisma.country.upsert({
    where: { slug: "nigeria" },
    update: {
      name: "Nigeria",
      officialName: "Federal Republic of Nigeria",
      iso2: "NG",
      iso3: "NGA",
      region: "Africa",
      subregion: "West Africa",
      capital: "Abuja",
      demonym: "Nigerian",
      population: 223804632n,
      latitude: 9.082,
      longitude: 8.6753,
    },
    create: {
      slug: "nigeria",
      name: "Nigeria",
      officialName: "Federal Republic of Nigeria",
      iso2: "NG",
      iso3: "NGA",
      region: "Africa",
      subregion: "West Africa",
      capital: "Abuja",
      demonym: "Nigerian",
      population: 223804632n,
      latitude: 9.082,
      longitude: 8.6753,
    },
  });

  const topics = new Map();
  for (const topic of nigeriaTopics) {
    const savedTopic = await prisma.topic.upsert({
      where: { countryId_slug: { countryId: country.id, slug: topic.slug } },
      update: topic,
      create: { ...topic, countryId: country.id },
    });
    topics.set(topic.slug, savedTopic);
  }

  for (const explainer of nigeriaExplainers) {
    const topic = topics.get(explainer.topicSlug);
    const savedExplainer = await prisma.explainer.upsert({
      where: { countryId_slug: { countryId: country.id, slug: explainer.slug } },
      update: {
        title: explainer.title,
        summary: explainer.summary,
        body: explainer.body,
        category: explainer.category,
        status: explainer.status,
        readingTime: explainer.readingTime,
        topicId: topic?.id,
        publishedAt: explainer.publishedAt,
      },
      create: {
        slug: explainer.slug,
        title: explainer.title,
        summary: explainer.summary,
        body: explainer.body,
        category: explainer.category,
        status: explainer.status,
        readingTime: explainer.readingTime,
        countryId: country.id,
        topicId: topic?.id,
        publishedAt: explainer.publishedAt,
      },
    });

    await prisma.source.deleteMany({ where: { explainerId: savedExplainer.id } });
    if (explainer.sources.length > 0) {
      await prisma.source.createMany({
        data: explainer.sources.map((source) => ({ ...source, explainerId: savedExplainer.id })),
      });
    }

    await prisma.image.deleteMany({ where: { explainerId: savedExplainer.id } });
    if (explainer.images.length > 0) {
      await prisma.image.createMany({
        data: explainer.images.map((image) => ({
          ...image,
          countryId: country.id,
          explainerId: savedExplainer.id,
        })),
      });
    }
  }

  await prisma.explainer.deleteMany({
    where: {
      countryId: country.id,
      slug: { notIn: nigeriaExplainers.map((explainer) => explainer.slug) },
    },
  });

  await prisma.trend.deleteMany({ where: { countryId: country.id, source: "CURATED" } });
  await prisma.trend.createMany({
    data: starterTrends.map((trend) => ({ ...trend, countryId: country.id })),
  });

  console.log("Seeded LoreSabi starter content for Nigeria.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
