import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0b0706",
        ink: {
          900: "#0b0706",
          800: "#14100e",
          700: "#1b1512",
          600: "#241b16",
        },
        burgundy: {
          DEFAULT: "#4a1416",
          deep: "#3d0f11",
          600: "#5c1a1d",
        },
        claw: {
          DEFAULT: "#e2492c",
          400: "#f4633f",
          600: "#c53a20",
        },
        cream: {
          DEFAULT: "#f4ece0",
          muted: "#b6a99a",
          dim: "#8a7d70",
        },
        gold: {
          DEFAULT: "#c9a24b",
          soft: "#e6c877",
          dim: "#8f7433",
        },
        line: "rgba(244, 236, 224, 0.10)",
        "line-strong": "rgba(244, 236, 224, 0.18)",
        "line-gold": "rgba(201, 162, 75, 0.30)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      maxWidth: {
        shell: "1400px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        elevate: "0 24px 60px -24px rgba(0, 0, 0, 0.75)",
        "elevate-lg": "0 40px 90px -30px rgba(0, 0, 0, 0.8)",
        glow: "0 12px 40px -10px rgba(226, 73, 44, 0.55)",
        "gold-glow": "0 10px 34px -12px rgba(201, 162, 75, 0.35)",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "steam-rise": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "50%": { opacity: "0.6" },
          "100%": { opacity: "0", transform: "translateY(-24px) scale(1.06)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1.04) translate3d(0, 0, 0)" },
          "100%": { transform: "scale(1.14) translate3d(-1.2%, -1.6%, 0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "steam-rise": "steam-rise 4s ease-in-out infinite",
        "ken-burns": "ken-burns 22s ease-in-out infinite alternate",
        marquee: "marquee 60s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
