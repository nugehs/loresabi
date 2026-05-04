"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { detectBrowserCountry, type ViewerCountry } from "@/lib/viewer-country";

type ViewerContextBadgeProps = {
  contentSource: "Database content" | "Starter profile";
  initialCountry: ViewerCountry;
};

export function ViewerContextBadge({
  contentSource,
  initialCountry,
}: ViewerContextBadgeProps) {
  const browserCountry = useSyncExternalStore(
    subscribeToStableBrowserSnapshot,
    detectBrowserCountry,
    () => null,
  );
  const country = browserCountry ?? initialCountry;

  return (
    <div className="mt-5 rounded border border-[#b9c3ba] bg-white px-4 py-3 text-sm font-semibold text-[#3f4842]">
      <span className="mr-3 inline-block rounded bg-[#e8f2ec] px-2 py-1 text-[#00703c]">
        {contentSource}
      </span>
      Local context:{" "}
      <Link
        className="font-bold text-[#005ea5] underline underline-offset-4"
        href={`/countries/${country.slug}`}
      >
        {country.name}
      </Link>
    </div>
  );
}

function subscribeToStableBrowserSnapshot() {
  return () => undefined;
}
