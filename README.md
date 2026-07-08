# КЛЕШНЯКИ

Преміальний інтернет-магазин мережі «КЛЕШНЯКИ» (живі та варені раки, креветки, риба, сертифікати).

## Стек

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Zustand (кошик, обране, quick-view, fly-to-cart) з persist
- React Hook Form + Zod
- Framer Motion
- Lucide React

## Запуск

```bash
npm install
npm run dev
```

Відкрити http://localhost:3000

## Ассети Hero

Покладіть відео та постер у `public/videos/`:

- `public/videos/hero.mp4` (фонове відео Hero, 16:9)
- `public/videos/hero-poster.jpg` (кадр-постер, fallback під reduced-motion)

## Плейсхолдери зображень

Фото товарів та контенту тимчасово беруться з `picsum.photos`. Замініть на реальні знімки:
покладіть файли у `public/` і оновіть шляхи у `lib/data/products.ts` та компонентах About.

## Структура

- `app/` — сторінки App Router
- `components/` — UI, секції головної, товар, кошик, checkout, about, stores, layout
- `lib/` — типи, константи, дані, утиліти, валідація
- `store/` — стан Zustand

## Оформлення замовлення

Форма `/checkout` надсилає замовлення на серверний ендпоінт `app/api/orders/route.ts`
(валідація Zod на сервері). Наразі він повертає згенерований номер замовлення без збереження.
Щоб підключити реальне приймання замовлень, допишіть у цей ендпоінт запис у БД/CRM або
надсилання в Telegram чи на пошту.

## SEO та соцмережі

- `app/sitemap.ts` та `app/robots.ts` генерують `sitemap.xml` і `robots.txt`.
- `app/opengraph-image.png` та `app/twitter-image.png` — прев'ю для соцмереж.
- Домен задається у `lib/constants.ts` (`SITE_URL`) або через змінну оточення `NEXT_PUBLIC_SITE_URL` (рекомендовано для деплою).

## Деплой

Проєкт готовий до деплою на Vercel. Встановіть змінну оточення `NEXT_PUBLIC_SITE_URL`
з реальним доменом, щоб OG-зображення, `sitemap.xml` і `robots.txt` формували абсолютні
посилання коректно. Команда збірки: `npm run build`.
