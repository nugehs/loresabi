import { CountryPage } from "@/components/country-page";

type CountryRouteProps = {
  params: Promise<{
    countrySlug: string;
  }>;
};

export default async function CountryRoute({ params }: CountryRouteProps) {
  const { countrySlug } = await params;

  return <CountryPage countrySlug={countrySlug} />;
}
