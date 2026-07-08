"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PROCESS } from "@/lib/data/recipes";

export function ProcessSection() {
  const reduce = useReducedMotion();

  return (
    <section className="shell py-20 md:py-28">
      <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] text-cream md:text-5xl">
        Від поставки до вашого столу
      </h2>

      <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-display text-5xl font-extrabold text-burgundy-600">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-display text-xl font-bold text-cream">
              {step.title}
            </h3>
            <p className="mt-2 leading-relaxed text-cream-muted">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
