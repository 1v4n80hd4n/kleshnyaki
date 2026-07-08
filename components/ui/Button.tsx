"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "sheen bg-claw text-cream hover:bg-claw-400 active:bg-claw-600 shadow-glow hover:shadow-elevate",
  secondary:
    "bg-ink-700 text-cream border border-line-strong hover:border-line-gold hover:bg-ink-600",
  ghost:
    "bg-transparent text-cream hover:bg-ink-700 border border-transparent hover:border-line-gold",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium",
          "transition-all duration-200 ease-smooth focus-ring overflow-hidden",
          "active:translate-y-[1px] active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none",
          "whitespace-nowrap",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
