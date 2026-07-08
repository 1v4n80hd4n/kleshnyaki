"use client";

import { motion } from "framer-motion";
import { Truck, Check } from "lucide-react";
import { formatUAH } from "@/lib/utils";
import {
  DELIVERY_FEE,
  FREE_DELIVERY_FROM,
  MIN_ORDER_TOTAL,
} from "@/lib/constants";

interface CartSummaryProps {
  subtotal: number;
  showShippingMeter?: boolean;
}

export function CartSummary({ subtotal, showShippingMeter = true }: CartSummaryProps) {
  const freeDelivery = subtotal >= FREE_DELIVERY_FROM;
  const deliveryFee = freeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;
  const belowMin = subtotal < MIN_ORDER_TOTAL;

  const remaining = Math.max(0, FREE_DELIVERY_FROM - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_FROM) * 100);

  return (
    <div className="space-y-4">
      {showShippingMeter && (
        <div className="rounded-xl border border-line bg-ink-800 p-4">
          <div className="flex items-center gap-2 text-sm">
            {freeDelivery ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />
                <span className="font-medium text-cream">
                  Безкоштовна доставка активована
                </span>
              </>
            ) : (
              <>
                <Truck className="h-4 w-4 text-claw" strokeWidth={2} />
                <span className="text-cream-muted">
                  Ще {formatUAH(remaining)} до безкоштовної доставки
                </span>
              </>
            )}
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-600">
            <motion.div
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-claw"
            />
          </div>
        </div>
      )}

      <div className="space-y-2.5 text-sm">
        <div className="flex justify-between text-cream-muted">
          <span>Сума замовлення</span>
          <span className="font-medium text-cream">{formatUAH(subtotal)}</span>
        </div>
        <div className="flex justify-between text-cream-muted">
          <span>Доставка</span>
          <span className="font-medium text-cream">
            {freeDelivery ? "Безкоштовно" : formatUAH(deliveryFee)}
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between border-t border-line pt-3">
          <span className="font-semibold text-cream">До сплати</span>
          <span className="font-display text-2xl font-bold text-claw-400">
            {formatUAH(total)}
          </span>
        </div>
      </div>

      {belowMin && (
        <p className="rounded-xl border border-claw/30 bg-claw/10 px-4 py-3 text-sm text-claw-400">
          Мінімальна сума замовлення {formatUAH(MIN_ORDER_TOTAL)}. Додайте товарів
          ще на {formatUAH(MIN_ORDER_TOTAL - subtotal)}.
        </p>
      )}
    </div>
  );
}
