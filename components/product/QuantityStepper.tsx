"use client";

import { Minus, Plus } from "lucide-react";
import { cn, formatKg } from "@/lib/utils";
import { KG_STEP, KG_MIN, KG_MAX } from "@/lib/constants";
import type { Unit } from "@/lib/types";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  unit: Unit;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  unit,
  className,
}: QuantityStepperProps) {
  const isKg = unit === "kg";
  const step = isKg ? KG_STEP : 1;
  const min = isKg ? KG_MIN : 1;

  const dec = () => onChange(Math.max(min, Number((value - step).toFixed(1))));
  const inc = () =>
    onChange(isKg ? Math.min(KG_MAX, Number((value + step).toFixed(1))) : value + 1);

  const label = isKg ? formatKg(value) : `${value} шт`;
  const atMin = value <= min;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-ink-800",
        className
      )}
    >
      <button
        type="button"
        onClick={dec}
        disabled={atMin}
        aria-label="Зменшити кількість"
        className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-cream transition-all duration-200 ease-smooth active:scale-[0.97] hover:text-claw-400 disabled:opacity-40"
      >
        <Minus className="h-4 w-4" strokeWidth={2.5} />
      </button>
      <span className="w-24 text-center text-sm font-bold text-cream">{label}</span>
      <button
        type="button"
        onClick={inc}
        aria-label="Збільшити кількість"
        className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-cream transition-all duration-200 ease-smooth active:scale-[0.97] hover:text-claw-400"
      >
        <Plus className="h-4 w-4" strokeWidth={2.5} />
      </button>
    </div>
  );
}
