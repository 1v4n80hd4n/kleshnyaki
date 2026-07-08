import type { Category } from "./types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kleshnyaki.com.ua";

export const NAV_LINKS = [
  { href: "/shop", label: "Каталог" },
  { href: "/stores", label: "Магазини" },
  { href: "/about", label: "Про нас" },
  { href: "/about#recipes", label: "Рецепти" },
] as const;

export const CATEGORY_LABELS: Record<Category, string> = {
  live: "Живі раки",
  boiled: "Варені раки",
  shrimp: "Креветки",
  fish: "Риба",
  caviar: "Ікра",
  other: "Інші товари",
};

export const CATEGORY_ORDER: Category[] = ["live", "boiled", "shrimp", "fish", "other"];

export const MIN_ORDER_TOTAL = 800;
export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_FROM = 4000;
export const KG_STEP = 0.5;
export const KG_MIN = 0.5;
export const KG_MAX = 20;

export const TIME_SLOTS = [
  "Якнайшвидше (60-120 хв)",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
  "20:00 - 22:00",
] as const;

export const BRAND = {
  name: "КЛЕШНЯКИ",
  tagline: "Завжди свіжі раки",
  since: 2011,
  phonesRight: ["(068) 888-00-96"],
  phonesLeft: ["(067) 889-88-95", "(096) 889-88-95", "(068) 347-17-38"],
  socials: {
    telegram: "https://t.me/Kleshnyaki",
    instagram: "https://www.instagram.com/kleshnyaki.in.ukraine/",
    facebook: "https://www.facebook.com/Kleshnyaki.in.Ukraine/",
  },
} as const;

export const Z = {
  header: 40,
  bottomNav: 40,
  drawer: 50,
  modal: 50,
  grain: 60,
} as const;
