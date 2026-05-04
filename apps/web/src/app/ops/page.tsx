import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Card, Container, Eyebrow, PageShell } from "@/components/ui";
import { TrendsIngestion } from "./trends-ingestion";

const userTasks = [
  "Create production Postgres database and set DATABASE_URL",
  "Add DeepSeek AI variables to production when deploying",
  "Create Vercel project and add environment variables",
  "Point loresabi.com DNS when ready",
  "OpenAI and Stripe stay parked until you decide to use them",
];

export default function OpsPage() {
  return (
    <PageShell>
      <SiteHeader />
      <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1fr] lg:py-20">
        <div>
          <Eyebrow>Ops desk</Eyebrow>
          <h1 className="mt-3 text-5xl font-bold tracking-tight">
            Buildable work on the left. Segzy-only setup on the right.
          </h1>
          <p className="mt-6 text-xl leading-8 text-[#3f4842]">
            Anything that needs your private accounts, payment details, or DNS
            access stays here instead of blocking code progress.
          </p>
          <div className="mt-8">
            <Link
              className="font-bold text-[#005ea5] underline underline-offset-4"
              href="/trends"
            >
              Open trends dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-5">
          <TrendsIngestion />
          <Card className="bg-[#151917] text-white">
            <p className="font-bold text-[#ffdd00]">You need to sort</p>
            <ul className="mt-5 grid gap-3 text-[#dce5dc]">
              {userTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </Card>
        </div>
      </Container>
    </PageShell>
  );
}
