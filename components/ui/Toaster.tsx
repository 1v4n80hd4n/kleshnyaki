"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShoppingBag, Trash2 } from "lucide-react";
import { useToastStore, type Toast } from "@/store/toast-store";

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4 md:bottom-8">
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const reduce = useReducedMotion();
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const id = setTimeout(() => remove(toast.id), 2600);
    return () => clearTimeout(id);
  }, [toast.id, remove]);

  const Icon =
    toast.tone === "success"
      ? Check
      : toast.message.toLowerCase().includes("видал")
        ? Trash2
        : ShoppingBag;

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-line-gold bg-ink-800/95 px-5 py-3 text-sm font-medium text-cream shadow-elevate backdrop-blur"
    >
      <Icon className="h-4 w-4 text-claw" strokeWidth={2.4} />
      {toast.message}
    </motion.div>
  );
}
