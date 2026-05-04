import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { trendingItems } from "@/lib/content";

export default function TrendsPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Trends dashboard</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">What people are searching, reading, and talking about by country.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          This page will eventually combine Google Trends, Wikipedia pageviews, news APIs, and editorial review. For now it shows the static MVP structure.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {['Global', 'Nigeria', 'History', 'Current affairs', 'Pop culture'].map((filter, index) => (
            <span key={filter} className={`rounded border px-4 py-2 text-sm font-bold ${index === 1 ? 'border-[#151917] bg-[#151917] text-white' : 'border-[#b9c3ba] bg-white text-[#151917]'}`}>{filter}</span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {trendingItems.map((item) => (
              <Card key={`${item.rank}-${item.topic}`} className={item.category === 'Current affairs' ? 'bg-[#fff7e8]' : 'bg-white'}>
                <div className="grid gap-4 md:grid-cols-[80px_1fr_150px_90px] md:items-center">
                  <p className="text-2xl font-bold text-[#00703c]">{item.rank}</p>
                  <div>
                    <h2 className="text-2xl font-bold">{item.topic}</h2>
                    <p className="mt-2 leading-7 text-[#3f4842]">{item.reason}</p>
                  </div>
                  <p className="font-bold text-[#3f4842]">{item.category}</p>
                  <p className="text-right text-lg font-bold text-[#00703c]">{item.change}</p>
                </div>
              </Card>
            ))}
          </div>
          <Card className="bg-[#151917] text-white">
            <p className="font-bold text-[#ffdd00]">Pro layer later</p>
            <h2 className="mt-3 text-3xl font-bold">Save the deeper country pulse.</h2>
            <p className="mt-5 leading-7 text-[#dce5dc]">
              Advanced trend alerts, country packs, offline reading, school packs, and diaspora guides can sit here when monetization is ready.
            </p>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
