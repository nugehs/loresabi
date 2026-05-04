import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { countries } from "@/lib/content";

export default function CountriesPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="py-14 lg:py-20">
        <Eyebrow>Countries</Eyebrow>
        <h1 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight">Start with a country. Then follow the context.</h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-[#3f4842]">
          LoreSabi country pages collect the useful basics, explainers, trends, symbols, and current conversations in one place.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) => (
            <Card key={country.slug}>
              <p className="text-sm font-bold text-[#00703c]">{country.region}</p>
              <h2 className="mt-3 text-3xl font-bold">{country.name}</h2>
              <p className="mt-4 leading-7 text-[#3f4842]">{country.summary}</p>
              <p className="mt-5 inline-block rounded bg-[#e8f2ec] px-3 py-1 text-sm font-bold text-[#00703c]">{country.status}</p>
              <div className="mt-6">
                <Link className="font-bold text-[#005ea5] underline underline-offset-4" href={`/countries/${country.slug}`}>Open country guide</Link>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </PageShell>
  );
}
