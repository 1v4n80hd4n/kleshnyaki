import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUAH(value: number): string {
  return (
    new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(
      Math.round(value)
    ) + " грн"
  );
}

export function formatKg(value: number): string {
  const n = Number.isInteger(value) ? value : value.toFixed(1);
  return `${n} кг`;
}
