import Link from "next/link";
import { ColonialNigeriaFlag, NigeriaFlag } from "@/components/flags";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, TextLink } from "@/components/ui";
import { getCountries, getCountry, getTrends } from "@/lib/api";

export default async function Home() {
  const [countries, nigeria, trendingItems] = await Promise.all([
    getCountries(),
    getCountry("nigeria"),
    getTrends(),
  ]);
  const featured = nigeria?.explainers[0];

  return (
    <PageShell>
      <SiteHeader />

      <section className="border-b border-[#d8ded6]">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="mb-5 text-base font-bold text-[#00703c]">Country questions, made simple</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              See what people ask. Get the simple answer.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#3f4842]">
              Search a country question about history, current affairs, pop culture, flags, names, slang, or symbols. LoreSabi answers what it can and tracks what people want explained next.
            </p>

            <form className="mt-10 max-w-2xl" role="search" aria-label="Search LoreSabi" action="/search">
              <label className="mb-3 block text-lg font-bold" htmlFor="search">
                Ask a country question
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="search"
                  name="q"
                  className="min-h-14 flex-1 rounded border-2 border-[#151917] bg-white px-4 text-lg outline-offset-4 placeholder:text-[#626b65] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                  placeholder="Try: Did Nigeria have another flag before?"
                  type="search"
                />
                <button className="min-h-14 rounded bg-[#00703c] px-7 text-lg font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]" type="submit">
                  Search
                </button>
              </div>
            </form>

            <div className="mt-8 flex flex-wrap gap-3" aria-label="Popular countries">
              <p className="w-full text-sm font-bold text-[#5d665f]">Or choose a country</p>
              {countries.map((country) => (
                <Link key={country.slug} className="rounded border border-[#b9c3ba] bg-white px-4 py-2 text-sm font-bold text-[#151917] hover:border-[#00703c] hover:text-[#00703c]" href={`/countries/${country.slug}`}>
                  {country.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[#d8ded6] bg-[#e8f2ec] p-6" aria-label="Featured explainer preview">
            <Card>
              <p className="text-sm font-bold uppercase tracking-wide text-[#00703c]">Example answer</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">{featured?.title ?? "Nigeria had a different flag before independence"}</h2>
              <div className="mt-6 flex gap-5">
                <ColonialNigeriaFlag />
                <NigeriaFlag />
              </div>
              <p className="mt-5 text-base leading-7 text-[#3f4842]">{featured?.shortAnswer ?? "Before the green-white-green flag, colonial Nigeria used British ensign-style flags with a local badge."}</p>
              <div className="mt-6">
                <TextLink href={`/countries/nigeria/${featured?.slug ?? "old-nigerian-flag"}`}>Open answer</TextLink>
              </div>
            </Card>
          </aside>
        </Container>
      </section>

      <section className="border-b border-[#d8ded6] bg-white py-14">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>Curiosity signals</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Questions to explain next</h2>
            </div>
            <TextLink href="/trends">View signals</TextLink>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {trendingItems.map((item) => (
              <Link
                key={`${item.country?.slug ?? "global"}-${item.topic}`}
                className="rounded-lg border border-[#d8ded6] bg-[#fbfcf8] p-6 shadow-sm hover:border-[#00703c]"
                href={`/search?q=${encodeURIComponent(item.topic)}&country=${item.country?.slug ?? "nigeria"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-bold text-[#5d665f]">{item.country?.name ?? "Global"}</p>
                  <p className="rounded bg-[#e8f2ec] px-2 py-1 text-sm font-bold text-[#00703c]">{item.change}</p>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{item.topic}</h3>
                <p className="mt-2 text-sm font-bold text-[#00703c]">{item.category}</p>
                <p className="mt-4 leading-7 text-[#3f4842]">{item.reason}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
