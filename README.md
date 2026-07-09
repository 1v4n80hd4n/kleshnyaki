<div align="center">

# 🦞 КЛЕШНЯКИ

**Преміальний e-commerce для мережі магазинів раків** — кінематографічний фронтенд з інтерактивною картою, кошиком, оформленням замовлення та плавними переходами між сторінками.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-state-443E38)

![Прев'ю КЛЕШНЯКИ](./app/opengraph-image.png)

</div>

> ⚠️ **Неофіційний концепт редизайну**, створений виключно для демонстрації навичок Frontend-розробки. Усі права на бренд, логотипи, фотографії та інший контент належать їхнім відповідним власникам. Проєкт не є офіційним сайтом компанії та не пов'язаний із нею.

## Про проєкт

Повноцінний преміальний інтернет-магазин у темній «cinematic food» естетиці на Next.js 14 (App Router). Фокус — на якості інтеракцій, продуктивності та чистоті коду. Уся типографіка й анімації дотримуються єдиної дизайн-системи з підтримкою `prefers-reduced-motion`.

## ✨ Можливості

- **Каталог** з живим пошуком, фільтрами й сортуванням, синхронізованими в URL.
- **Кошик** з persist, drawer + окрема сторінка, анімація «політ у кошик», тости.
- **Товар** з варіантами, галереєю з лайтбоксом і зумом, липким mobile-баром.
- **Оформлення** з валідацією React Hook Form + Zod і серверним ендпоінтом.
- **Інтерактивна карта** магазинів (Leaflet) з кастомними маркерами.
- **View Transitions** з shared-element морфінгом фото товару між сторінками.
- **Мікроінтеракції:** 3D-нахил карток, магнітні CTA, нескінченна карусель відгуків, count-up, ken-burns.

## 🛠 Технології

| Категорія | Стек |
|---|---|
| Ядро | Next.js 14 (App Router), React 18, TypeScript (strict) |
| Стилі | Tailwind CSS, дизайн-токени |
| Стан і форми | Zustand (+ persist), React Hook Form + Zod |
| Анімація | Framer Motion, View Transitions API |
| Карта / іконки | Leaflet, Lucide React |

## 🏗 Технічні рішення

- **Статична генерація** усіх сторінок; клієнтські компоненти лише де потрібна інтерактивність.
- **Code-splitting:** Leaflet підвантажується динамічно тільки на сторінці магазинів.
- **Типобезпека:** strict TypeScript, збірка без попереджень і без мертвого коду.
- **Доступність:** керування з клавіатури, focus-стани, `prefers-reduced-motion`.
- **SEO:** `sitemap.xml`, `robots.txt`, OG/Twitter прев'ю, `metadataBase`.
- **Оптимізація зображень** через `next/image`, стиснуте hero-відео (VP9) з постером.

## 🚀 Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-збірка
```

## ☁️ Деплой

Готовий до деплою на **Vercel**. Встановіть `NEXT_PUBLIC_SITE_URL` з реальним доменом
для коректних абсолютних посилань в OG, `sitemap.xml` і `robots.txt`.

---

<div align="center">
<sub>Неофіційний навчальний проєкт. Уся бізнес-інформація вигадана для демонстрації. Права на контент належать відповідним власникам.</sub>
</div>
