"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { STORES } from "@/lib/data/stores";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { telHref } from "@/lib/maps";

export function StoresPreview() {
  const reduce = useReducedMotion();
  const preview = STORES.slice(0, 3);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/home/stores-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center motion-safe:animate-ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/88 to-ink-900/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/80" />

      <div className="shell relative">
        <SectionHeading
          title="Наші магазини у Києві"
          action={{ href: "/stores", label: "Усі магазини" }}
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {preview.map((store, i) => (
            <motion.article
              key={store.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-line bg-ink-800/85 p-6 backdrop-blur-sm transition-colors hover:border-line-gold"
            >
              <h3 className="font-display text-xl font-bold text-cream">
                {store.name}
              </h3>

              <div className="mt-4 space-y-2.5 text-sm">
                <p className="flex items-start gap-2 text-cream-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-claw/70" />
                  {store.address}
                </p>
                <p className="flex items-start gap-2 text-cream-dim">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-claw/70" />
                  {store.hours}
                </p>
                <a
                  href={telHref(store.phones[0])}
                  className="focus-ring inline-flex items-center gap-2 font-semibold text-cream transition-colors hover:text-claw-400"
                >
                  <Phone className="h-4 w-4 text-claw/70" />
                  {store.phones[0]}
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/stores"
            className="focus-ring inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-semibold text-cream transition-colors hover:bg-ink-700"
          >
            Усі магазини
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
