"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ShoppingBag, Check } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/types";
import { cn, formatUAH } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useFlyToCartStore } from "@/store/fly-to-cart-store";
import { useToastStore } from "@/store/toast-store";

interface AddToCartButtonProps {
  product: Product;
  variant?: ProductVariant | null;
  quantity: number;
  sourceRef?: React.RefObject<HTMLElement>;
  onAdded?: () => void;
  size?: "md" | "lg";
  className?: string;
}

export function AddToCartButton({
  product,
  variant,
  quantity,
  sourceRef,
  onAdded,
  size = "lg",
  className,
}: AddToCartButtonProps) {
  const reduce = useReducedMotion();
  const addItem = useCartStore((s) => s.addItem);
  const launch = useFlyToCartStore((s) => s.launch);
  const pushToast = useToastStore((s) => s.push);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const price = variant ? variant.price : product.basePrice;

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variantId: variant?.id,
      variantLabel: variant?.label,
      unit: product.unit,
      price,
      quantity,
    });

    if (!reduce) {
      const from = sourceRef?.current?.getBoundingClientRect();
      if (from) launch({ image: product.image, from });
    }

    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1400);
    pushToast("Додано в кошик", "success");

    onAdded?.();
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={cn(
        "focus-ring sheen relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold text-cream transition-all duration-200 ease-smooth active:translate-y-[1px] active:scale-[0.98]",
        added ? "bg-emerald-600" : "bg-claw shadow-glow hover:bg-claw-400 hover:shadow-elevate",
        size === "lg" ? "h-14 px-8 text-base" : "h-11 px-6 text-sm",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {added ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <Check className="h-5 w-5" strokeWidth={2.5} />
            Додано в кошик
          </motion.span>
        ) : (
          <motion.span
            key="add"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
            Додати · {formatUAH(price * quantity)}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
