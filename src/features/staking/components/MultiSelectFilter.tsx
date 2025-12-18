"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MultiSelectFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const ref = useRef<HTMLDivElement>(null);

  const selectedCoins = searchParams.get("coins")?.split(",") ?? [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleCoin = (coin: string) => {
    const updated = selectedCoins.includes(coin)
      ? selectedCoins.filter((c) => c !== coin)
      : [...selectedCoins, coin];

    const params = new URLSearchParams(searchParams.toString());

    if (updated.length) {
      params.set("coins", updated.join(","));
      params.set("page", "1");
    } else {
      params.delete("coins");
    }

    router.push(`${pathname}?${params.toString()}`);
    setQuery("");
  };

  return (
    <div ref={ref} className="relative w-64">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setOpen(true)}
        placeholder="Select coins"
        className="w-full border px-3 py-2 rounded bg-slate-500 outline-none"
      />

      {selectedCoins.length > 0 && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-yellow-400 px-2 rounded pointer-events-none">
          {selectedCoins.length}
        </div>
      )}

      {query.length > 1 && open && (
        <div className="absolute z-20 mt-1 max-h-60 w-full overflow-auto bg-slate-500 border rounded shadow">
          <label className="flex items-center gap-2 px-3 py-2 hover:bg-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCoins.includes(query)}
              onChange={() => toggleCoin(query)}
            />
            {query}
          </label>
        </div>
      )}
    </div>
  );
};

export default MultiSelectFilter;
