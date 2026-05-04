"use client";

import { useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type CheckoutResponse = {
  setupRequired: boolean;
  missing?: string[];
  url?: string;
};

export function ProCheckout() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("Stripe is wired, but needs your Stripe keys.");

  async function startCheckout() {
    const response = await fetch(`${apiBaseUrl}/billing/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as CheckoutResponse;

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setMessage(
      data.setupRequired
        ? `Setup needed: ${(data.missing ?? []).join(", ")}`
        : "Checkout could not start.",
    );
  }

  return (
    <div className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">LoreSabi Pro</h2>
      <p className="mt-3 leading-7 text-[#3f4842]">
        Country packs, saved explainers, alerts, and school-ready materials can
        sit behind Pro when Stripe is configured.
      </p>
      <label className="mt-5 block font-bold" htmlFor="pro-email">
        Email
      </label>
      <input
        id="pro-email"
        className="mt-2 min-h-12 w-full rounded border-2 border-[#151917] px-4 outline-offset-4 focus:outline focus:outline-4 focus:outline-[#ffdd00]"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        type="email"
        value={email}
      />
      <button
        className="mt-5 min-h-12 rounded bg-[#00703c] px-5 font-bold text-white"
        onClick={startCheckout}
        type="button"
      >
        Start checkout
      </button>
      <p className="mt-4 font-semibold text-[#3f4842]">{message}</p>
    </div>
  );
}
