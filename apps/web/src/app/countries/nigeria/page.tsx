import Link from "next/link";
import { NigeriaFlag } from "@/components/flags";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, PrimaryLink } from "@/components/ui";
import { nigeriaExplainers, trendingItems } from "@/lib/content";

export default function NigeriaPage() {
  return (
    <PageShell>
      <SiteHeader />
      <section className="border-b border-[#d8ded6] bg-[#e8f2ec]">
        <Container className="grid gap-8 py-12 lg:grid-cols-[0.75fr_1.25fr] lg:py-16">
          <div>
            <NigeriaFlag className="h-24 w-40" />
            <Eyebrow>Nigeria country guide</Eyebrow>
            <h1 className="mt-3 text-6xl font-bold tracking-tight">Nigeria</h1>
          </div>
          <div className="max-w-3xl self-end">
            <p className="text-2xl font-semibold leading-9 text-[#26312b]">
              The simple guide to Nigeria&apos;s history, culture, politics, pop culture, national symbols, and live curiosity signals.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Overview', 'History', 'Culture', 'Current affairs', 'Pop culture', 'Trends'].map((tab, index) => (
                <span key={tab} className={`rounded border px-4 py-2 text-sm font-bold ${index === 0 ? 'border-[#151917] bg-[#151917] text-white' : 'border-[#b9c3ba] bg-white text-[#151917]'}`}>{tab}</span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_0.9fr]">
        <Card>
          <h2 className="text-3xl font-bold">60-second Nigeria</h2>
          <p className="mt-5 text-lg leading-8 text-[#3f4842]">
            Nigeria is Africa&apos;s most populous country, shaped by hundreds of ethnic groups, major pre-colonial kingdoms, British colonial rule, independence in 1960, oil politics, Nollywood, Afrobeats, and a huge diaspora.
          </p>
        </Card>
        <Card className="bg-[#fbfcf8]">
          <h2 className="text-3xl font-bold">What people are searching</h2>
          <div className="mt-5 grid gap-4">
            {trendingItems.filter((item) => item.country === 'Nigeria').map((item) => (
              <div key={item.topic} className="border-t border-[#d8ded6] pt-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-bold">{item.rank}. {item.topic}</p>
                  <span className="font-bold text-[#00703c]">{item.change}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#3f4842]">{item.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </Container>

      <section className="border-y border-[#d8ded6] bg-white py-14">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Start with the basics</Eyebrow>
              <h2 className="mt-3 text-4xl font-bold tracking-tight">Nigeria explainers</h2>
            </div>
            <PrimaryLink href="/countries/nigeria/old-nigerian-flag">Read featured explainer</PrimaryLink>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {nigeriaExplainers.map((explainer) => (
              <Card key={explainer.slug}>
                <p className="text-sm font-bold text-[#00703c]">{explainer.category} • {explainer.readTime}</p>
                <h3 className="mt-3 text-2xl font-bold">{explainer.title}</h3>
                <p className="mt-4 leading-7 text-[#3f4842]">{explainer.shortAnswer}</p>
                <p className="mt-5 inline-block rounded bg-[#e8f2ec] px-3 py-1 text-sm font-bold text-[#00703c]">{explainer.status}</p>
                <div className="mt-6">
                  <Link className="font-bold text-[#005ea5] underline underline-offset-4" href={`/countries/nigeria/${explainer.slug}`}>Open explainer</Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}
