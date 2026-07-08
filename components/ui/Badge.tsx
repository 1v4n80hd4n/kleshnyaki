import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  tone?: "accent" | "neutral";
  className?: string;
}

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        tone === "accent"
          ? "bg-claw/15 text-claw-400 border border-claw/25"
          : "bg-ink-700/80 text-cream-muted border border-line",
        className
      )}
    >
      {children}
    </span>
  );
}
