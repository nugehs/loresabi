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
        <Container className="grid gap-8 py-12 lg:grid-cols-[180px_1fr] lg:py-16">
          <div aria-hidden="true">
            {country.slug === "nigeria" ? (
              <NigeriaFlag className="h-24 w-40" />
            ) : (
              <div className="flex h-24 w-40 items-center justify-center rounded border-2 border-[#151917] bg-white text-3xl font-bold">
                {country.iso2 ?? country.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <div className="max-w-4xl">
            <Eyebrow>{country.name}</Eyebrow>
            <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-6xl">
              What are people asking about {country.name}?
            </h1>
            <p className="mt-6 max-w-3xl text-xl leading-8 text-[#26312b]">
              Start with a question. LoreSabi gives the simple answer when one
              exists, and tracks unanswered questions as signals.
            </p>
            <ViewerContextBadge
              contentSource={
                hasPublishedContent ? "Database content" : "Starter profile"
              }
              initialCountry={viewer.country}
            />

            <form
              action="/search"
              aria-label={`Search ${country.name}`}
              className="mt-8 max-w-3xl"
              role="search"
            >
              <label className="mb-3 block text-lg font-bold" htmlFor="q">
                Ask about {country.name}
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  className="min-h-14 flex-1 rounded border-2 border-[#151917] bg-white px-4 text-lg outline-offset-4 placeholder:text-[#626b65] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                  id="q"
                  name="q"
                  placeholder={`Try: Why is ${country.name} in the news?`}
                  type="search"
                />
                <input name="country" type="hidden" value={country.slug} />
                <button
                  className="min-h-14 rounded bg-[#00703c] px-7 text-lg font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3">
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

      <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_0.8fr]">
        <Card className="bg-[#fbfcf8]">
          <h2 className="text-3xl font-bold">Curiosity signals</h2>
          <p className="mt-3 leading-7 text-[#3f4842]">
            These are questions or topics to explain, labelled by source.
          </p>
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
        <Card>
          <h2 className="text-3xl font-bold">Country context</h2>
          <p className="mt-5 text-lg leading-8 text-[#3f4842]">
            {country.summary}
          </p>
          <div className="mt-6">
            <TextLink
              href={`/search?q=${encodeURIComponent(`What should I know about ${country.name}?`)}&country=${country.slug}`}
            >
              Ask the simple version
            </TextLink>
          </div>
        </Card>
      </Container>

      <section className="border-y border-[#d8ded6] bg-white py-14">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>
                {hasPublishedContent ? "Answered" : "Needs answers"}
              </Eyebrow>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">
                Answered questions
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
                Ask a question
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
                No reviewed answers for {country.name} yet.
              </h3>
              <p className="mt-4 max-w-3xl leading-7 text-[#3f4842]">
                Searches and reliable signals will decide which questions get
                written first.
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
