"use client";

import { MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STORES } from "@/lib/data/stores";

interface StorePickerProps {
  value?: string;
  onChange: (storeId: string) => void;
}

export function StorePicker({ value, onChange }: StorePickerProps) {
  return (
    <div className="space-y-2">
      {STORES.map((store) => {
        const active = value === store.id;
        return (
          <button
            key={store.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(store.id)}
            className={cn(
              "focus-ring flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ease-smooth active:scale-[0.97]",
              active
                ? "border-claw bg-claw/10"
                : "border-line bg-ink-800 hover:border-line-strong"
            )}
          >
            <MapPin
              className={cn("mt-0.5 h-5 w-5 shrink-0", active ? "text-claw" : "text-cream-muted")}
              strokeWidth={2}
            />
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-cream">{store.name}</span>
              <span className="mt-0.5 block text-sm text-cream-muted">
                {store.address}
              </span>
              <span className="mt-0.5 block text-xs text-cream-dim">
                {store.hours}
              </span>
            </span>
            {active && (
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-claw" strokeWidth={2.5} />
            )}
          </button>
        );
      })}
    </div>
  );
}
