import Image from "next/image";
import { Link } from "next-view-transitions";
import { ArrowRight, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { telHref } from "@/lib/maps";

export function AboutCta() {
  return (
    <section className="shell pb-24">
      <div className="group relative overflow-hidden rounded-3xl border border-line p-8 text-center md:p-16">
        <Image
          src="/home/cta.jpg"
          alt=""
          fill
          sizes="(max-width: 1400px) 100vw, 1400px"
          className="object-cover object-center transition-transform duration-700 ease-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[radial-gradient(72%_130%_at_50%_50%,rgba(11,7,6,0.86),rgba(11,7,6,0.5))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-ink-900/40" />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-cream md:text-4xl">
            Готові скуштувати справжню свіжість?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-cream-muted">
            Оберіть розмір, вагу й спосіб отримання. Решту зробимо ми.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-full bg-claw px-8 text-base font-semibold text-cream shadow-[0_8px_30px_-8px_rgba(226,73,44,0.7)] transition-all duration-200 ease-smooth hover:bg-claw-400 active:translate-y-[1px] active:scale-[0.98]"
            >
              Обрати раків
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href={telHref(BRAND.phonesRight[0])}
              className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line-strong bg-ink-900/40 px-8 text-base font-semibold text-cream backdrop-blur-sm transition-all duration-200 ease-smooth hover:bg-ink-700 active:scale-[0.98]"
            >
              <Phone className="h-5 w-5" />
              {BRAND.phonesRight[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
