import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { getEditorialQueue } from "@/lib/api";

const statusStyles: Record<string, string> = {
  Published: "bg-[#e8f2ec] text-[#00703c]",
  Draft: "bg-[#fff7e8] text-[#8a4b00]",
  "In Review": "bg-[#e8f0ff] text-[#005ea5]",
  Archived: "bg-[#eceff1] text-[#3f4842]",
};

export default async function EditorialPage() {
  const queue = await getEditorialQueue("nigeria");

  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Editorial queue</Eyebrow>
        <h1 className="mt-3 max-w-4xl text-5xl font-bold tracking-tight">
          Nigeria editorial queue
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          This is the internal content runway: published pieces stay public,
          draft pieces wait for source review, images, and editorial polish.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <Metric label="Total" value={queue.counts.total} />
          <Metric label="Published" value={queue.counts.published} />
          <Metric label="Draft" value={queue.counts.draft} />
          <Metric label="In review" value={queue.counts.inReview} />
        </div>

        <div className="mt-10 grid gap-5">
          {queue.explainers.map((explainer, index) => (
            <Card key={explainer.slug}>
              <div className="grid gap-5 lg:grid-cols-[70px_1fr_170px_150px] lg:items-start">
                <p className="text-2xl font-bold text-[#00703c]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h2 className="text-2xl font-bold">{explainer.title}</h2>
                  <p className="mt-3 leading-7 text-[#3f4842]">
                    {explainer.summary}
                  </p>
                  <p className="mt-3 text-sm font-bold text-[#5d665f]">
                    {explainer.category} • {explainer.readTime} •{" "}
                    {explainer.sources.length} sources
                  </p>
                </div>
                <span
                  className={`inline-flex min-h-9 items-center justify-center rounded px-3 text-sm font-bold ${
                    statusStyles[explainer.status] ?? statusStyles.Draft
                  }`}
                >
                  {explainer.status}
                </span>
                {explainer.status === "Published" ? (
                  <Link
                    className="font-bold text-[#005ea5] underline underline-offset-4"
                    href={`/countries/${queue.country.slug}/${explainer.slug}`}
                  >
                    Open public page
                  </Link>
                ) : (
                  <span className="font-bold text-[#5d665f]">Needs review</span>
                )}
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
