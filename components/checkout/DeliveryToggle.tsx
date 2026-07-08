"use client";

import { Truck, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FulfillmentType } from "@/lib/types";

interface DeliveryToggleProps {
  value: FulfillmentType;
  onChange: (value: FulfillmentType) => void;
}

const OPTIONS: {
  v: FulfillmentType;
  label: string;
  hint: string;
  Icon: typeof Truck;
}[] = [
  { v: "delivery", label: "Доставка", hint: "По Києву, 60-120 хв", Icon: Truck },
  { v: "pickup", label: "Самовивіз", hint: "З нашого магазину", Icon: Store },
];

export function DeliveryToggle({ value, onChange }: DeliveryToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {OPTIONS.map(({ v, label, hint, Icon }) => {
        const active = value === v;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(v)}
            className={cn(
              "focus-ring flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ease-smooth active:scale-[0.97]",
              active
                ? "border-claw bg-claw/10"
                : "border-line bg-ink-800 hover:border-line-strong"
            )}
          >
            <Icon
              className={cn("mt-0.5 h-5 w-5 shrink-0", active ? "text-claw" : "text-cream-muted")}
              strokeWidth={2}
            />
            <span>
              <span className="block font-semibold text-cream">{label}</span>
              <span className="mt-0.5 block text-xs text-cream-dim">{hint}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
