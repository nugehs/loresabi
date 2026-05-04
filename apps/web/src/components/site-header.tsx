import Link from "next/link";

const navItems = [
  { href: "/countries", label: "Countries" },
  { href: "/trends", label: "Trends" },
  { href: "/countries/nigeria/old-nigerian-flag", label: "Explainers" },
  { href: "/editorial", label: "Editorial" },
  { href: "/drafts", label: "Drafts" },
  { href: "/attribution", label: "Attribution" },
  { href: "/ops", label: "Ops" },
  { href: "/saved", label: "Saved" },
  { href: "/search", label: "Search" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-[#d8ded6] bg-[#f7f8f4]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link className="leading-none" href="/" aria-label="LoreSabi home">
          <span className="block text-2xl font-bold tracking-tight">LoreSabi</span>
          <span className="text-sm font-medium text-[#5d665f]">by Bashbop</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 text-xs font-semibold text-[#3f4842] lg:flex xl:text-sm"
        >
          {navItems.map((item) => (
            <Link key={item.href} className="hover:text-[#00703c]" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
