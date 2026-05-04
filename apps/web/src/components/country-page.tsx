import Link from "next/link";
import { notFound } from "next/navigation";
import { NigeriaFlag } from "@/components/flags";
import { ViewerContextBadge } from "@/components/viewer-context-badge";
import {
  Card,
  Container,
  Eyebrow,
  PageShell,
  PrimaryLink,
  TextLink,
} from "@/components/ui";
import { getCountry } from "@/lib/api";
import { getViewerContext } from "@/lib/viewer-context";
import { SiteHeader } from "./site-header";

type CountryPageProps = {
  countrySlug: string;
};

const questionFilters = [
  { label: "History", query: "history" },
  { label: "Culture", query: "culture" },
  { label: "Current affairs", query: "current affairs" },
  { label: "Pop culture", query: "pop culture" },
  { label: "Symbols", query: "flag symbols name" },
  { label: "Trends", query: "trending questions" },
];

export async function CountryPage({ countrySlug }: CountryPageProps) {
  const [country, viewer] = await Promise.all([
    getCountry(countrySlug),
    getViewerContext(),
  ]);

  if (!country) {
    notFound();
  }

  const featuredExplainer = country.explainers[0];
  const hasPublishedContent = country.explainers.length > 0;

  return (
    <PageShell>
      <SiteHeader />
      <section className="border-b border-[#d8ded6] bg-[#e8f2ec]">
        <Container className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
          <div>
            {country.slug === "nigeria" ? (
              <NigeriaFlag className="h-24 w-40" />
            ) : (
              <div className="flex h-24 w-40 items-center justify-center rounded border-2 border-[#151917] bg-white text-3xl font-bold">
                {country.iso2 ?? country.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <Eyebrow>{country.name} context guide</Eyebrow>
            <h1 className="mt-3 text-6xl font-bold tracking-tight">
              {country.name}
            </h1>
          </div>
          <div className="max-w-3xl self-end">
            <p className="text-2xl font-semibold leading-9 text-[#26312b]">
              {country.summary}
            </p>
            <ViewerContextBadge
              contentSource={
                hasPublishedContent ? "Database content" : "Starter profile"
              }
              initialCountry={viewer.country}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded border border-[#151917] bg-[#151917] px-4 py-2 text-sm font-bold text-white"
                href={`/search?q=${encodeURIComponent(country.name)}&country=${country.slug}`}
              >
                Ask about {country.name}
              </Link>
              {questionFilters.map((filter) => (
                <Link
                  key={filter.label}
                  className="rounded border border-[#b9c3ba] bg-white px-4 py-2 text-sm font-bold text-[#151917] hover:border-[#00703c] hover:text-[#00703c]"
                  href={`/search?q=${encodeURIComponent(`${country.name} ${filter.query}`)}&country=${country.slug}`}
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <h2 className="text-3xl font-bold">60-second {country.name}</h2>
          <p className="mt-5 text-lg leading-8 text-[#3f4842]">
            {country.summary}
          </p>
          <div className="mt-6">
            <TextLink
              href={`/search?q=${encodeURIComponent(`What should I know about ${country.name}?`)}&country=${country.slug}`}
            >
              Ask a plain-English question
            </TextLink>
          </div>
        </Card>
        <Card className="bg-[#fbfcf8]">
          <h2 className="text-3xl font-bold">Curiosity signals</h2>
          <div className="mt-5 grid gap-4">
            {country.trends.length ? (
              country.trends.map((item) => (
                <Link
                  key={item.topic}
                  className="block border-t border-[#d8ded6] pt-4 hover:text-[#005ea5]"
                  href={`/search?q=${encodeURIComponent(item.topic)}&country=${country.slug}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-bold">
                      {item.rank}. {item.topic}
                    </p>
                    <span className="font-bold text-[#00703c]">
                      {item.change}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#00703c]">
                    {item.category}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#3f4842]">
                    {item.reason}
                  </p>
                </Link>
              ))
            ) : (
              <div className="border-t border-[#d8ded6] pt-4">
                <p className="font-bold">No trend signals yet</p>
                <p className="mt-2 text-sm leading-6 text-[#3f4842]">
                  Searches for {country.name} will create signals for the
                  editorial queue.
                </p>
              </div>
            )}
          </div>
        </Card>
      </Container>

      <section className="border-y border-[#d8ded6] bg-white py-14">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>
                {hasPublishedContent ? "Start with the basics" : "Coming next"}
              </Eyebrow>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                {country.name} explainers
              </h2>
            </div>
            {featuredExplainer ? (
              <PrimaryLink
                href={`/countries/${country.slug}/${featuredExplainer.slug}`}
              >
                Read featured explainer
              </PrimaryLink>
            ) : (
              <PrimaryLink
                href={`/search?q=${encodeURIComponent(`What should LoreSabi explain about ${country.name}?`)}&country=${country.slug}`}
              >
                Search {country.name} questions
              </PrimaryLink>
            )}
          </div>
          {hasPublishedContent ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {country.explainers.map((explainer) => (
                <Card key={explainer.slug}>
                  <p className="text-sm font-bold text-[#00703c]">
                    {explainer.category} - {explainer.readTime}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">
                    {explainer.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[#3f4842]">
                    {explainer.shortAnswer}
                  </p>
                  <p className="mt-5 inline-block rounded bg-[#e8f2ec] px-3 py-1 text-sm font-bold text-[#00703c]">
                    {explainer.status}
                  </p>
                  <div className="mt-6">
                    <TextLink
                      href={`/countries/${country.slug}/${explainer.slug}`}
                    >
                      Open explainer
                    </TextLink>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mt-8 bg-[#fbfcf8]">
              <h3 className="text-2xl font-bold">
                {country.name} is in the queue.
              </h3>
              <p className="mt-4 max-w-3xl leading-7 text-[#3f4842]">
                This page should collect real curiosity first: what people ask,
                what trends spike, and which explainers deserve source-backed
                writing. That keeps LoreSabi away from becoming a static
                encyclopedia page.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <TextLink href="/countries">Browse other countries</TextLink>
                <TextLink href="/trends">Open trend signals</TextLink>
              </div>
            </Card>
          )}
        </Container>
      </section>
    </PageShell>
  );
}
