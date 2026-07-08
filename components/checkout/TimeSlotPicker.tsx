"use client";

import { cn } from "@/lib/utils";
import { TIME_SLOTS } from "@/lib/constants";

interface TimeSlotPickerProps {
  value?: string;
  onChange: (slot: string) => void;
}

export function TimeSlotPicker({ value, onChange }: TimeSlotPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_SLOTS.map((slot) => {
        const active = value === slot;
        return (
          <button
            key={slot}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(slot)}
            className={cn(
              "focus-ring rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ease-smooth active:scale-[0.97]",
              active
                ? "border-claw bg-claw text-cream"
                : "border-line bg-ink-800 text-cream-muted hover:border-line-strong hover:text-cream"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
