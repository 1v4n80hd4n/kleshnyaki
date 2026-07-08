"use client";

import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { MIN_ORDER_TOTAL } from "@/lib/constants";
import { useCartStore, useCartSubtotal } from "@/store/cart-store";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { CrossSell } from "./CrossSell";

export function CartFullView() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartSubtotal();
  const belowMin = subtotal < MIN_ORDER_TOTAL;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-line py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-cream-dim" strokeWidth={1.25} />
        <h2 className="mt-5 font-display text-2xl font-bold text-cream">
          Ваш кошик порожній
        </h2>
        <p className="mt-2 max-w-sm text-cream-muted">
          Оберіть живих чи варених раків, креветки або рибу, і вони з'являться тут.
        </p>
        <Link
          href="/shop"
          className="focus-ring mt-8 inline-flex h-14 items-center gap-2 rounded-full bg-claw px-8 text-base font-semibold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-claw-400"
        >
          Перейти до каталогу
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-12">
      <div>
        <div className="divide-y divide-line rounded-2xl border border-line bg-ink-800/40 px-5">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div key={item.key} layout>
                <CartLineItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Link
          href="/shop"
          className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cream-muted transition-all duration-200 ease-smooth active:scale-[0.98] hover:text-claw-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Продовжити покупки
        </Link>

        <CrossSell />
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-ink-800 p-6">
          <h2 className="font-display text-xl font-bold text-cream">
            Разом до сплати
          </h2>
          <div className="mt-5">
            <CartSummary subtotal={subtotal} />
          </div>
          <Link
            href="/checkout"
            aria-disabled={belowMin}
            tabIndex={belowMin ? -1 : undefined}
            className={`focus-ring mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold transition-all duration-200 ease-smooth active:scale-[0.98] ${
              belowMin
                ? "pointer-events-none bg-ink-700 text-cream-dim"
                : "bg-claw text-cream hover:bg-claw-400"
            }`}
          >
            Оформити замовлення
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
