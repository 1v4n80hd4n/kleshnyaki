"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cream-dim"
        strokeWidth={2}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук: раки, креветки, тарань…"
        aria-label="Пошук у каталозі"
        className="focus-ring h-12 w-full rounded-xl border border-line bg-ink-800 pl-12 pr-11 text-cream placeholder:text-cream-muted"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Очистити пошук"
          className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-cream-dim transition-colors hover:text-cream"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}
