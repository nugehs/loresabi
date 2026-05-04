import Link from "next/link";
import { ColonialNigeriaFlag, NigeriaFlag } from "@/components/flags";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, PrimaryLink, TextLink } from "@/components/ui";
import { countries, nigeriaExplainers, trendingItems } from "@/lib/content";

const explainerSections = [
  {
    title: "Short answer first",
    body: "People should get the useful answer before the deep dive. Then they can choose context, timeline, sources, or related questions.",
  },
  {
    title: "Built around trust",
    body: "Every serious explainer needs source links, image attribution, last updated dates, and a clear review status.",
  },
  {
    title: "AI stays behind the curtain",
    body: "LoreSabi should feel like a clean knowledge product. AI helps research, classify, and draft, but the user sees structured context.",
  },
];

export default function Home() {
  const featured = nigeriaExplainers[0];

  return (
    <PageShell>
      <SiteHeader />

      <section className="border-b border-[#d8ded6]">
        <Container className="grid gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="mb-5 text-base font-bold text-[#00703c]">Country context, made simple</p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              Understand any country without the confusion.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#3f4842]">
              Search history, culture, current affairs, pop culture, flags, and the questions people are asking now. Clear answers, visible sources, and context you can actually remember.
            </p>

            <form className="mt-10 max-w-2xl" role="search" aria-label="Search LoreSabi" action="/search">
              <label className="mb-3 block text-lg font-bold" htmlFor="search">
                Search a country, topic, or question
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
              {countries.map((country) => (
                <Link key={country.slug} className="rounded border border-[#b9c3ba] bg-white px-4 py-2 text-sm font-bold text-[#151917] hover:border-[#00703c] hover:text-[#00703c]" href={`/countries/${country.slug}`}>
                  {country.name}
                </Link>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-[#d8ded6] bg-[#e8f2ec] p-6" aria-label="Featured explainer preview">
            <Card>
              <p className="text-sm font-bold uppercase tracking-wide text-[#00703c]">Featured explainer</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">{featured.title}</h2>
              <div className="mt-6 flex gap-5">
                <ColonialNigeriaFlag />
                <NigeriaFlag />
              </div>
              <p className="mt-5 text-base leading-7 text-[#3f4842]">{featured.shortAnswer}</p>
              <div className="mt-6">
                <TextLink href="/countries/nigeria/old-nigerian-flag">Read the simple version</TextLink>
              </div>
            </Card>
          </aside>
        </Container>
      </section>

      <section className="border-b border-[#d8ded6] bg-white py-14">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <Eyebrow>Trending curiosity</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">What people are trying to understand now</h2>
            </div>
            <TextLink href="/trends">View all trends</TextLink>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-4">
            {trendingItems.map((item) => (
              <Card key={`${item.country}-${item.topic}`} className="bg-[#fbfcf8]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-bold text-[#5d665f]">{item.country}</p>
                  <p className="rounded bg-[#e8f2ec] px-2 py-1 text-sm font-bold text-[#00703c]">{item.change}</p>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{item.topic}</h3>
                <p className="mt-2 text-sm font-bold text-[#00703c]">{item.category}</p>
                <p className="mt-4 leading-7 text-[#3f4842]">{item.reason}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>Explainer format</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">Built like a service, not a feed</h2>
            <p className="mt-5 text-lg leading-8 text-[#3f4842]">
              The foundation is inspired by the UK design guide: plain language, obvious actions, strong accessibility, and no hiding the important bits behind clever UI.
            </p>
            <div className="mt-6">
              <PrimaryLink href="/countries/nigeria">Explore Nigeria</PrimaryLink>
            </div>
          </div>
          <div className="grid gap-4">
            {explainerSections.map((section) => (
              <Card key={section.title}>
                <h3 className="text-xl font-bold">{section.title}</h3>
                <p className="mt-3 leading-7 text-[#3f4842]">{section.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#151917] py-14 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="font-bold text-[#ffdd00]">Monetization later</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">Keep basic understanding free. Charge for depth.</h2>
          </div>
          <p className="text-lg leading-8 text-[#dce5dc]">
            Pro can become saved country packs, offline explainers, audio briefings, school packs, diaspora guides, and advanced trend alerts. The free product should still answer the basic question clearly.
          </p>
        </Container>
      </section>
    </PageShell>
  );
}
