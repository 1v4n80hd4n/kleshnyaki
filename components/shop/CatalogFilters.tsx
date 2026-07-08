"use client";

import { cn } from "@/lib/utils";
import { CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/constants";
import type { Category } from "@/lib/types";

export type FilterValue = Category | "all";

interface CatalogFiltersProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function CatalogFilters({ value, onChange }: CatalogFiltersProps) {
  const options: { v: FilterValue; label: string }[] = [
    { v: "all", label: "Всі товари" },
    ...CATEGORY_ORDER.map((c) => ({ v: c as FilterValue, label: CATEGORY_LABELS[c] })),
  ];

  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {options.map((o) => {
        const active = value === o.v;
        return (
          <button
            key={o.v}
            type="button"
            onClick={() => onChange(o.v)}
            className={cn(
              "focus-ring shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 ease-smooth active:scale-[0.97]",
              active
                ? "border-claw bg-claw text-cream"
                : "border-line bg-ink-800 text-cream-muted hover:border-line-strong hover:text-cream"
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
