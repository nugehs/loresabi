import Link from "next/link";

export function PageShell({ children }: { children: React.ReactNode }) {
  return <main className="min-h-screen bg-[#f7f8f4] text-[#151917]">{children}</main>;
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-base font-bold text-[#00703c]">{children}</p>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-[#d8ded6] bg-white p-6 shadow-sm ${className}`}>{children}</div>;
}

export function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="inline-flex min-h-12 items-center rounded bg-[#00703c] px-5 text-base font-bold text-white outline-offset-4 hover:bg-[#005a30] focus:outline focus:outline-4 focus:outline-[#ffdd00]"
      href={href}
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="font-bold text-[#005ea5] underline underline-offset-4" href={href}>
      {children}
    </Link>
  );
}
