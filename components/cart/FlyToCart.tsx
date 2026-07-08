"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useFlyToCartStore, type Flight } from "@/store/fly-to-cart-store";

function getCartTarget(): DOMRect | null {
  if (typeof document === "undefined") return null;
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>("[data-cart-target]")
  );
  const visible = targets.find((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
  return visible ? visible.getBoundingClientRect() : null;
}

export function FlyToCart() {
  const flights = useFlyToCartStore((s) => s.flights);
  const remove = useFlyToCartStore((s) => s.remove);

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: 70 }}>
      <AnimatePresence>
        {flights.map((flight) => (
          <Flyer key={flight.id} flight={flight} onDone={() => remove(flight.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function Flyer({ flight, onDone }: { flight: Flight; onDone: () => void }) {
  const target = getCartTarget();

  const startSize = Math.min(flight.from.width, 120);
  const startX = flight.from.x + flight.from.width / 2 - startSize / 2;
  const startY = flight.from.y + flight.from.height / 2 - startSize / 2;

  const endX = target ? target.x + target.width / 2 - startSize / 2 : startX;
  const endY = target ? target.y + target.height / 2 - startSize / 2 : startY - 200;

  return (
    <motion.img
      src={flight.image}
      alt=""
      aria-hidden="true"
      initial={{
        x: startX,
        y: startY,
        width: startSize,
        height: startSize,
        opacity: 0.95,
        scale: 1,
        borderRadius: 16,
      }}
      animate={{
        x: endX,
        y: endY,
        scale: 0.18,
        opacity: 0.2,
        borderRadius: 999,
      }}
      transition={{ duration: 0.75, ease: [0.5, 0, 0.2, 1] }}
      onAnimationComplete={onDone}
      className="fixed left-0 top-0 object-cover shadow-2xl"
      style={{ width: startSize, height: startSize }}
    />
  );
}
