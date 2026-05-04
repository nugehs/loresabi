import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, PrimaryLink } from "@/components/ui";
import { getCountry, getTrends, searchContent } from "@/lib/api";

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
    country?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q ?? "";
  const country = params?.country ?? "nigeria";
  const [results, trends, countryDetail] = await Promise.all([
    searchContent(query, country),
    getTrends(country),
    getCountry(country),
  ]);
  const bestAnswer = results.explainers[0];
  const trackedTrend = trends.find(
    (item) => item.topic.toLowerCase() === query.trim().toLowerCase(),
  );

  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Ask LoreSabi</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">Ask a country question.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          If LoreSabi has a reviewed answer, you get it first. If not, the question becomes a signal for what should be explained next.
        </p>

        <form className="mt-10 max-w-3xl" role="search" aria-label="Search LoreSabi" action="/search">
          <label className="mb-3 block text-lg font-bold" htmlFor="q">Try a question</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="q" name="q" defaultValue={query} className="min-h-14 flex-1 rounded border-2 border-[#151917] bg-white px-4 text-lg outline-offset-4 placeholder:text-[#626b65] focus:outline focus:outline-4 focus:outline-[#ffdd00]" placeholder="How did Nigeria get its name?" type="search" />
            <input name="country" type="hidden" value={country} />
            <button className="min-h-14 rounded bg-[#00703c] px-7 text-lg font-bold text-white" type="submit">Search</button>
          </div>
        </form>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Card>
            <Eyebrow>{query ? `Results for "${results.query}"` : "Try a question"}</Eyebrow>
            {bestAnswer ? (
              <>
                <h2 className="mt-3 text-3xl font-bold">{bestAnswer.title}</h2>
                <p className="mt-4 text-lg leading-8 text-[#3f4842]">{bestAnswer.shortAnswer}</p>
                <div className="mt-6">
                  <PrimaryLink href={`/countries/${bestAnswer.country.slug}/${bestAnswer.slug}`}>Open full explainer</PrimaryLink>
                </div>
              </>
            ) : (
              <>
                {trackedTrend ? (
                  <>
                    <h2 className="mt-3 text-3xl font-bold">
                      Tracked question, no explainer yet
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-[#3f4842]">
                      LoreSabi has logged “{trackedTrend.topic}” as a{" "}
                      {countryDetail?.name ?? "country"} curiosity signal, but
                      there is no reviewed answer for it yet.
                    </p>
                    <p className="mt-4 rounded bg-[#fff7e8] px-4 py-3 font-semibold text-[#8a4b00]">
                      {trackedTrend.reason}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <Link
                        className="font-bold text-[#005ea5] underline underline-offset-4"
                        href={`/countries/${country}`}
                      >
                        Back to {countryDetail?.name ?? "country"} questions
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mt-3 text-3xl font-bold">
                      No exact explainer yet
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-[#3f4842]">
                      LoreSabi found no source-reviewed explainer for this
                      country yet. This question has been tracked as a signal
                      for what should be explained next.
                    </p>
                    {query ? (
                      <div className="mt-6">
                        <PrimaryLink href={`/countries/${country}`}>
                          Back to {countryDetail?.name ?? "country"} questions
                        </PrimaryLink>
                      </div>
                    ) : null}
                  </>
                )}
              </>
            )}
          </Card>
          <Card className="bg-[#fbfcf8]">
            <h2 className="text-2xl font-bold">Related searches</h2>
            <div className="mt-5 grid gap-3">
              {trends.map((item) => (
                <Link key={item.topic} className="rounded border border-[#d8ded6] bg-white px-4 py-3 font-bold text-[#005ea5] underline underline-offset-4" href={`/search?q=${encodeURIComponent(item.topic)}&country=${country}`}>
                  {item.topic}
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
