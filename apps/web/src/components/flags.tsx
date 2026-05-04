export function NigeriaFlag({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="Nigeria flag"
      className={`flex h-16 w-28 overflow-hidden rounded border border-[#b9c3ba] bg-white ${className}`}
    >
      <div className="w-1/3 bg-[#008753]" />
      <div className="w-1/3 bg-white" />
      <div className="w-1/3 bg-[#008753]" />
    </div>
  );
}

export function GhanaFlag({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="Ghana flag"
      className={`relative h-16 w-28 overflow-hidden rounded border border-[#b9c3ba] ${className}`}
    >
      <div className="h-1/3 bg-[#ce3b36]" />
      <div className="grid h-1/3 place-items-center bg-[#f2c94c] text-lg font-bold text-[#151917]">
        ★
      </div>
      <div className="h-1/3 bg-[#138a55]" />
    </div>
  );
}

export function ColonialNigeriaFlag({ className = "" }: { className?: string }) {
  return (
    <div
      aria-label="Simplified British colonial Nigeria flag"
      className={`relative h-16 w-28 overflow-hidden rounded border border-[#b9c3ba] bg-[#214f8f] ${className}`}
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
