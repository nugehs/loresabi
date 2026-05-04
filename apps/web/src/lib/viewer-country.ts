export type ViewerCountry = {
  iso2: string;
  name: string;
  slug: string;
};

export const supportedCountries: Record<string, ViewerCountry> = {
  GH: { iso2: "GH", name: "Ghana", slug: "ghana" },
  GB: { iso2: "GB", name: "United Kingdom", slug: "united-kingdom" },
  NG: { iso2: "NG", name: "Nigeria", slug: "nigeria" },
  US: { iso2: "US", name: "United States", slug: "united-states" },
  ZA: { iso2: "ZA", name: "South Africa", slug: "south-africa" },
};

export const timezoneCountries: Record<string, string> = {
  "Africa/Accra": "GH",
  "Africa/Lagos": "NG",
  "Europe/London": "GB",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "Africa/Johannesburg": "ZA",
};

export function normalizeCountry(value?: string | null) {
  if (!value) {
    return null;
  }

  return supportedCountries[value.trim().toUpperCase()] ?? null;
}

export function countryFromLocale(value?: string | null) {
  const region = value?.split("-")[1] ?? null;

  return normalizeCountry(region);
}

export function detectBrowserCountry() {
  const timezone =
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? undefined;
  const timezoneMatch = timezone
    ? normalizeCountry(timezoneCountries[timezone])
    : null;

  if (timezoneMatch) {
    return timezoneMatch;
  }

  const languageMatch =
    countryFromLocale(navigator.language) ??
    navigator.languages.map(countryFromLocale).find(Boolean);

  return languageMatch ?? null;
}
