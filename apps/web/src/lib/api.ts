import {
  countries as staticCountries,
  nigeriaExplainers,
  trendingItems,
} from "@/lib/content";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export type CountrySummary = {
  id?: string;
  slug: string;
  name: string;
  officialName?: string | null;
  iso2?: string | null;
  iso3?: string | null;
  region: string | null;
  subregion?: string | null;
  capital?: string | null;
  demonym?: string | null;
  population?: string | null;
  latitude?: string | null;
  longitude?: string | null;
  summary: string;
  status: string;
  explainerCount?: number;
  trendCount?: number;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
};

export type ImageAsset = {
  id: string;
  url: string;
  alt: string;
  credit: string | null;
  sourceUrl: string | null;
};

export type Source = {
  id: string;
  title: string;
  url: string;
  publisher: string | null;
  type: string;
  accessedAt: string | null;
};

export type Explainer = {
  id?: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  readingTime: number | null;
  publishedAt: string | null;
  country: CountrySummary;
  topic: Topic | null;
  images: ImageAsset[];
  sources: Source[];
  shortAnswer: string;
  whyItMatters: string;
  readTime: string;
  status: string;
};

export type Trend = {
  id?: string;
  query: string;
  source: string;
  score: number | null;
  region: string | null;
  country: CountrySummary | null;
  capturedAt: string | null;
  rank: string;
  topic: string;
  category: string;
  change: string;
  reason: string;
};

export type CountryDetail = CountrySummary & {
  topics: Topic[];
  explainers: Explainer[];
  images: ImageAsset[];
  trends: Trend[];
};

export type SearchResults = {
  query: string;
  countries: CountrySummary[];
  explainers: Explainer[];
};

type ApiCountry = Omit<CountrySummary, "summary" | "status"> & {
  explainerCount?: number;
  trendCount?: number;
};

type ApiExplainer = Omit<
  Explainer,
  "shortAnswer" | "whyItMatters" | "readTime"
> & {
  country: ApiCountry;
};

type ApiTrend = Omit<
  Trend,
  "rank" | "topic" | "category" | "change" | "reason"
> & {
  country: ApiCountry | null;
};

type ApiCountryDetail = ApiCountry & {
  topics: Topic[];
  explainers: ApiExplainer[];
  images: ImageAsset[];
  trends: ApiTrend[];
};

type ApiSearchResults = {
  query: string;
  countries: ApiCountry[];
  explainers: ApiExplainer[];
};

export type EditorialQueue = {
  country: CountrySummary;
  counts: {
    total: number;
    published: number;
    draft: number;
    inReview: number;
  };
  explainers: Explainer[];
};

type ApiEditorialQueue = {
  country: ApiCountry;
  counts: EditorialQueue["counts"];
  explainers: ApiExplainer[];
};

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getCountries(): Promise<CountrySummary[]> {
  const apiCountries = await apiFetch<ApiCountry[]>("/countries");
  const liveCountries = (apiCountries ?? []).map(mapCountry);
  const liveSlugs = new Set(liveCountries.map((country) => country.slug));
  const comingSoon = staticCountries
    .filter((country) => !liveSlugs.has(country.slug))
    .map((country) => ({
      slug: country.slug,
      name: country.name,
      region: country.region,
      summary: country.summary,
      status: country.status,
    }));

  return [...liveCountries, ...comingSoon];
}

export async function getCountry(slug: string): Promise<CountryDetail | null> {
  const apiCountry = await apiFetch<ApiCountryDetail>(`/countries/${slug}`);

  if (apiCountry) {
    return {
      ...mapCountry(apiCountry),
      topics: apiCountry.topics,
      explainers: apiCountry.explainers.map(mapExplainer),
      images: apiCountry.images,
      trends: apiCountry.trends.map(mapTrend),
    };
  }

  if (slug === "nigeria") {
    const country = mapCountry({
      slug: "nigeria",
      name: "Nigeria",
      region: "Africa",
      subregion: "West Africa",
      capital: "Abuja",
      demonym: "Nigerian",
      population: "223804632",
    });

    return {
      ...country,
      topics: [],
      explainers: nigeriaExplainers.map((explainer) =>
        mapStaticExplainer(explainer, country),
      ),
      images: [],
      trends: trendingItems
        .filter((item) => item.country === "Nigeria")
        .map((item, index) => mapStaticTrend(item, index, country)),
    };
  }

  return null;
}

export async function getExplainer(
  countrySlug: string,
  explainerSlug: string,
): Promise<Explainer | null> {
  const apiExplainer = await apiFetch<ApiExplainer>(
    `/countries/${countrySlug}/explainers/${explainerSlug}`,
  );

  if (apiExplainer) {
    return mapExplainer(apiExplainer);
  }

  const country = await getCountry(countrySlug);
  return (
    country?.explainers.find((explainer) => explainer.slug === explainerSlug) ??
    null
  );
}

export async function getTrends(country?: string): Promise<Trend[]> {
  const query = country ? `?country=${encodeURIComponent(country)}` : "";
  const apiTrends = await apiFetch<ApiTrend[]>(`/trends${query}`);

  if (apiTrends?.length) {
    return apiTrends.map(mapTrend);
  }

  return trendingItems.map((item, index) => mapStaticTrend(item, index));
}

export async function searchContent(
  query: string,
  country?: string,
): Promise<SearchResults> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      query: trimmedQuery,
      countries: [],
      explainers: [],
    };
  }

  const params = new URLSearchParams({ q: trimmedQuery });
  if (country) {
    params.set("country", country);
  }

  const apiResults = await apiFetch<ApiSearchResults>(
    `/search?${params.toString()}`,
  );

  if (apiResults) {
    return {
      query: apiResults.query,
      countries: apiResults.countries.map(mapCountry),
      explainers: apiResults.explainers.map(mapExplainer),
    };
  }

  const countryDetail = await getCountry(country ?? "nigeria");
  const explainers =
    countryDetail?.explainers.filter((explainer) => {
      const haystack = [
        explainer.title,
        explainer.summary,
        explainer.body,
        explainer.category,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(trimmedQuery.toLowerCase());
    }) ?? [];

  return {
    query: trimmedQuery,
    countries: [],
    explainers,
  };
}

export async function getEditorialQueue(
  countrySlug = "nigeria",
): Promise<EditorialQueue> {
  const apiQueue = await apiFetch<ApiEditorialQueue>(
    `/editorial/countries/${countrySlug}/explainers`,
  );

  if (apiQueue) {
    return {
      country: mapCountry(apiQueue.country),
      counts: apiQueue.counts,
      explainers: apiQueue.explainers.map(mapExplainer),
    };
  }

  const country = await getCountry(countrySlug);
  const explainers = country?.explainers ?? [];

  return {
    country:
      country ??
      mapCountry({
        slug: countrySlug,
        name: titleCase(countrySlug),
        region: null,
      }),
    counts: {
      total: explainers.length,
      published: explainers.filter((explainer) => explainer.status === "Published")
        .length,
      draft: explainers.filter((explainer) => explainer.status !== "Published")
        .length,
      inReview: 0,
    },
    explainers,
  };
}

function mapCountry(country: ApiCountry): CountrySummary {
  const staticCountry = staticCountries.find((item) => item.slug === country.slug);

  return {
    ...country,
    region: country.region ?? staticCountry?.region ?? null,
    summary:
      staticCountry?.summary ??
      `${country.name} country guide with explainers, trends, sources, and cultural context.`,
    status: country.explainerCount
      ? `${country.explainerCount} live explainers`
      : (staticCountry?.status ?? "Live country"),
  };
}

function mapExplainer(explainer: ApiExplainer): Explainer {
  const staticExplainer = nigeriaExplainers.find(
    (item) => item.slug === explainer.slug,
  );
  const readTime = explainer.readingTime
    ? `${explainer.readingTime} min read`
    : (staticExplainer?.readTime ?? "3 min read");

  return {
    ...explainer,
    country: mapCountry(explainer.country),
    shortAnswer: explainer.summary,
    whyItMatters:
      staticExplainer?.whyItMatters ??
      "This turns a simple question into wider context about identity, history, symbols, and public memory.",
    readTime,
    status: titleCase(explainer.status.toLowerCase()),
  };
}

function mapTrend(trend: ApiTrend, index: number): Trend {
  const staticTrend = trendingItems.find(
    (item) => item.topic.toLowerCase() === trend.query.toLowerCase(),
  );
  const score = trend.score ?? 0;

  return {
    ...trend,
    country: trend.country ? mapCountry(trend.country) : null,
    rank: String(index + 1).padStart(2, "0"),
    topic: staticTrend?.topic ?? titleCase(trend.query),
    category: staticTrend?.category ?? titleCase(trend.source.toLowerCase()),
    change: staticTrend?.change ?? (score ? `${score}/100` : "New"),
    reason:
      staticTrend?.reason ??
      "A tracked curiosity signal that should be reviewed, sourced, and turned into a clear explainer.",
  };
}

function mapStaticExplainer(
  explainer: (typeof nigeriaExplainers)[number],
  country: CountrySummary,
): Explainer {
  return {
    slug: explainer.slug,
    title: explainer.title,
    summary: explainer.shortAnswer,
    body: `${explainer.shortAnswer}\n\n${explainer.whyItMatters}`,
    category: explainer.category,
    readingTime: Number.parseInt(explainer.readTime, 10),
    publishedAt: null,
    country,
    topic: null,
    images: [],
    sources: [],
    shortAnswer: explainer.shortAnswer,
    whyItMatters: explainer.whyItMatters,
    readTime: explainer.readTime,
    status: explainer.status,
  };
}

function mapStaticTrend(
  trend: (typeof trendingItems)[number],
  index: number,
  country?: CountrySummary,
): Trend {
  return {
    query: trend.topic,
    source: "STATIC",
    score: null,
    region: null,
    country:
      country ??
      staticCountries
        .filter((item) => item.name === trend.country)
        .map((item) => ({
          slug: item.slug,
          name: item.name,
          region: item.region,
          summary: item.summary,
          status: item.status,
        }))[0] ??
      null,
    capturedAt: null,
    rank: trend.rank || String(index + 1).padStart(2, "0"),
    topic: trend.topic,
    category: trend.category,
    change: trend.change,
    reason: trend.reason,
  };
}

function titleCase(value: string) {
  return value
    .split(/[-_ ]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
