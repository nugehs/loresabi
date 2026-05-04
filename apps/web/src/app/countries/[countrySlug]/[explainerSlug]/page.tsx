import { ExplainerPage } from "@/components/explainer-page";

type ExplainerRouteProps = {
  params: Promise<{
    countrySlug: string;
    explainerSlug: string;
  }>;
};

export default async function ExplainerRoute({ params }: ExplainerRouteProps) {
  const { countrySlug, explainerSlug } = await params;

  return (
    <ExplainerPage countrySlug={countrySlug} explainerSlug={explainerSlug} />
  );
}
