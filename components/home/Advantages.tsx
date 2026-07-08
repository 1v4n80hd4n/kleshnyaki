"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Waves, Flame, Truck, Store, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { STORES } from "@/lib/data/stores";
import { CountUp } from "@/components/ui/CountUp";

export function Advantages() {
  const reduce = useReducedMotion();
  const yearsOnMarket = new Date().getFullYear() - BRAND.since;

  const reveal = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="shell py-20 md:py-28">
      <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] text-cream md:text-5xl">
        Чому нас обирають знову
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
        <motion.article
          {...reveal(0)}
          className="group relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-2xl border border-line md:col-span-3 md:row-span-2 md:min-h-[340px]"
        >
          <Image
            src="/home/freshness.jpg"
            alt="Живі раки на льоду"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/60 to-ink-900/10" />
          <Waves
            className="absolute left-7 top-7 h-8 w-8 text-claw drop-shadow"
            strokeWidth={1.75}
          />
          <div className="relative p-7">
            <h3 className="font-display text-2xl font-bold text-cream">
              Максимальна свіжість
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-cream-muted">
              Регулярні поставки живих раків щодня. Ви отримуєте активних, чистих
              і м'ясних раків незалежно від сезону.
            </p>
          </div>
        </motion.article>

        <BentoTile
          {...reveal(1)}
          Icon={Flame}
          title="Авторська варка"
          text="Фірмовий рецепт з овочевим букетом. Готуємо під замовлення."
          className="md:col-span-3"
        />

        <BentoTile
          {...reveal(2)}
          Icon={Truck}
          title="Доставка 60-120 хв"
          text="Привозимо гарячими по всьому Києву."
          className="md:col-span-3"
        />

        <motion.article
          {...reveal(3)}
          className="flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-ink-800 p-6 md:col-span-3"
        >
          <Store className="h-8 w-8 shrink-0 text-claw" strokeWidth={1.75} />
          <div>
            <p className="font-display text-3xl font-extrabold text-cream">
              <CountUp to={STORES.length} /> магазинів
            </p>
            <p className="mt-1 text-sm text-cream-muted">
              Зручні точки на обох берегах Києва.
            </p>
          </div>
        </motion.article>

        <motion.article
          {...reveal(4)}
          className="flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-ink-800 p-6 md:col-span-3"
        >
          <Award className="h-8 w-8 shrink-0 text-claw" strokeWidth={1.75} />
          <div>
            <p className="font-display text-3xl font-extrabold text-cream">
              <CountUp to={yearsOnMarket} suffix="+" /> років
            </p>
            <p className="mt-1 text-sm text-cream-muted">
              На ринку з {BRAND.since}. Тисячі задоволених замовлень.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

function BentoTile({
  Icon,
  title,
  text,
  className,
  ...motionProps
}: {
  Icon: typeof Flame;
  title: string;
  text: string;
  className?: string;
} & React.ComponentProps<typeof motion.article>) {
  return (
    <motion.article
      {...motionProps}
      className={cn(
        "flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-ink-800 p-6",
        className
      )}
    >
      <Icon className="h-7 w-7 text-claw" strokeWidth={1.75} />
      <h3 className="font-display text-xl font-bold text-cream">{title}</h3>
      <p className="text-sm leading-relaxed text-cream-muted">{text}</p>
    </motion.article>
  );
}
