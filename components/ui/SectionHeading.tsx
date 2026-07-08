import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  action?: { href: string; label: string };
  className?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        {eyebrow && (
          <div className="mb-4 flex items-center gap-3">
            <span className="gold-rule w-8" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {eyebrow}
            </p>
          </div>
        )}
        <h2 className="max-w-2xl text-[2rem] font-bold leading-[1.02] text-cream md:text-[3.25rem]">
          {title}
        </h2>
      </div>
      {action && (
        <Link
          href={action.href}
          className="focus-ring group inline-flex shrink-0 items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-cream-muted transition-all duration-200 ease-smooth hover:border-line-gold hover:text-cream active:scale-95"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
