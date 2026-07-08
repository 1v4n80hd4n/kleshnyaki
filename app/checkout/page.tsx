import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Оформлення замовлення",
  description:
    "Оформіть замовлення раків: доставка по Києву або самовивіз із магазину мережі.",
};

export default function CheckoutPage() {
  return (
    <div className="shell py-10 md:py-14">
      <h1 className="mb-8 text-4xl font-extrabold text-cream md:text-5xl">
        Оформлення
      </h1>
      <CheckoutForm />
    </div>
  );
}
