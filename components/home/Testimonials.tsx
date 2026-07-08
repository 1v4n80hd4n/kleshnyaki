"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { TESTIMONIALS, type Testimonial } from "@/lib/data/testimonials";

const AVATAR_GRADIENTS = [
  "from-claw to-burgundy-600",
  "from-burgundy-600 to-burgundy-deep",
  "from-claw-400 to-claw-600",
  "from-burgundy to-ink-600",
  "from-claw to-burgundy-deep",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function gradientFor(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

function Stars({ rating, center }: { rating: number; center?: boolean }) {
  return (
    <div
      className={cn("flex gap-0.5", center && "justify-center")}
      aria-label={`Оцінка ${rating} з 5`}
    >
      {Array.from({ length: rating }).map((_, i) => (
        <Star
          key={i}
          className={cn("fill-claw text-claw", center ? "h-5 w-5" : "h-4 w-4")}
        />
      ))}
    </div>
  );
}

function Avatar({ t, big }: { t: Testimonial; big?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display font-bold text-cream ring-1 ring-line-gold",
        big ? "h-12 w-12 text-base" : "h-11 w-11 text-sm",
        gradientFor(t.id)
      )}
    >
      {initials(t.name)}
    </span>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-line bg-ink-800 p-6 sm:w-[340px]">
      <Stars rating={t.rating} />
      <blockquote className="mt-4 flex-1 leading-relaxed text-cream">
        {t.text}
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <Avatar t={t} />
        <div className="min-w-0">
          <p className="truncate font-semibold text-cream">{t.name}</p>
          <p className="text-sm text-cream-dim">{t.city}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function ArrowBtn({
  dir,
  onClick,
  className,
}: {
  dir: "left" | "right";
  onClick: () => void;
  className?: string;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Попередні відгуки" : "Наступні відгуки"}
      className={cn(
        "focus-ring absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-ink-900/80 text-cream shadow-elevate backdrop-blur transition-all duration-200 ease-smooth hover:border-line-gold hover:bg-ink-800 active:scale-90",
        className
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
    </button>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  const trackRef = useRef<HTMLDivElement>(null);
  const copyWidth = useRef(0);
  const paused = useRef(false);
  const visible = useRef(true);
  const manualUntil = useRef(0);
  const manual = useRef({ active: false, target: 0 });

  useEffect(() => {
    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      copyWidth.current = el.scrollWidth / 3;
      if (el.scrollLeft < 1) el.scrollLeft = copyWidth.current;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    let last = performance.now();
    const auto = reduce ? 0 : 40;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const cw = copyWidth.current;
      if (cw > 0) {
        if (manual.current.active) {
          const cur = el.scrollLeft;
          const next = cur + (manual.current.target - cur) * Math.min(1, dt * 7);
          el.scrollLeft = next;
          if (Math.abs(manual.current.target - next) < 0.5) {
            el.scrollLeft = manual.current.target;
            manual.current.active = false;
            manualUntil.current = now + 700;
          }
        } else {
          if (auto > 0 && !paused.current && visible.current && now > manualUntil.current) {
            el.scrollLeft += auto * dt;
          }
          if (el.scrollLeft >= 2 * cw) el.scrollLeft -= cw;
          else if (el.scrollLeft < cw) el.scrollLeft += cw;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const amount = first ? first.getBoundingClientRect().width + 16 : 356;
    const cw = copyWidth.current;
    if (cw > 0) {
      if (el.scrollLeft >= 2 * cw) el.scrollLeft -= cw;
      else if (el.scrollLeft < cw) el.scrollLeft += cw;
    }
    if (reduce) {
      el.scrollLeft += dir * amount;
      if (cw > 0) {
        if (el.scrollLeft >= 2 * cw) el.scrollLeft -= cw;
        else if (el.scrollLeft < cw) el.scrollLeft += cw;
      }
      return;
    }
    manual.current = { active: true, target: el.scrollLeft + dir * amount };
  };

  return (
    <section className="py-20 md:py-28">
      <div className="shell">
        <div>
          <h2 className="text-[2rem] font-bold leading-[1.02] text-cream md:text-[3.25rem]">
            Що кажуть гості
          </h2>
          <p className="mt-3 max-w-md text-cream-muted">
            Понад десять років ми ставимо свіжість на перше місце. І це помічають.
          </p>
        </div>
      </div>

      <div className="shell">
        <motion.figure
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-line-gold/40 bg-gradient-to-br from-burgundy-deep/50 to-ink-800 px-6 py-12 text-center md:px-12 md:py-14"
        >
          <Quote
            className="mx-auto h-9 w-9 text-claw"
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <div className="mt-6">
            <Stars rating={featured.rating} center />
          </div>
          <blockquote className="mx-auto mt-6 max-w-2xl font-display text-2xl font-bold leading-snug text-cream md:text-3xl">
            {featured.text}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-3">
            <Avatar t={featured} big />
            <div className="text-left">
              <p className="font-semibold text-cream">{featured.name}</p>
              <p className="text-sm text-cream-dim">{featured.city}</p>
            </div>
          </figcaption>
        </motion.figure>
      </div>

      <div
        className="relative mt-10"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
        onTouchStart={() => {
          manualUntil.current = performance.now() + 2500;
        }}
      >
        <ArrowBtn dir="left" onClick={() => step(-1)} className="left-2 sm:left-4" />
        <ArrowBtn dir="right" onClick={() => step(1)} className="right-2 sm:right-4" />
        <div className="[mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto px-14 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...rest, ...rest, ...rest].map((t, i) => (
              <Card key={`${t.id}-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
