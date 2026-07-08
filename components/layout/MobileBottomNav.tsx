"use client";

import { Link } from "next-view-transitions";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Store, Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { Z } from "@/lib/constants";
import { useCartStore, useCartCount } from "@/store/cart-store";

const ITEMS = [
  { href: "/", label: "Головна", icon: Home },
  { href: "/shop", label: "Каталог", icon: Store },
  { href: "/shop?wishlist=1", label: "Обране", icon: Heart },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const params = useSearchParams();
  const wishlist = params.get("wishlist") === "1";
  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartCount();
  const mounted = useMounted();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/shop") return pathname === "/shop" && !wishlist;
    if (href.startsWith("/shop?wishlist")) return pathname === "/shop" && wishlist;
    return pathname === href.split("?")[0];
  };

  return (
    <nav
      style={{ zIndex: Z.bottomNav }}
      className="fixed inset-x-0 bottom-0 border-t border-line glass pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex items-stretch justify-around">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all duration-200 ease-smooth active:scale-95",
                active ? "text-claw-400" : "text-cream-dim"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              {label}
            </Link>
          );
        })}

        <button
          onClick={openCart}
          data-cart-target
          className="relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium text-cream-dim"
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" strokeWidth={2} />
            {mounted && cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-claw px-1 text-[10px] font-bold text-cream"
              >
                {cartCount}
              </motion.span>
            )}
          </span>
          Кошик
        </button>
      </div>
    </nav>
  );
}
