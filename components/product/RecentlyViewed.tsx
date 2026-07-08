"use client";

import type { Product } from "@/lib/types";
import { PRODUCTS } from "@/lib/data/products";
import { useMounted } from "@/lib/use-mounted";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ excludeId }: { excludeId: string }) {
  const mounted = useMounted();
  const ids = useRecentlyViewedStore((s) => s.ids);

  if (!mounted) return null;

  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <section className="mt-20 md:mt-28">
      <SectionHeading title="Ви переглядали" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
