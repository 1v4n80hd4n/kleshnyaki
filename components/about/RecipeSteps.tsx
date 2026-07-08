"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { CRAYFISH_RECIPE } from "@/lib/data/recipes";

export function RecipeSteps() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const step = CRAYFISH_RECIPE[active];

  return (
    <section id="recipes" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <div className="flex items-center gap-3">
          <ChefHat className="h-7 w-7 text-claw" strokeWidth={1.75} />
          <h2 className="text-[2rem] font-bold leading-[1.02] text-cream md:text-[3.25rem]">
            Як зварити раків удома
          </h2>
        </div>
        <p className="mt-4 max-w-xl text-cream-muted">
          Оберіть крок, щоб побачити його ближче. З фірмовими спеціями вийде як у
          нас.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-1 lg:sticky lg:top-24 lg:self-start">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-claw font-display text-sm font-bold text-cream">
                    {step.n}
                  </span>
                  <h3 className="font-display text-xl font-bold text-cream">
                    {step.title}
                  </h3>
                </div>
                {step.minutes && (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-gold bg-ink-900/70 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur">
                    <Clock className="h-3.5 w-3.5 text-claw" />~ {step.minutes} хв
                  </span>
                )}
              </div>
            </div>
          </div>

          <ol className="order-2 space-y-2">
            {CRAYFISH_RECIPE.map((s, i) => {
              const isActive = i === active;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "focus-ring flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 ease-smooth",
                      isActive
                        ? "border-line-gold bg-ink-800"
                        : "border-transparent hover:border-line hover:bg-ink-800/50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold transition-colors",
                        isActive
                          ? "bg-claw text-cream"
                          : "border border-line-strong text-cream-muted"
                      )}
                    >
                      {s.n}
                    </span>
                    <span className="min-w-0">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-lg font-bold text-cream">
                          {s.title}
                        </span>
                        {s.minutes && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-cream-dim">
                            <Clock className="h-3 w-3 text-claw/70" />~ {s.minutes} хв
                          </span>
                        )}
                      </span>
                      <span className="mt-1.5 block leading-relaxed text-cream-muted">
                        {s.text}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
