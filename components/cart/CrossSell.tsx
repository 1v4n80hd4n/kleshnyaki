"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatUAH } from "@/lib/utils";
import { PRODUCTS } from "@/lib/data/products";
import { useCartStore } from "@/store/cart-store";
import { useToastStore } from "@/store/toast-store";

const SUGGESTED_IDS = ["spices", "shrimp-ocean", "gift-certificate"];

export function CrossSell() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const pushToast = useToastStore((s) => s.push);

  const inCart = new Set(items.map((i) => i.productId));
  const suggestions = SUGGESTED_IDS.map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p) && !inCart.has(p!.id))
    .slice(0, 2);

  if (suggestions.length === 0) return null;

  const add = (product: Product) => {
    const variant = product.variants?.[0];
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      variantId: variant?.id,
      variantLabel: variant?.label,
      unit: product.unit,
      price: variant ? variant.price : product.basePrice,
      quantity: 1,
    });
    pushToast("Додано в кошик", "success");
  };

  return (
    <div className="mt-8">
      <h2 className="font-display text-lg font-bold text-cream">
        Додайте до замовлення
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {suggestions.map((p) => (
          <div
            key={p.id}
            className="group flex items-center gap-3 rounded-2xl border border-line bg-ink-800/60 p-3"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-line">
              <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-110" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-cream">{p.name}</p>
              <p className="text-sm text-claw-400">
                {p.variants?.length ? "від " : ""}
                {formatUAH(p.basePrice)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => add(p)}
              aria-label={`Додати ${p.name}`}
              className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-cream transition-all duration-200 ease-smooth active:scale-95 hover:border-line-gold hover:bg-ink-700"
            >
              <Plus className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
