import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, PrimaryLink } from "@/components/ui";
import { nigeriaExplainers, trendingItems } from "@/lib/content";

export default function SearchPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Search</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">Search anything about a country.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          Search is static in this MVP, but the layout is ready for query routing, existing explainer lookup, and AI draft generation later.
        </p>

        <form className="mt-10 max-w-3xl" role="search" aria-label="Search LoreSabi">
          <label className="mb-3 block text-lg font-bold" htmlFor="q">Try a question</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="q" name="q" className="min-h-14 flex-1 rounded border-2 border-[#151917] bg-white px-4 text-lg outline-offset-4 placeholder:text-[#626b65] focus:outline focus:outline-4 focus:outline-[#ffdd00]" placeholder="How did Nigeria get its name?" type="search" />
            <button className="min-h-14 rounded bg-[#00703c] px-7 text-lg font-bold text-white" type="button">Search</button>
          </div>
        </form>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Card>
            <Eyebrow>Best answer</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold">Did Nigeria have another flag before?</h2>
            <p className="mt-4 text-lg leading-8 text-[#3f4842]">{nigeriaExplainers[0].shortAnswer}</p>
            <div className="mt-6">
              <PrimaryLink href="/countries/nigeria/old-nigerian-flag">Open full explainer</PrimaryLink>
            </div>
          </Card>
          <Card className="bg-[#fbfcf8]">
            <h2 className="text-2xl font-bold">Related searches</h2>
            <div className="mt-5 grid gap-3">
              {trendingItems.map((item) => (
                <Link key={item.topic} className="rounded border border-[#d8ded6] bg-white px-4 py-3 font-bold text-[#005ea5] underline underline-offset-4" href={item.topic === 'Old Nigerian flag' ? '/countries/nigeria/old-nigerian-flag' : '/search'}>
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
