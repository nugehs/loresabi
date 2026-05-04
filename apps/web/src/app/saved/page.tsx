import { SiteHeader } from "@/components/site-header";
import { Container, Eyebrow, PageShell } from "@/components/ui";
import { SavedItems } from "./saved-items";

export default function SavedPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <div>
          <Eyebrow>Saved explainers</Eyebrow>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            A temporary saved-items flow before real accounts.
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#3f4842]">
            This proves the database behavior now. Proper auth can replace the
            email field later without changing the saved-items model.
          </p>
        </div>
        <SavedItems />
      </Container>
    </PageShell>
  );
}
