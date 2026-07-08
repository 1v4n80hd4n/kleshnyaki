"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  mainRef?: React.RefObject<HTMLButtonElement>;
  activeSrc?: string;
  transitionName?: string;
}

export function ProductGallery({
  images,
  alt,
  mainRef,
  activeSrc,
  transitionName,
}: ProductGalleryProps) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasThumbs = images.length > 1;

  useEffect(() => {
    if (!activeSrc) return;
    const i = images.indexOf(activeSrc);
    if (i >= 0) setActive(i);
  }, [activeSrc, images]);

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        ref={mainRef}
        onClick={() => setLightboxOpen(true)}
        aria-label="Відкрити фото на весь екран"
        className="focus-ring group relative aspect-square cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-ink-800"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={images[active]}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              style={
                transitionName && active === 0
                  ? { viewTransitionName: transitionName }
                  : undefined
              }
            />
          </motion.div>
        </AnimatePresence>

        <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line-strong bg-ink-900/50 text-cream backdrop-blur-sm transition-all duration-300 ease-smooth group-hover:border-line-gold group-hover:bg-ink-900/80">
          <Expand className="h-4 w-4" strokeWidth={2} />
        </span>
      </button>

      {hasThumbs && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "focus-ring relative aspect-square overflow-hidden rounded-xl border transition-colors",
                i === active
                  ? "border-claw"
                  : "border-line opacity-70 hover:opacity-100"
              )}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <Lightbox
        images={images}
        alt={alt}
        index={active}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setActive}
      />
    </div>
  );
}
