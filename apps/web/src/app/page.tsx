const trendingQuestions = [
  {
    country: "Nigeria",
    topic: "Old Nigerian flag",
    category: "History",
    change: "+42%",
    description: "Why people are searching it and what changed in 1960.",
  },
  {
    country: "Ghana",
    topic: "Black Star meaning",
    category: "Symbols",
    change: "+24%",
    description: "The story behind Ghana's flag and national identity.",
  },
  {
    country: "United Kingdom",
    topic: "Election explained",
    category: "Current affairs",
    change: "+18%",
    description: "A plain-English guide to parties, issues, and what matters.",
  },
];

const countryCards = [
  "Nigeria",
  "Ghana",
  "United Kingdom",
  "United States",
  "South Africa",
];

const explainerSections = [
  {
    title: "Short answer first",
    body: "Before independence, Nigeria used British colonial flags. The green-white-green flag became the national flag on October 1, 1960.",
  },
  {
    title: "Why it matters",
    body: "Flags show political history. The old flag reflected British rule; the current flag marked independence and national identity.",
  },
  {
    title: "Sources stay visible",
    body: "Every explainer should show sources, image credits, and the last updated date so users know what they are trusting.",
  },
];

function NigeriaFlag() {
  return (
    <div
      aria-label="Nigeria flag"
      className="flex h-16 w-28 overflow-hidden rounded border border-[#b9c3ba] bg-white"
    >
      <div className="w-1/3 bg-[#008753]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#008753]" />
    </div>
  );
}

function ColonialFlag() {
  return (
    <div
      aria-label="Simplified British colonial Nigeria flag"
      className="relative h-16 w-28 overflow-hidden rounded border border-[#b9c3ba] bg-[#214f8f]"
    >
      <div className="absolute left-0 top-0 h-8 w-12 bg-white" />
      <div className="absolute left-0 top-[13px] h-2 w-12 bg-[#c93d34]" />
      <div className="absolute left-[20px] top-0 h-8 w-2 bg-[#c93d34]" />
      <div className="absolute right-5 top-5 grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-[#214f8f]">
        N
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#151917]">
      <header className="border-b border-[#d8ded6] bg-[#f7f8f4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a className="leading-none" href="#top" aria-label="LoreSabi home">
            <span className="block text-2xl font-bold tracking-tight">LoreSabi</span>
            <span className="text-sm font-medium text-[#5d665f]">by Bashbop</span>
          </a>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 text-sm font-semibold text-[#3f4842] md:flex"
          >
            <a className="text-[#00703c]" href="#countries">
              Countries
            </a>
            <a href="#trends">Trends</a>
            <a href="#explainer">Explainers</a>
            <a href="#pro">For schools</a>
          </nav>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-7xl gap-12 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-20"
      >
        <div>
          <p className="mb-5 text-base font-bold text-[#00703c]">
            Country context, made simple
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
            Understand any country without the confusion.
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-[#3f4842]">
            Search history, culture, current affairs, pop culture, flags, and
            the questions people are asking now. Clear answers, visible
            sources, and context you can actually remember.
          </p>

          <form className="mt-10 max-w-2xl" role="search" aria-label="Search LoreSabi">
            <label className="mb-3 block text-lg font-bold" htmlFor="search">
              Search a country, topic, or question
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="search"
                name="search"
                className="min-h-14 flex-1 rounded border-2 border-[#151917] bg-white px-4 text-lg outline-offset-4 placeholder:text-[#626b65] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                placeholder="Try: Did Nigeria have another flag before?"
                type="search"
              />
              <button
                className="min-h-14 rounded bg-[#00703c] px-7 text-lg font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
                type="button"
              >
                Search
              </button>
            </div>
          </form>

          <div id="countries" className="mt-8 flex flex-wrap gap-3" aria-label="Popular countries">
            {countryCards.map((country) => (
              <a
                key={country}
                className="rounded border border-[#b9c3ba] bg-white px-4 py-2 text-sm font-bold text-[#151917] hover:border-[#00703c] hover:text-[#00703c]"
                href="#explainer"
              >
                {country}
              </a>
            ))}
          </div>
        </div>

        <aside
          className="rounded-lg border border-[#d8ded6] bg-[#e8f2ec] p-6"
          aria-label="Featured explainer preview"
        >
          <div className="rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-wide text-[#00703c]">
              Featured explainer
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Did Nigeria have another flag before?
            </h2>
            <div className="mt-6 flex gap-5">
              <ColonialFlag />
              <NigeriaFlag />
            </div>
            <p className="mt-5 text-base leading-7 text-[#3f4842]">
              Yes. Before independence, Nigeria used British colonial flags.
              The current green-white-green flag was adopted on October 1,
              1960.
            </p>
            <a
              className="mt-6 inline-block font-bold text-[#005ea5] underline underline-offset-4"
              href="#explainer"
            >
              Read the simple version
            </a>
          </div>
        </aside>
      </section>

      <section id="trends" className="border-y border-[#d8ded6] bg-white py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-base font-bold text-[#00703c]">Trending curiosity</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              What people are trying to understand now
            </h2>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {trendingQuestions.map((item) => (
              <article
                key={item.topic}
                className="rounded-lg border border-[#d8ded6] bg-[#fbfcf8] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-bold text-[#5d665f]">{item.country}</p>
                  <p className="rounded bg-[#e8f2ec] px-2 py-1 text-sm font-bold text-[#00703c]">
                    {item.change}
                  </p>
                </div>
                <h3 className="mt-4 text-2xl font-bold">{item.topic}</h3>
                <p className="mt-2 text-sm font-bold text-[#00703c]">{item.category}</p>
                <p className="mt-4 leading-7 text-[#3f4842]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="explainer"
        className="mx-auto grid max-w-7xl gap-8 px-6 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-10"
      >
        <div>
          <p className="text-base font-bold text-[#00703c]">Explainer format</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            Built like a service, not a feed
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#3f4842]">
            The foundation is inspired by the UK design guide: plain language,
            obvious actions, strong accessibility, and no hiding the important
            bits behind clever UI.
          </p>
        </div>
        <div className="grid gap-4">
          {explainerSections.map((section) => (
            <article key={section.title} className="rounded-lg border border-[#d8ded6] bg-white p-6">
              <h3 className="text-xl font-bold">{section.title}</h3>
              <p className="mt-3 leading-7 text-[#3f4842]">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="pro" className="bg-[#151917] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.8fr] lg:px-10">
          <div>
            <p className="font-bold text-[#ffdd00]">Monetization later</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Keep basic understanding free. Charge for depth.
            </h2>
          </div>
          <p className="text-lg leading-8 text-[#dce5dc]">
            Pro can become saved country packs, offline explainers, audio
            briefings, school packs, diaspora guides, and advanced trend
            alerts. The free product should still answer the basic question
            clearly.
          </p>
        </div>
      </section>
    </main>
  );
}
