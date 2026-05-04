import Link from "next/link";
import { ColonialNigeriaFlag, NigeriaFlag } from "@/components/flags";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell, PrimaryLink } from "@/components/ui";
import { nigeriaExplainers, sources, timeline } from "@/lib/content";

export default function OldNigerianFlagPage() {
  const explainer = nigeriaExplainers[0];

  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-12 lg:py-16">
        <div className="mb-8">
          <Link className="font-bold text-[#005ea5] underline underline-offset-4" href="/countries/nigeria">
            Back to Nigeria
          </Link>
        </div>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>{explainer.category} explainer</Eyebrow>
            <h1 className="mt-3 max-w-4xl text-5xl font-bold leading-tight tracking-tight lg:text-6xl">
              {explainer.title}
            </h1>
            <p className="mt-5 text-base font-semibold text-[#5d665f]">Updated May 2026 • 4 sources • {explainer.readTime}</p>
          </div>
          <Card className="bg-[#fbfcf8]">
            <p className="text-sm font-bold uppercase tracking-wide text-[#00703c]">Image comparison</p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div>
                <ColonialNigeriaFlag className="h-28 w-48" />
                <p className="mt-3 text-sm font-semibold text-[#5d665f]">Before independence</p>
              </div>
              <div>
                <NigeriaFlag className="h-28 w-48" />
                <p className="mt-3 text-sm font-semibold text-[#5d665f]">From 1960</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>

      <section className="border-y border-[#d8ded6] bg-white py-14">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <Card>
            <Eyebrow>Short answer</Eyebrow>
            <p className="mt-4 text-2xl font-semibold leading-9">{explainer.shortAnswer}</p>
          </Card>
          <Card>
            <Eyebrow>Why it matters</Eyebrow>
            <p className="mt-4 text-lg leading-8 text-[#3f4842]">{explainer.whyItMatters}</p>
          </Card>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">The flag story in three steps</h2>
        </div>
        <div className="relative grid gap-6 border-l-4 border-[#00703c] pl-8">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-[43px] top-1 h-5 w-5 rounded-full bg-[#00703c]" />
              <h3 className="text-xl font-bold">{item.year}</h3>
              <p className="mt-2 leading-7 text-[#3f4842]">{item.event}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="border-t border-[#d8ded6] bg-[#151917] py-14 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-bold text-[#ffdd00]">Sources and attribution</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">Trust should be visible.</h2>
          </div>
          <div className="grid gap-3">
            {sources.map((source) => (
              <div key={source} className="rounded border border-[#3a463f] px-4 py-3 font-semibold text-[#dce5dc]">
                {source}
              </div>
            ))}
            <p className="mt-3 text-sm leading-6 text-[#b9c3ba]">
              This MVP uses simplified drawn flag visuals. Real image licensing and attribution will be stored before public launch.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <PrimaryLink href="/countries/nigeria">Explore more Nigeria explainers</PrimaryLink>
      </Container>
    </PageShell>
  );
}
