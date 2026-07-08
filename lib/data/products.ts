import type { Product } from "@/lib/types";

const CRAYFISH_SIZES = [
  { id: "small", label: "Дрібні", per: "≈ 37 шт/кг", image: "/products/zhyvi-raky-dribni.jpg" },
  { id: "medium", label: "Середні", per: "≈ 25 шт/кг", image: "/products/zhyvi-raky-seredni.jpg" },
  { id: "mid-large", label: "Середньо-великі", per: "≈ 17 шт/кг", image: "/products/zhyvi-raky-seredno-velyki.jpg" },
  { id: "large", label: "Великі", per: "≈ 12 шт/кг", image: "/products/zhyvi-raky-velyki.jpg" },
  { id: "premium", label: "Відбірні", per: "≈ 9 шт/кг", image: "/products/zhyvi-raky-vidbirni.jpg" },
] as const;

const LIVE_PRICES = [1300, 2000, 2500, 3000, 3500];
const BOILED_PRICES = [1450, 2150, 2650, 3150, 3650];

const BOILED_IMAGES = [
  "/products/vareni-raky-dribni.jpg",
  "/products/vareni-raky-seredni.jpg",
  "/products/vareni-raky-seredno-velyki.jpg",
  "/products/vareni-raky-velyki.jpg",
  "/products/vareni-raky-vidbirni.jpg",
];

export const PRODUCTS: Product[] = [
  {
    id: "live-crayfish",
    slug: "zhyvi-raky",
    name: "Живі раки",
    category: "live",
    categoryLabel: "Живі раки",
    shortDescription: "Активні, чисті, з регулярних поставок у наші магазини.",
    description:
      "Живі раки з власних водойм. Регулярні поставки гарантують, що в наявності вони є щодня, незалежно від пори року. Оберіть розмір і вагу, а варку за фірмовим рецептом можна замовити окремо.",
    image: "/products/zhyvi-raky-velyki.jpg",
    gallery: [
      "/products/zhyvi-raky-dribni.jpg",
      "/products/zhyvi-raky-seredni.jpg",
      "/products/zhyvi-raky-seredno-velyki.jpg",
      "/products/zhyvi-raky-velyki.jpg",
      "/products/zhyvi-raky-vidbirni.jpg",
    ],
    basePrice: LIVE_PRICES[0],
    unit: "kg",
    isHit: true,
    badges: ["Свіже щодня"],
    variants: CRAYFISH_SIZES.map((s, i) => ({
      id: s.id,
      label: s.label,
      price: LIVE_PRICES[i],
      perKg: s.per,
      image: s.image,
    })),
  },
  {
    id: "boiled-crayfish",
    slug: "vareni-raky",
    name: "Варені раки",
    category: "boiled",
    categoryLabel: "Варені раки",
    shortDescription: "Авторська варка на замовлення. Доставляємо гарячими.",
    description:
      "Раки, зварені за фірмовим рецептом з насиченим овочевим букетом. Готуємо тільки під замовлення і доставляємо у відрі з бульйоном, гарячими. Оберіть розмір і вагу.",
    image: "/products/vareni-raky-velyki.jpg",
    gallery: [
      "/products/vareni-raky-dribni.jpg",
      "/products/vareni-raky-seredni.jpg",
      "/products/vareni-raky-seredno-velyki.jpg",
      "/products/vareni-raky-velyki.jpg",
      "/products/vareni-raky-vidbirni.jpg",
    ],
    basePrice: BOILED_PRICES[0],
    unit: "kg",
    isHit: true,
    badges: ["Авторська варка", "Доставляємо гарячими"],
    variants: CRAYFISH_SIZES.map((s, i) => ({
      id: s.id,
      label: s.label,
      price: BOILED_PRICES[i],
      perKg: s.per,
      image: BOILED_IMAGES[i],
    })),
  },
  {
    id: "shrimp-ocean",
    slug: "krevetka-okeanichna",
    name: "Креветка океанічна",
    category: "shrimp",
    categoryLabel: "Креветки",
    shortDescription: "Заморожена, в розмірах. Ідеальна до раків і пива.",
    description:
      "Океанічна морожена креветка в різних калібрах. Класична закуска, що добре доповнює раків.",
    image: "/products/krevetka-okeanichna.jpg",
    basePrice: 600,
    unit: "kg",
    isHit: true,
    badges: ["Хіт літа"],
  },
  {
    id: "shrimp-langoustine",
    slug: "langustyn",
    name: "Лангустин",
    category: "shrimp",
    categoryLabel: "Креветки",
    shortDescription: "Заморожений, ніжне м'ясо, делікатесний смак.",
    description: "Морожений лангустин у розмірах. Делікатес для особливих випадків.",
    image: "/products/langustyn.jpg",
    basePrice: 630,
    unit: "kg",
  },
  {
    id: "shrimp-rosenberg",
    slug: "krevetka-rozenberga",
    name: "Креветка Розенберга",
    category: "shrimp",
    categoryLabel: "Креветки",
    shortDescription: "Прісноводна, велика, заморожена. Преміальний вибір.",
    description:
      "Велика прісноводна креветка Розенберга. Насичений смак і вражаючий розмір.",
    image: "/products/krevetka-rozenberga.jpg",
    basePrice: 2500,
    unit: "kg",
    badges: ["Преміум"],
  },
  {
    id: "fish-taran",
    slug: "taran",
    name: "Тарань",
    category: "fish",
    categoryLabel: "Риба",
    shortDescription: "В асортименті. Класика до пінного.",
    description: "В'ялена тарань в асортименті. Незамінна закуска до пива.",
    image: "/products/taran.jpg",
    basePrice: 500,
    unit: "kg",
  },
  {
    id: "fish-tovstolob",
    slug: "tovstolob",
    name: "Товстолоб",
    category: "fish",
    categoryLabel: "Риба",
    shortDescription: "Холодного копчення. Улюблена закуска до пінного.",
    description:
      "Товстолоб холодного копчення. Щільне ароматне м'ясо з насиченим смаком, що чудово смакує з холодним пивом.",
    image: "/products/tovstolob.jpg",
    basePrice: 550,
    unit: "kg",
  },
  {
    id: "spices",
    slug: "spetsii",
    name: "Спеції для варки раків",
    category: "other",
    categoryLabel: "Інші товари",
    shortDescription: "Класичні або фірмові. Букет для домашньої варки.",
    description:
      "Набір спецій, щоб зварити раків удома як у нас. Оберіть класичний набір або фірмовий, з насиченішим ароматним букетом.",
    image: "/products/spetsii.jpg",
    basePrice: 25,
    unit: "pcs",
    variants: [
      { id: "classic", label: "Класичні", price: 25 },
      { id: "signature", label: "Фірмові", price: 40 },
    ],
  },
  {
    id: "gift-certificate",
    slug: "sertyfikat",
    name: "Подарунковий сертифікат",
    category: "other",
    categoryLabel: "Інші товари",
    shortDescription: "Смачні емоції в подарунок. Номінали 500, 1000 та 1500 грн.",
    description:
      "Подарунковий сертифікат на раки та інші делікатеси. Діє в усіх магазинах мережі. Оберіть номінал.",
    image: "/products/sertyfikat.jpg",
    basePrice: 500,
    unit: "cert",
    badges: ["У подарунок"],
    variants: [
      { id: "500", label: "500 грн", price: 500 },
      { id: "1000", label: "1000 грн", price: 1000 },
      { id: "1500", label: "1500 грн", price: 1500 },
    ],
  },
];

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getHits = () => PRODUCTS.filter((p) => p.isHit);
