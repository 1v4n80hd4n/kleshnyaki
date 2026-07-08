"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Heart, Snowflake, Truck, Flame } from "lucide-react";
import type { Product, ProductVariant } from "@/lib/types";
import { cn, formatUAH } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { Badge } from "@/components/ui/Badge";
import { ProductGallery } from "./ProductGallery";
import { VariantSelector } from "./VariantSelector";
import { QuantityStepper } from "./QuantityStepper";
import { AddToCartButton } from "./AddToCartButton";

const TRUST = [
  { Icon: Snowflake, text: "Свіжі поставки щодня, живі та активні" },
  { Icon: Flame, text: "Авторська варка за фірмовим рецептом" },
  { Icon: Truck, text: "Доставка по Києву за 60-120 хвилин" },
];

const KG_PRESETS = [0.5, 1, 2, 5];

export function ProductDetail({ product }: { product: Product }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const toggleWish = useWishlistStore((s) => s.toggle);
  const liked = useWishlistStore((s) => s.ids.includes(product.id));
  const recordView = useRecentlyViewedStore((s) => s.add);

  const galleryRef = useRef<HTMLButtonElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const actionsInView = useInView(actionsRef, { amount: 0.2 });
  const [variant, setVariant] = useState<ProductVariant | null>(
    product.variants?.[0] ?? null
  );
  const [qty, setQty] = useState(1);

  useEffect(() => {
    recordView(product.id);
  }, [product.id, recordView]);

  const images = product.gallery?.length ? product.gallery : [product.image];
  const activePrice = variant ? variant.price : product.basePrice;
  const unitSuffix = product.unit === "kg" ? "/кг" : "";
  const showStickyBar = mounted && !actionsInView;

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery
        images={images}
        alt={product.name}
        mainRef={galleryRef}
        activeSrc={variant?.image}
        transitionName={`product-${product.slug}`}
      />

      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-medium uppercase tracking-wide text-cream-dim">
          {product.categoryLabel}
        </p>

        <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-cream md:text-4xl">
          {product.name}
        </h1>

        {product.badges && product.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <Badge key={b} tone="accent">
                {b}
              </Badge>
            ))}
          </div>
        )}

        <p className="mt-5 leading-relaxed text-cream-muted">{product.description}</p>

        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-3xl font-bold text-claw-400">
            {formatUAH(activePrice)}
          </span>
          <span className="text-cream-muted">{unitSuffix}</span>
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="mt-6">
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
          </div>
        )}

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold text-cream">
            {product.unit === "kg" ? "Вага" : "Кількість"}
          </p>
          <QuantityStepper value={qty} onChange={setQty} unit={product.unit} />
          {product.unit === "kg" && (
            <div className="mt-3 flex flex-wrap gap-2">
              {KG_PRESETS.map((kg) => (
                <button
                  key={kg}
                  type="button"
                  onClick={() => setQty(kg)}
                  aria-pressed={qty === kg}
                  className={cn(
                    "focus-ring rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ease-smooth active:scale-95",
                    qty === kg
                      ? "border-claw bg-claw/10 text-cream"
                      : "border-line bg-ink-800 text-cream-muted hover:border-line-gold hover:text-cream"
                  )}
                >
                  {kg} кг
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={actionsRef} className="mt-7 flex items-center gap-3">
          <AddToCartButton
            product={product}
            variant={variant}
            quantity={qty}
            sourceRef={galleryRef}
            className="flex-1"
          />
          <button
            type="button"
            onClick={() => toggleWish(product.id)}
            aria-label={liked ? "Прибрати з обраного" : "Додати в обране"}
            className="focus-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-strong transition-all duration-200 ease-smooth active:scale-95 hover:bg-ink-700"
          >
            <Heart
              className={cn(
                "h-6 w-6 transition-all duration-200 ease-smooth active:scale-95",
                mounted && liked ? "fill-claw text-claw" : "text-cream"
              )}
            />
          </button>
        </div>

        <ul className="mt-8 divide-y divide-line rounded-2xl border border-line bg-ink-800/50">
          {TRUST.map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-3 px-4 py-3.5">
              <Icon className="h-5 w-5 shrink-0 text-claw" strokeWidth={2} />
              <span className="text-sm text-cream-muted">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 z-40 border-t border-line glass px-4 py-3 md:hidden"
            style={{ bottom: "calc(env(safe-area-inset-bottom) + 3.5rem)" }}
          >
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="truncate text-xs text-cream-dim">
                  {product.name}
                  {variant ? ` · ${variant.label}` : ""}
                </p>
                <p className="font-display text-lg font-bold text-claw-400">
                  {formatUAH(activePrice * qty)}
                  {qty === 1 ? unitSuffix : ""}
                </p>
              </div>
              <AddToCartButton
                product={product}
                variant={variant}
                quantity={qty}
                size="md"
                className="ml-auto shrink-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
