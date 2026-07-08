import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  wordmarkClassName?: string;
  className?: string;
  priority?: boolean;
}

export function Logo({
  size = 44,
  withWordmark = true,
  wordmarkClassName,
  className,
  priority,
}: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.png"
        alt={withWordmark ? "" : "КЛЕШНЯКИ"}
        width={size}
        height={size}
        priority={priority}
        className="rounded-full"
      />
      {withWordmark && (
        <span
          className={cn(
            "font-display font-extrabold tracking-tight text-cream",
            wordmarkClassName
          )}
        >
          КЛЕШ<span className="text-claw">НЯКИ</span>
        </span>
      )}
    </span>
  );
}
