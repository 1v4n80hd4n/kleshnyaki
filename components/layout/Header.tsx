"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-mounted";
import { NAV_LINKS, Z } from "@/lib/constants";
import { useCartStore, useCartCount } from "@/store/cart-store";
import { useWishlistCount } from "@/store/wishlist-store";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const openCart = useCartStore((s) => s.open);
  const cartCount = useCartCount();
  const wishCount = useWishlistCount();
  const mounted = useMounted();
  const pathname = usePathname();
  const [recipesInView, setRecipesInView] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (pathname !== "/about") {
      setRecipesInView(false);
      return;
    }
    let obs: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById("recipes");
      if (!el) return;
      obs = new IntersectionObserver(
        ([entry]) => setRecipesInView(entry.isIntersecting),
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
    });
    return () => {
      cancelAnimationFrame(raf);
      obs?.disconnect();
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href.includes("#recipes")) return pathname === "/about" && recipesInView;
    const base = href.split("#")[0].split("?")[0];
    if (base === "/about") return pathname === "/about" && !recipesInView;
    return pathname === base;
  };

  return (
    <>
      <header
        style={{ zIndex: Z.header }}
        className={cn(
          "sticky top-0 w-full border-b transition-colors duration-300 ease-smooth glass",
          scrolled ? "border-line-gold" : "border-transparent"
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 md:h-[72px]">
          <button
            onClick={() => setMenuOpen(true)}
            className="focus-ring -ml-2 rounded-full p-2 text-cream transition-transform active:scale-90 md:hidden"
            aria-label="Відкрити меню"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>

          <Link
            href="/"
            className="focus-ring group relative flex items-center rounded-full transition-transform duration-200 ease-smooth active:scale-95"
            aria-label="КЛЕШНЯКИ - на головну"
          >
            <Logo size={40} wordmarkClassName="text-xl md:text-2xl" priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "focus-ring rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ease-smooth active:scale-95",
                    active
                      ? "bg-ink-700 text-cream"
                      : "text-cream-muted hover:bg-ink-800 hover:text-cream"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-0.5">
            <Link
              href="/shop"
              aria-label="Пошук у каталозі"
              className="focus-ring rounded-full p-2.5 text-cream-muted transition-all duration-200 ease-smooth hover:bg-ink-800 hover:text-cream active:scale-90"
            >
              <Search className="h-5 w-5" strokeWidth={2} />
            </Link>

            <Link
              href="/shop?wishlist=1"
              aria-label="Обране"
              className="focus-ring relative rounded-full p-2.5 text-cream-muted transition-all duration-200 ease-smooth hover:bg-ink-800 hover:text-cream active:scale-90"
            >
              <Heart className="h-5 w-5" strokeWidth={2} />
              {mounted && wishCount > 0 && <CountBadge value={wishCount} />}
            </Link>

            <button
              onClick={openCart}
              aria-label="Кошик"
              data-cart-target
              className="focus-ring relative rounded-full p-2.5 text-cream transition-all duration-200 ease-smooth hover:bg-ink-800 hover:text-claw-400 active:scale-90"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={2} />
              {mounted && cartCount > 0 && <CountBadge value={cartCount} accent />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function CountBadge({ value, accent }: { value: number; accent?: boolean }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className={cn(
        "absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-bold",
        accent ? "bg-claw text-cream" : "bg-cream text-ink-900"
      )}
    >
      {value}
    </motion.span>
  );
}
