"use client";

import { ChevronDown } from "lucide-react";

export type SortKey = "default" | "price-asc" | "price-desc" | "name";

interface SortSelectProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative shrink-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label="Сортування"
        className="focus-ring h-12 w-full cursor-pointer appearance-none rounded-xl border border-line bg-ink-800 pl-4 pr-10 text-sm font-medium text-cream sm:w-56"
      >
        <option value="default">Спочатку популярні</option>
        <option value="price-asc">Ціна: від дешевших</option>
        <option value="price-desc">Ціна: від дорожчих</option>
        <option value="name">За назвою</option>
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim"
        strokeWidth={2}
      />
    </div>
  );
}
