"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ } from "@/lib/data/faq";

export function Faq() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="gold-rule w-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Питання
            </p>
          </div>
          <h2 className="text-[2rem] font-bold leading-[1.02] text-cream md:text-[3.25rem]">
            Що варто знати
          </h2>
          <p className="mt-5 max-w-sm text-cream-muted">
            Найчастіші питання про доставку, зберігання й нашу варку. Не знайшли
            відповідь? Зателефонуйте нам.
          </p>

          <div className="group relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl border border-line-gold/40 lg:block">
            <Image
              src="/home/faq-section.jpg"
              alt="Свіжозварені раки зі спеціями"
              fill
              sizes="(max-width: 1024px) 0px, 42vw"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
          </div>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg font-bold text-cream">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "h-5 w-5 shrink-0 text-claw transition-transform duration-300 ease-smooth",
                      isOpen && "rotate-45"
                    )}
                    strokeWidth={2}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-6 leading-relaxed text-cream-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
