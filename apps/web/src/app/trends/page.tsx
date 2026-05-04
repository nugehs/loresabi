import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { getTrends } from "@/lib/api";

const sourceNotes = [
  ["Google Trends", "Real search demand. Best source, but official API access is alpha/approval-based."],
  ["Wikipedia pageviews", "Public proxy for what people are reading and looking up."],
  ["News signal", "Current-affairs attention from trusted news-scale datasets."],
  ["Internal search", "What LoreSabi users are asking inside the product."],
  ["Editorial seed", "Starter content only. Not presented as live trending demand."],
];

export default async function TrendsPage() {
  const trends = await getTrends();

  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Curiosity signals</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">Questions by source, not guesswork.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          LoreSabi should only call something a trend when the source is visible. Editorial seed rows are starter content until live search, reading, news, or internal-search signals are connected.
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {trends.map((item) => (
              <Link
                key={`${item.rank}-${item.topic}`}
                className="block rounded-lg outline-offset-4 focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                href={`/search?q=${encodeURIComponent(item.topic)}&country=${item.country?.slug ?? "nigeria"}`}
              >
                <Card className={item.category === "Editorial seed" ? "bg-[#fff7e8]" : "bg-white"}>
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
              </Link>
            ))}
          </div>
          <Card className="bg-[#151917] text-white">
            <p className="font-bold text-[#ffdd00]">Source rules</p>
            <h2 className="mt-3 text-3xl font-bold">No source, no trend claim.</h2>
            <div className="mt-5 grid gap-4">
              {sourceNotes.map(([source, note]) => (
                <div key={source}>
                  <p className="font-bold">{source}</p>
                  <p className="mt-1 leading-7 text-[#dce5dc]">{note}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
