"use client";

import { FormEvent, useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type DraftResponse = {
  mode: "openai" | "local_fallback" | "existing_published";
  explainer: {
    slug: string;
    title: string;
    summary: string;
    status: string;
    category: string;
  };
  nextSteps?: string[];
};

export function DraftGenerator() {
  const [question, setQuestion] = useState("Why did Lagos stop being Nigeria's capital?");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [draft, setDraft] = useState<DraftResponse | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setDraft(null);

    try {
      const response = await fetch(`${apiBaseUrl}/ai/drafts/explainers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          countrySlug: "nigeria",
          question,
          topicSlug: "current-curiosity",
        }),
      });

      if (!response.ok) {
        throw new Error("Draft request failed");
      }

      setDraft((await response.json()) as DraftResponse);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm">
      <form onSubmit={submit}>
        <label className="block text-lg font-bold" htmlFor="draft-question">
          Draft question
        </label>
        <textarea
          id="draft-question"
          className="mt-3 min-h-32 w-full rounded border-2 border-[#151917] bg-white px-4 py-3 text-lg outline-offset-4 focus:outline focus:outline-4 focus:outline-[#ffdd00]"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
        />
        <button
          className="mt-4 min-h-12 rounded bg-[#00703c] px-5 text-base font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
          disabled={status === "loading"}
          type="submit"
        >
          {status === "loading" ? "Drafting..." : "Generate draft"}
        </button>
      </form>

      {status === "error" ? (
        <p className="mt-5 font-bold text-[#b10e1e]">
          Drafting failed. Check that the API is running on port 4000.
        </p>
      ) : null}

      {draft ? (
        <div className="mt-6 border-t border-[#d8ded6] pt-5">
          <p className="text-sm font-bold uppercase text-[#00703c]">
            {draft.mode === "openai"
              ? "OpenAI draft"
              : draft.mode === "existing_published"
                ? "Existing published explainer"
                : "Local fallback draft"}
          </p>
          <h2 className="mt-2 text-2xl font-bold">{draft.explainer.title}</h2>
          <p className="mt-3 leading-7 text-[#3f4842]">
            {draft.explainer.summary}
          </p>
          <p className="mt-4 inline-block rounded bg-[#fff7e8] px-3 py-1 text-sm font-bold text-[#8a4b00]">
            {draft.explainer.status}
          </p>
          {draft.nextSteps?.length ? (
            <ul className="mt-5 grid gap-2 text-sm font-semibold text-[#3f4842]">
              {draft.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
