import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { ProCheckout } from "./pro-checkout";

const features = [
  "Saved country packs",
  "Advanced trend alerts",
  "School and university explainer packs",
  "Offline reading exports",
  "Audio briefing experiments",
];

export default function ProPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="grid gap-10 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <Eyebrow>Pro foundation</Eyebrow>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Keep basic understanding free. Charge for depth.
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#3f4842]">
            This page is wired for Stripe Checkout. It stays in setup mode until
            you create a Stripe account and add the production Price ID.
          </p>
          <div className="mt-8 grid gap-3">
            {features.map((feature) => (
              <Card key={feature}>
                <p className="font-bold">{feature}</p>
              </Card>
            ))}
          </div>
        </div>
        <ProCheckout />
      </Container>
    </PageShell>
  );
}
