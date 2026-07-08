"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatUAH } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { useWishlistStore } from "@/store/wishlist-store";
import { useQuickViewStore } from "@/store/quick-view-store";

interface ProductCardProps {
  product: Product;
  index?: number;
  enableTransition?: boolean;
}

export function ProductCard({ product, index = 0, enableTransition }: ProductCardProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const toggleWish = useWishlistStore((s) => s.toggle);
  const liked = useWishlistStore((s) => s.ids.includes(product.id));
  const openQuickView = useQuickViewStore((s) => s.open);

  const hasVariants = Boolean(product.variants?.length);
  const unitSuffix = product.unit === "kg" ? "/кг" : "";
  const priceLabel =
    (hasVariants ? "від " : "") + formatUAH(product.basePrice) + unitSuffix;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-800 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-line-gold hover:shadow-elevate"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link
          href={`/shop/${product.slug}`}
          aria-label={product.name}
          className="focus-ring absolute inset-0 block"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 30vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            style={
              enableTransition
                ? { viewTransitionName: `product-${product.slug}` }
                : undefined
            }
          />
        </Link>

        {product.badges && product.badges.length > 0 && (
          <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <Badge key={b} tone="accent">
                {b}
              </Badge>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={liked ? "Прибрати з обраного" : "Додати в обране"}
          onClick={() => toggleWish(product.id)}
          className="focus-ring absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/50 backdrop-blur-sm transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-ink-900/80"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all duration-200 ease-smooth active:scale-[0.98]",
              mounted && liked ? "fill-claw text-claw" : "text-cream"
            )}
            strokeWidth={2}
          />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="focus-ring absolute inset-x-3 bottom-3 flex h-10 items-center justify-center gap-2 rounded-full bg-cream/95 text-sm font-semibold text-ink-900 backdrop-blur transition-all duration-300 ease-smooth hover:bg-cream md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" strokeWidth={2} />
          Швидкий перегляд
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-cream-dim">
          {product.categoryLabel}
        </p>
        <h3 className="mt-1">
          <Link
            href={`/shop/${product.slug}`}
            className="focus-ring font-display text-lg font-bold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] hover:text-claw-400"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-cream-muted">
          {product.shortDescription}
        </p>
        <div className="mt-auto pt-3">
          <span className="font-display text-lg font-bold text-claw-400">
            {priceLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
