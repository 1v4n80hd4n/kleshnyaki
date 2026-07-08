"use client";

import Image from "next/image";
import { formatUAH, formatKg } from "@/lib/utils";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_FROM,
} from "@/lib/constants";
import type { CartItem, FulfillmentType } from "@/lib/types";

export function computeTotals(subtotal: number, fulfillment: FulfillmentType) {
  const freeByThreshold = subtotal >= FREE_DELIVERY_FROM;
  const deliveryFee =
    fulfillment === "pickup" || freeByThreshold ? 0 : DELIVERY_FEE;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  fulfillment: FulfillmentType;
}

export function OrderSummary({ items, subtotal, fulfillment }: OrderSummaryProps) {
  const { deliveryFee, total } = computeTotals(subtotal, fulfillment);

  return (
    <div className="rounded-2xl border border-line bg-ink-800 p-6">
      <h2 className="font-display text-xl font-bold text-cream">Замовлення</h2>

      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.key} className="flex gap-3">
            <div className="group relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-line">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="56px"
                className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream">
                {item.name}
              </p>
              <p className="text-xs text-cream-dim">
                {item.variantLabel ? `${item.variantLabel} · ` : ""}
                {item.unit === "kg" ? formatKg(item.quantity) : `${item.quantity} шт`}
              </p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-cream">
              {formatUAH(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
        <div className="flex justify-between text-cream-muted">
          <span>Сума</span>
          <span className="font-medium text-cream">{formatUAH(subtotal)}</span>
        </div>
        <div className="flex justify-between text-cream-muted">
          <span>Доставка</span>
          <span className="font-medium text-cream">
            {deliveryFee === 0 ? "Безкоштовно" : formatUAH(deliveryFee)}
          </span>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-3">
          <span className="font-semibold text-cream">До сплати</span>
          <span className="font-display text-2xl font-bold text-claw-400">
            {formatUAH(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
