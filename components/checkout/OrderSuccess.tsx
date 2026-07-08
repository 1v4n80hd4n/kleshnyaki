"use client";

import { Link } from "next-view-transitions";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Phone } from "lucide-react";
import { formatUAH } from "@/lib/utils";
import { BRAND } from "@/lib/constants";
import { telHref } from "@/lib/maps";

export interface CompletedOrder {
  number: string;
  name: string;
  phone: string;
  fulfillment: "delivery" | "pickup";
  total: number;
}

export function OrderSuccess({ order }: { order: CompletedOrder }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-lg rounded-3xl border border-line bg-ink-800 p-8 text-center md:p-12"
    >
      <motion.div
        initial={reduce ? false : { scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-600/15"
      >
        <CheckCircle2 className="h-11 w-11 text-emerald-400" strokeWidth={1.75} />
      </motion.div>

      <h1 className="mt-6 font-display text-3xl font-extrabold text-cream">
        Замовлення прийнято
      </h1>
      <p className="mt-3 text-cream-muted">
        Дякуємо, {order.name}. Ваше замовлення{" "}
        <span className="font-semibold text-cream">№ {order.number}</span> оформлено.
        Ми зателефонуємо на {order.phone} для підтвердження.
      </p>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-line bg-ink-900/50 px-5 py-4 text-left">
        <div>
          <p className="text-xs text-cream-dim">
            {order.fulfillment === "delivery" ? "Доставка" : "Самовивіз"}
          </p>
          <p className="font-semibold text-cream">До сплати</p>
        </div>
        <p className="font-display text-2xl font-bold text-claw-400">
          {formatUAH(order.total)}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/shop"
          className="focus-ring inline-flex h-14 items-center justify-center rounded-full bg-claw px-8 text-base font-semibold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-claw-400"
        >
          Повернутися до каталогу
        </Link>
        <a
          href={telHref(BRAND.phonesRight[0])}
          className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-cream-muted transition-all duration-200 ease-smooth active:scale-[0.98] hover:text-cream"
        >
          <Phone className="h-4 w-4" />
          Зателефонувати нам
        </a>
      </div>
    </motion.div>
  );
}
