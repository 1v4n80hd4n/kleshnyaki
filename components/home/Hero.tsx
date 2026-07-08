"use client";

import { Link } from "next-view-transitions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/Magnetic";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (reduce) return;
    videoRef.current?.play().catch(() => {});
  }, [reduce]);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <Image
        src="/videos/hero-poster.jpg"
        alt="Варені раки в бульйоні"
        fill
        priority
        sizes="100vw"
        className="object-cover motion-safe:animate-ken-burns"
      />

      {!reduce && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/hero-poster.jpg"
          onCanPlay={() => setVideoReady(true)}
          aria-hidden="true"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-safe:animate-ken-burns",
            videoReady ? "opacity-100" : "opacity-0"
          )}
        >
          <source src="/videos/hero.webm" type="video/webm" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/55 to-ink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-900/92 via-ink-900/45 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_18%_100%,rgba(74,20,22,0.6),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(135%_135%_at_50%_50%,transparent_52%,rgba(11,7,6,0.55))]" />

      <div className="shell relative z-10 w-full">
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="max-w-2xl"
        >
          <motion.p
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cream backdrop-blur-sm"
          >
            Свіжі раки щодня · Київ з 2011
          </motion.p>

          <motion.div variants={item} className="gold-rule mb-6" />

          <motion.h1
            variants={item}
            className="text-5xl font-extrabold leading-[0.98] text-cream sm:text-6xl lg:text-7xl"
          >
            Живі раки та
            <br />
            <span className="text-claw">авторська варка</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-lg leading-relaxed text-cream-muted"
          >
            Варимо за фірмовим рецептом і привозимо гарячими по Києву за 60-120
            хвилин.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Magnetic className="inline-flex" strength={0.35}>
              <Link
                href="/shop"
                className="focus-ring sheen inline-flex h-14 items-center gap-2 rounded-full bg-claw px-8 text-base font-semibold text-cream shadow-glow transition-all duration-200 ease-smooth hover:bg-claw-400 hover:shadow-elevate active:translate-y-[1px] active:scale-[0.98]"
              >
                Обрати раків
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Magnetic>
            <Link
              href="/stores"
              className="focus-ring inline-flex h-14 items-center gap-2 rounded-full border border-line-strong bg-ink-900/40 px-8 text-base font-semibold text-cream backdrop-blur-sm transition-all duration-200 ease-smooth hover:border-line-gold hover:bg-ink-700 active:translate-y-[1px] active:scale-[0.98]"
            >
              <MapPin className="h-5 w-5" />
              Де купити
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
