"use client";

import { useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function TrendsIngestion() {
  const [message, setMessage] = useState("Ready");

  async function ingest() {
    setMessage("Ingesting search logs...");

    try {
      const response = await fetch(`${apiBaseUrl}/trends/ingest/internal-search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ countrySlug: "nigeria" }),
      });

      if (!response.ok) {
        throw new Error("Ingestion failed");
      }

      const data = (await response.json()) as { ingested: number };
      setMessage(`Created ${data.ingested} internal-search trends.`);
    } catch {
      setMessage("Ingestion failed. Check that the API is running.");
    }
  }

  return (
    <div className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Internal search trends</h2>
      <p className="mt-3 leading-7 text-[#3f4842]">
        Turn recent search logs into trend rows so the trends dashboard can
        reflect what users actually ask inside LoreSabi.
      </p>
      <button
        className="mt-5 min-h-12 rounded bg-[#00703c] px-5 text-base font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
        onClick={ingest}
        type="button"
      >
        Ingest search logs
      </button>
      <p className="mt-4 font-bold text-[#3f4842]">{message}</p>
    </div>
  );
}
