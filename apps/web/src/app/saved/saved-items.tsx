"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type SavedItem = {
  id: string;
  createdAt: string;
  explainer: {
    slug: string;
    title: string;
    summary: string;
    country: { slug: string; name: string };
  };
};

type SavedResponse = {
  savedItems: SavedItem[];
};

export function SavedItems() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Enter an email to load saved explainers.");
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  async function load(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    if (!email.trim()) {
      setMessage("Email is required for this temporary saved-items flow.");
      return;
    }

    const response = await fetch(
      `${apiBaseUrl}/saved-items?email=${encodeURIComponent(email)}`,
    );
    const data = (await response.json()) as SavedResponse;
    setSavedItems(data.savedItems);
    setMessage(
      data.savedItems.length
        ? `Loaded ${data.savedItems.length} saved explainers.`
        : "No saved explainers yet.",
    );
  }

  async function save(slug: string) {
    if (!email.trim()) {
      setMessage("Enter an email first.");
      return;
    }

    await fetch(`${apiBaseUrl}/saved-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        countrySlug: "nigeria",
        explainerSlug: slug,
      }),
    });
    await load();
  }

  return (
    <div className="grid gap-6">
      <form
        className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm"
        onSubmit={load}
      >
        <label className="block text-lg font-bold" htmlFor="saved-email">
          Email
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="saved-email"
            className="min-h-12 flex-1 rounded border-2 border-[#151917] px-4 outline-offset-4 focus:outline focus:outline-4 focus:outline-[#ffdd00]"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
          <button
            className="min-h-12 rounded bg-[#00703c] px-5 font-bold text-white"
            type="submit"
          >
            Load
          </button>
        </div>
        <p className="mt-4 font-semibold text-[#3f4842]">{message}</p>
      </form>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          className="min-h-12 rounded border-2 border-[#00703c] bg-white px-5 font-bold text-[#00703c]"
          onClick={() => save("old-nigerian-flag")}
          type="button"
        >
          Save old flag explainer
        </button>
        <button
          className="min-h-12 rounded border-2 border-[#00703c] bg-white px-5 font-bold text-[#00703c]"
          onClick={() => save("how-nigeria-got-its-name")}
          type="button"
        >
          Save name explainer
        </button>
      </div>

      <div className="grid gap-4">
        {savedItems.map((item) => (
          <div
            className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm"
            key={item.id}
          >
            <h2 className="text-2xl font-bold">{item.explainer.title}</h2>
            <p className="mt-3 leading-7 text-[#3f4842]">
              {item.explainer.summary}
            </p>
            <Link
              className="mt-5 inline-block font-bold text-[#005ea5] underline underline-offset-4"
              href={`/countries/${item.explainer.country.slug}/${item.explainer.slug}`}
            >
              Open explainer
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
