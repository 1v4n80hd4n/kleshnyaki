"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProductBySlug } from "@/lib/data/products";
import { formatUAH } from "@/lib/utils";
import { Tilt } from "@/components/ui/Tilt";

export function CalibersSection() {
  const reduce = useReducedMotion();
  const live = getProductBySlug("zhyvi-raky");
  if (!live?.variants) return null;

  return (
    <section className="shell py-20 md:py-28">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="gold-rule w-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Калібри
            </p>
          </div>
          <h2 className="text-[2rem] font-bold leading-[1.02] text-cream md:text-[3.25rem]">
            Оберіть свій розмір
          </h2>
        </div>
        <Link
          href="/shop/zhyvi-raky"
          className="focus-ring group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cream-muted transition-all duration-200 ease-smooth hover:border-line-gold hover:text-cream active:scale-95"
        >
          Усі живі раки
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {live.variants.map((v, i) => (
          <motion.div
            key={v.id}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tilt>
              <Link
                href="/shop/zhyvi-raky"
                className="focus-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-800 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-line-gold hover:shadow-elevate"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {v.image && (
                    <Image
                      src={v.image}
                      alt={`Раки, калібр ${v.label}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-cream">
                    {v.label}
                  </h3>
                  {v.perKg && (
                    <p className="mt-1 text-xs text-cream-dim">{v.perKg}</p>
                  )}
                  <p className="mt-3 font-display text-lg font-bold text-claw-400">
                    {formatUAH(v.price)}
                    <span className="text-sm text-cream-muted">/кг</span>
                  </p>
                </div>
              </Link>
            </Tilt>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
