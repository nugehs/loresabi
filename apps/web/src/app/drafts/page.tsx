import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Container, Eyebrow, PageShell } from "@/components/ui";
import { DraftGenerator } from "./draft-generator";

type DraftsPageProps = {
  searchParams?: Promise<{
    q?: string;
    country?: string;
  }>;
};

export default async function DraftsPage({ searchParams }: DraftsPageProps) {
  const params = await searchParams;
  const initialQuestion =
    params?.q ?? "Why did Lagos stop being Nigeria's capital?";
  const initialCountry = params?.country ?? "nigeria";

  return (
    <PageShell>
      <SiteHeader />
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <div>
          <Eyebrow>AI draft desk</Eyebrow>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Turn a search question into a reviewable explainer draft.
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#3f4842]">
            This is not auto-publishing. Drafts stay in the editorial queue until
            sources, images, and wording are checked.
          </p>
          <div className="mt-8">
            <Link
              className="font-bold text-[#005ea5] underline underline-offset-4"
              href="/editorial"
            >
              Open editorial queue
            </Link>
          </div>
        </div>
        <DraftGenerator
          initialCountry={initialCountry}
          initialQuestion={initialQuestion}
        />
      </Container>
    </PageShell>
  );
}
