import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { ViewTransitions } from "next-view-transitions";
import { display, sans } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { FlyToCart } from "@/components/cart/FlyToCart";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Toaster } from "@/components/ui/Toaster";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "КЛЕШНЯКИ - живі та варені раки з доставкою по Києву",
    template: "%s · КЛЕШНЯКИ",
  },
  description:
    "Свіжі живі та варені раки за авторським рецептом, креветки, риба та подарункові сертифікати. Мережа магазинів у Києві. Доставка 60-120 хв.",
  keywords: ["раки київ", "живі раки", "варені раки", "креветки", "доставка раків"],
};

export const viewport: Viewport = {
  themeColor: "#0b0706",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="uk" className={`dark ${display.variable} ${sans.variable}`}>
        <body className="min-h-[100dvh] font-sans">
          <div className="grain-overlay" aria-hidden="true" />
          <Header />
          <main className="pb-20 md:pb-0">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <MobileBottomNav />
          </Suspense>
          <QuickViewModal />
          <FlyToCart />
          <CartDrawer />
          <Toaster />
        </body>
      </html>
    </ViewTransitions>
  );
}
