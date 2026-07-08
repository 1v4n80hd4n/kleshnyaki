"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn, formatUAH } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { Badge } from "@/components/ui/Badge";
import { Tilt } from "@/components/ui/Tilt";
import { useWishlistStore } from "@/store/wishlist-store";

interface HitCardProps {
  product: Product;
  featured?: boolean;
  index?: number;
}

export function HitCard({ product, featured = false, index = 0 }: HitCardProps) {
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const toggle = useWishlistStore((s) => s.toggle);
  const liked = useWishlistStore((s) => s.ids.includes(product.id));

  const hasVariants = Boolean(product.variants?.length);
  const unitSuffix = product.unit === "kg" ? "/кг" : "";
  const priceLabel =
    (hasVariants ? "від " : "") + formatUAH(product.basePrice) + unitSuffix;

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <Tilt className="h-full">
      <Link
        href={`/shop/${product.slug}`}
        className={cn(
          "group relative flex h-full flex-col justify-end overflow-hidden rounded-2xl border border-line transition-all duration-300 ease-smooth focus-ring hover:border-line-gold hover:shadow-elevate",
          featured ? "min-h-[440px] md:min-h-[540px]" : "min-h-[230px]"
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            featured
              ? "(max-width: 768px) 100vw, 58vw"
              : "(max-width: 768px) 100vw, 40vw"
          }
          className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />

        {product.badges && product.badges.length > 0 && (
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle(product.id);
          }}
          className="focus-ring absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink-900/50 text-cream backdrop-blur-sm transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-ink-900/80"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-all duration-200 ease-smooth active:scale-[0.98]",
              mounted && liked ? "fill-claw text-claw" : "text-cream"
            )}
            strokeWidth={2}
          />
        </button>

        <div className="relative z-10 p-5 md:p-6">
          <h3
            className={cn(
              "font-display font-bold text-cream",
              featured ? "text-2xl md:text-3xl" : "text-xl"
            )}
          >
            {product.name}
          </h3>

          {featured && (
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream-muted">
              {product.shortDescription}
            </p>
          )}

          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-claw-400">
              {priceLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] group-hover:text-claw-400">
              Переглянути
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
      </Tilt>
    </motion.div>
  );
}
