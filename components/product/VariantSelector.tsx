"use client";

import { cn, formatUAH } from "@/lib/utils";
import type { ProductVariant, Unit } from "@/lib/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  value: ProductVariant | null;
  onChange: (variant: ProductVariant) => void;
  unit: Unit;
  label?: string;
}

export function VariantSelector({
  variants,
  value,
  onChange,
  unit,
  label = "Розмір",
}: VariantSelectorProps) {
  const priceSuffix = unit === "kg" ? "/кг" : "";
  const showPrice = unit !== "cert";

  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-cream">{label}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {variants.map((v) => {
          const active = v.id === value?.id;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(v)}
              className={cn(
                "focus-ring flex flex-col items-start rounded-xl border p-3 text-left transition-all duration-200 ease-smooth active:scale-[0.97]",
                active
                  ? "border-claw bg-claw/10"
                  : "border-line bg-ink-800 hover:border-line-strong"
              )}
            >
              <span className="text-sm font-semibold text-cream">{v.label}</span>
              {v.perKg && (
                <span className="mt-0.5 text-xs text-cream-dim">{v.perKg}</span>
              )}
              {showPrice && (
                <span className="mt-2 font-display text-sm font-bold text-claw-400">
                  {formatUAH(v.price)}
                  {priceSuffix}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
