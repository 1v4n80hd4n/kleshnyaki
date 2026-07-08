"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { formatUAH } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";
import { QuantityStepper } from "@/components/product/QuantityStepper";

interface CartLineItemProps {
  item: CartItem;
  onNavigate?: () => void;
  compact?: boolean;
}

export function CartLineItem({ item, onNavigate, compact }: CartLineItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const pushToast = useToastStore((s) => s.push);
  const lineTotal = item.price * item.quantity;

  const handleRemove = () => {
    removeItem(item.key);
    pushToast("Товар видалено з кошика");
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <div className="flex gap-4 py-4">
        <Link
          href={`/shop/${item.slug}`}
          onClick={onNavigate}
          className="focus-ring group relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/shop/${item.slug}`}
                onClick={onNavigate}
                className="focus-ring block truncate font-display font-bold text-cream transition-colors hover:text-claw-400"
              >
                {item.name}
              </Link>
              {item.variantLabel && (
                <p className="mt-0.5 text-xs text-cream-dim">{item.variantLabel}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Видалити товар"
              className="focus-ring shrink-0 rounded-full p-1.5 text-cream-dim transition-colors hover:text-claw"
            >
              <Trash2 className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>

          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <QuantityStepper
              value={item.quantity}
              onChange={(q) => updateQuantity(item.key, q)}
              unit={item.unit}
            />
            <div className="text-right">
              <p className="font-display font-bold text-cream">
                {formatUAH(lineTotal)}
              </p>
              {!compact && item.quantity > 1 && (
                <p className="text-xs text-cream-dim">
                  {formatUAH(item.price)} × {item.quantity}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
