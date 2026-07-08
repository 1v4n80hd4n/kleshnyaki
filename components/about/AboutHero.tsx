"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BRAND } from "@/lib/constants";

export function AboutHero() {
  const reduce = useReducedMotion();
  const years = new Date().getFullYear() - BRAND.since;

  return (
    <section className="shell pb-4 pt-10 md:pt-14">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-claw-400">
            Про нас
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] text-cream md:text-6xl">
            {years} років про
            <br />
            <span className="text-claw">свіжих раків</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream-muted">
            Ми починали з простої ідеї: свіжий, смачний рак не може коштувати
            дешево, але має бути доступним щодня. Відтоді виросли в мережу
            магазинів по всьому Києву.
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line"
        >
          <Image
            src="/about/hero.jpg"
            alt="Порція свіжозварених раків КЛЕШНЯКИ"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
        </motion.div>
      </div>
    </section>
  );
}
