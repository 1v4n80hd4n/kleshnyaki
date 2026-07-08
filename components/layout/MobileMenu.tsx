"use client";

import { Link } from "next-view-transitions";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, BRAND, Z } from "@/lib/constants";
import { telHref } from "@/lib/maps";
import { Logo } from "@/components/ui/Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ zIndex: Z.drawer }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            style={{ zIndex: Z.drawer + 1 }}
            className="fixed inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-ink-800 p-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo size={40} wordmarkClassName="text-xl" />
              <button
                onClick={onClose}
                aria-label="Закрити меню"
                className="focus-ring rounded-full p-2 text-cream-muted"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="focus-ring rounded-xl px-4 py-3 font-display text-2xl font-bold text-cream transition-all duration-200 ease-smooth active:scale-95 hover:text-claw-400"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto border-t border-line pt-6">
              <p className="text-sm text-cream-dim">Замовлення по телефону</p>
              <a
                href={telHref(BRAND.phonesRight[0])}
                className="mt-1 block font-display text-xl font-bold text-cream"
              >
                {BRAND.phonesRight[0]}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
