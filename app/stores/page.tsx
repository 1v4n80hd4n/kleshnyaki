import type { Metadata } from "next";
import { STORES } from "@/lib/data/stores";
import { StoresView } from "@/components/stores/StoresView";

export const metadata: Metadata = {
  title: "Магазини",
  description:
    "Мережа магазинів КЛЕШНЯКИ у Києві: адреси, години роботи, телефони та маршрути. Живі та варені раки на обох берегах.",
};

export default function StoresPage() {
  return (
    <div className="shell py-10 md:py-14">
      <header className="mb-8 max-w-2xl">
        <h1 className="text-4xl font-extrabold text-cream md:text-5xl">
          Наші магазини
        </h1>
        <p className="mt-3 text-cream-muted">
          {STORES.length} точок на обох берегах Києва. Оберіть найближчу, щоб
          побачити її на карті та прокласти маршрут.
        </p>
      </header>
      <StoresView />
    </div>
  );
}
