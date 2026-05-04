import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { getAttributionReport } from "@/lib/api";

export default async function AttributionPage() {
  const report = await getAttributionReport("nigeria");

  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Attribution report</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">
          What needs sources or image credits before publication.
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          This keeps LoreSabi honest: drafts can exist quickly, but publishing
          should wait until sources and image attribution are visible.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <Metric label="Total explainers" value={report.counts.total} />
          <Metric label="Missing sources" value={report.counts.missingSources} />
          <Metric label="Missing images" value={report.counts.missingImages} />
          <Metric
            label="Missing image credits"
            value={report.counts.missingImageCredits}
          />
        </div>

        <div className="mt-10 grid gap-5">
          {report.explainers.map((explainer) => (
            <Card key={explainer.slug}>
              <div className="grid gap-5 lg:grid-cols-[1fr_160px_160px_190px] lg:items-center">
                <div>
                  <h2 className="text-2xl font-bold">{explainer.title}</h2>
                  <p className="mt-2 text-sm font-bold text-[#5d665f]">
                    {explainer.status} • {explainer.category}
                  </p>
                </div>
                <Check label="Sources" ok={explainer.attribution.hasSources} />
                <Check label="Images" ok={explainer.attribution.hasImages} />
                <Check
                  label="Image credits"
                  ok={explainer.attribution.imagesHaveCredits}
                />
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <p className="text-sm font-bold text-[#5d665f]">{label}</p>
      <p className="mt-2 text-4xl font-bold">{value}</p>
    </Card>
  );
}

function Check({ label, ok }: { label: string; ok: boolean }) {
  return (
    <p
      className={`rounded px-3 py-2 text-center text-sm font-bold ${
        ok ? "bg-[#e8f2ec] text-[#00703c]" : "bg-[#fff7e8] text-[#8a4b00]"
      }`}
    >
      {ok ? "OK" : "Needs work"}: {label}
    </p>
  );
}
