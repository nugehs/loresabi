import { headers } from "next/headers";
import {
  countryFromLocale,
  normalizeCountry,
  supportedCountries,
  timezoneCountries,
  type ViewerCountry,
} from "./viewer-country";

export type ViewerContext = {
  country: ViewerCountry;
  source: "proxy-header" | "timezone" | "locale" | "default";
};

export async function getViewerContext(): Promise<ViewerContext> {
  const requestHeaders = await headers();
  const headerCountry =
    requestHeaders.get("cf-ipcountry") ??
    requestHeaders.get("x-country-code") ??
    requestHeaders.get("x-geo-country") ??
    requestHeaders.get("x-client-country");
  const timezone =
    requestHeaders.get("x-timezone") ??
    requestHeaders.get("x-client-timezone");
  const locale = requestHeaders.get("accept-language")?.split(",")[0] ?? null;

  const headerMatch = normalizeCountry(headerCountry);
  if (headerMatch) {
    return { country: headerMatch, source: "proxy-header" };
  }

  const timezoneMatch = timezone
    ? normalizeCountry(timezoneCountries[timezone])
    : null;
  if (timezoneMatch) {
    return { country: timezoneMatch, source: "timezone" };
  }

  const localeMatch = countryFromLocale(locale);
  if (localeMatch) {
    return { country: localeMatch, source: "locale" };
  }

  return {
    country:
      normalizeCountry(process.env.DEFAULT_VIEWER_COUNTRY) ??
      supportedCountries.GB,
    source: "default",
  };
}
