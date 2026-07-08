"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, Heart, ArrowRight } from "lucide-react";
import type { ProductVariant } from "@/lib/types";
import { cn, formatUAH } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { useQuickViewStore } from "@/store/quick-view-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Badge } from "@/components/ui/Badge";
import { VariantSelector } from "./VariantSelector";
import { QuantityStepper } from "./QuantityStepper";
import { AddToCartButton } from "./AddToCartButton";

export function QuickViewModal() {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const product = useQuickViewStore((s) => s.product);
  const isOpen = useQuickViewStore((s) => s.isOpen);
  const close = useQuickViewStore((s) => s.close);

  const toggleWish = useWishlistStore((s) => s.toggle);
  const liked = useWishlistStore((s) =>
    product ? s.ids.includes(product.id) : false
  );

  const imageRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<ProductVariant | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setVariant(product.variants?.[0] ?? null);
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const activePrice = variant ? variant.price : product?.basePrice ?? 0;
  const unitSuffix = product?.unit === "kg" ? "/кг" : "";

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div
          className="fixed inset-0 flex items-end justify-center sm:items-center"
          style={{ zIndex: 50 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Швидкий перегляд: ${product.name}`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-ink-800 sm:rounded-3xl md:flex-row"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрити"
              className="focus-ring absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/60 text-cream backdrop-blur transition-colors hover:bg-ink-900"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div
              ref={imageRef}
              className="group relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:w-1/2"
            >
              <Image
                src={variant?.image ?? product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
              {product.badges && product.badges.length > 0 && (
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {product.badges.map((b) => (
                    <Badge key={b} tone="accent">
                      {b}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex w-full flex-col gap-5 overflow-y-auto p-6 md:w-1/2 md:p-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-cream-dim">
                  {product.categoryLabel}
                </p>
                <h2 className="mt-1 font-display text-2xl font-bold text-cream md:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-cream-muted">
                  {product.description}
                </p>
              </div>

              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  value={variant}
                  onChange={setVariant}
                  unit={product.unit}
                  label={
                    product.unit === "cert"
                      ? "Номінал"
                      : product.unit === "kg"
                        ? "Розмір"
                        : "Набір"
                  }
                />
              )}

              <div className="flex items-center justify-between">
                <QuantityStepper value={qty} onChange={setQty} unit={product.unit} />
                <span className="text-sm text-cream-muted">
                  {formatUAH(activePrice)}
                  {unitSuffix}
                </span>
              </div>

              <div className="mt-auto flex flex-col gap-3 pt-2">
                <AddToCartButton
                  product={product}
                  variant={variant}
                  quantity={qty}
                  sourceRef={imageRef}
                  onAdded={close}
                  className="w-full"
                />
                <div className="flex items-center gap-3">
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={close}
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
                  >
                    Детальніше
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWish(product.id)}
                    aria-label={liked ? "Прибрати з обраного" : "Додати в обране"}
                    className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-ink-700"
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5 transition-colors",
                        mounted && liked ? "fill-claw text-claw" : "text-cream"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
