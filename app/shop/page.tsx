import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogGrid } from "@/components/shop/CatalogGrid";

export const metadata: Metadata = {
  title: "Каталог",
  description:
    "Живі та варені раки, креветки, риба та подарункові сертифікати. Оберіть розмір і вагу, замовте доставку по Києву.",
};

export default function ShopPage() {
  return (
    <div className="shell py-10 md:py-14">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-cream md:text-5xl">Каталог</h1>
        <p className="mt-3 max-w-xl text-cream-muted">
          Живі та варені раки, креветки, риба та сертифікати. Свіже щодня,
          доставка по Києву за 60-120 хвилин.
        </p>
      </header>
      <Suspense fallback={null}>
        <CatalogGrid />
      </Suspense>
    </div>
  );
}
