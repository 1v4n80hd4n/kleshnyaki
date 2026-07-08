"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface LightboxProps {
  images: string[];
  alt: string;
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export function Lightbox({
  images,
  alt,
  index,
  open,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const reduce = useReducedMotion();
  const [zoomed, setZoomed] = useState(false);
  const multiple = images.length > 1;

  const go = useCallback(
    (dir: 1 | -1) => {
      setZoomed(false);
      onIndexChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    setZoomed(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрити"
            className="focus-ring absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-800/70 text-cream transition-colors hover:bg-ink-700"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          {multiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Попереднє фото"
                className="focus-ring absolute left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-800/70 text-cream transition-colors hover:bg-ink-700"
              >
                <ChevronLeft className="h-6 w-6" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Наступне фото"
                className="focus-ring absolute right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-ink-800/70 text-cream transition-colors hover:bg-ink-700"
              >
                <ChevronRight className="h-6 w-6" strokeWidth={2} />
              </button>
            </>
          )}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setZoomed((z) => !z)}
              className={cn(
                "relative mx-4 h-[78vh] w-[92vw] max-w-4xl cursor-zoom-in overflow-hidden rounded-2xl",
                zoomed && "cursor-zoom-out"
              )}
            >
              <Image
                src={images[index]}
                alt={alt}
                fill
                sizes="92vw"
                className={cn(
                  "object-contain transition-transform duration-500 ease-smooth",
                  zoomed && "scale-[1.8] object-cover"
                )}
              />
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute bottom-5 flex items-center gap-2 text-xs text-cream-dim">
            <ZoomIn className="h-3.5 w-3.5" />
            Натисніть на фото, щоб наблизити
            {multiple && ` · ${index + 1} / ${images.length}`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
