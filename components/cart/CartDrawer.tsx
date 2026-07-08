"use client";

import { Link } from "next-view-transitions";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";
import { formatUAH } from "@/lib/utils";
import { MIN_ORDER_TOTAL, Z } from "@/lib/constants";
import { useCartStore, useCartSubtotal } from "@/store/cart-store";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const subtotal = useCartSubtotal();

  const belowMin = subtotal < MIN_ORDER_TOTAL;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            style={{ zIndex: Z.drawer }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            style={{ zIndex: Z.drawer + 1 }}
            className="fixed inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-900"
            role="dialog"
            aria-modal="true"
            aria-label="Кошик"
          >
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold text-cream">
                <ShoppingBag className="h-5 w-5 text-claw" strokeWidth={2} />
                Кошик
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label="Закрити кошик"
                className="focus-ring rounded-full p-2 text-cream-muted transition-all duration-200 ease-smooth active:scale-[0.98] hover:text-cream"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <ShoppingBag
                  className="h-14 w-14 text-cream-dim"
                  strokeWidth={1.25}
                />
                <p className="mt-4 font-display text-lg font-bold text-cream">
                  Кошик порожній
                </p>
                <p className="mt-1.5 text-sm text-cream-muted">
                  Найсвіжіші раки чекають у каталозі.
                </p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="focus-ring mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-claw px-7 text-sm font-semibold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-claw-400"
                >
                  До каталогу
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 divide-y divide-line overflow-y-auto px-5">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartLineItem key={item.key} item={item} onNavigate={close} compact />
                    ))}
                  </AnimatePresence>
                </div>

                <footer className="border-t border-line bg-ink-800/50 px-5 py-5">
                  <CartSummary subtotal={subtotal} />
                  <div className="mt-5 space-y-2">
                    <Link
                      href="/checkout"
                      onClick={close}
                      aria-disabled={belowMin}
                      tabIndex={belowMin ? -1 : undefined}
                      className={`focus-ring flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-semibold transition-all duration-200 ease-smooth active:scale-[0.98] ${
                        belowMin
                          ? "pointer-events-none bg-ink-700 text-cream-dim"
                          : "bg-claw text-cream hover:bg-claw-400"
                      }`}
                    >
                      Оформити · {formatUAH(subtotal)}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                      href="/cart"
                      onClick={close}
                      className="focus-ring flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-cream-muted transition-all duration-200 ease-smooth active:scale-[0.98] hover:text-cream"
                    >
                      Переглянути кошик повністю
                    </Link>
                  </div>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
