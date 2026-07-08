<div align="center">

# 🦞 КЛЕШНЯКИ

**Преміальний e-commerce для мережі магазинів раків у Києві** — кінематографічний фронтенд з інтерактивною картою, кошиком, оформленням замовлення та плавними переходами між сторінками.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-state-443E38)

![Прев'ю КЛЕШНЯКИ](./app/opengraph-image.png)

</div>

---

## Про проєкт

Портфоліо-проєкт: повноцінний преміальний інтернет-магазин у темній «cinematic food» естетиці. Побудований на Next.js 14 App Router з фокусом на якість інтеракцій, продуктивність і чистоту коду. Уся типографіка, анімації та компонування дотримуються єдиної дизайн-системи (один акцент, вмотивована анімація, підтримка `prefers-reduced-motion`).

> **Демо:** _посилання після деплою_ · **Стек:** Next.js 14 · TypeScript · Tailwind · Zustand · Framer Motion · Leaflet

## ✨ Ключові можливості

- **Каталог** з живим пошуком, фільтрами та сортуванням, синхронізованими в URL (шерингом і перезавантаженням стан не втрачається).
- **Кошик** з persist (localStorage), drawer + окрема сторінка на спільному стані, анімація «політ товару в кошик», тости.
- **Товар** з варіантами (калібри/номінали/набори), галереєю з повноекранним лайтбоксом і зумом, липким mobile-баром «Додати в кошик».
- **Оформлення замовлення** з валідацією React Hook Form + Zod на клієнті та серверним ендпоінтом (`app/api/orders`) з валідацією Zod.
- **Інтерактивна карта магазинів** (Leaflet + темні тайли, без API-ключа) з кастомними маркерами-логотипами та синхронізацією зі списком.
- **Плавні переходи між сторінками** (View Transitions API) з shared-element морфінгом фото товару.
- **Мікроінтеракції:** 3D-нахил карток, магнітні CTA, нескінченна карусель відгуків, count-up статистики, ken-burns на hero — усе з коректним reduced-motion fallback.

## 🛠 Технології

| Категорія | Технології |
|---|---|
| Фреймворк | Next.js 14 (App Router), React 18, TypeScript (strict) |
| Стилі | Tailwind CSS, дизайн-токени, кастомні keyframes |
| Стан | Zustand (+ persist middleware) |
| Форми | React Hook Form + Zod |
| Анімація | Framer Motion, View Transitions API |
| Карта | Leaflet + OpenStreetMap/CARTO |
| Іконки | Lucide React |

## 🏗 Технічні рішення

- **App Router + серверні компоненти** для статичної генерації; клієнтські компоненти лише там, де потрібна інтерактивність.
- **Code-splitting:** Leaflet підвантажується динамічно тільки на сторінці магазинів, тому не потрапляє в основний бандл.
- **Типобезпека:** TypeScript у strict-режимі, збірка проходить без попереджень і без мертвого коду.
- **Доступність:** керування з клавіатури, видимі focus-стани, семантичні ролі, повна підтримка `prefers-reduced-motion`.
- **SEO:** `sitemap.xml`, `robots.txt`, OG/Twitter прев'ю, `metadataBase` з env-домену.

## ⚡ Продуктивність

- Усі сторінки — **статична генерація** (SSG), сторінки товарів пре-рендеряться за slug.
- Зображення оптимізуються через `next/image` (ліниві нижче фолду, `priority` для LCP).
- Hero-відео стиснуте (~2.4 МБ, VP9) з постером для миттєвого першого екрана.
- Анімації каруселі рахуються лише коли секція у в'юпорті (IntersectionObserver).

## 🚀 Запуск

```bash
npm install
npm run dev
```

Відкрити http://localhost:3000

```bash
npm run build      # продакшн-збірка
npm run typecheck  # перевірка типів
npm run lint       # ESLint
```

## 📁 Структура

```
app/          Сторінки App Router, api/orders, sitemap, robots, favicon, OG
components/   UI, секції головної, товар, кошик, checkout, about, stores, layout
lib/          Типи, константи, дані, утиліти, валідація
store/        Стан Zustand
public/       Зображення, відео та постер Hero, логотип
```

## ☁️ Деплой

Готовий до деплою на **Vercel**. Встановіть змінну оточення `NEXT_PUBLIC_SITE_URL`
з реальним доменом — щоб OG-зображення, `sitemap.xml` і `robots.txt` формували
абсолютні посилання коректно.

---

<div align="center">
<sub>Портфоліо-проєкт. Уся бізнес-інформація вигадана для демонстрації.</sub>
</div>
