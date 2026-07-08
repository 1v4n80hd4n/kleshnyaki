import type { Metadata } from "next";
import { CartFullView } from "@/components/cart/CartFullView";

export const metadata: Metadata = {
  title: "Кошик",
  description:
    "Ваше замовлення у КЛЕШНЯКИ: раки, креветки та риба з доставкою по Києву.",
};

export default function CartPage() {
  return (
    <div className="shell py-10 md:py-14">
      <h1 className="mb-8 text-4xl font-extrabold text-cream md:text-5xl">Кошик</h1>
      <CartFullView />
    </div>
  );
}
