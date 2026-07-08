import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { ProcessSection } from "@/components/about/ProcessSection";
import { RecipeSteps } from "@/components/about/RecipeSteps";
import { AboutCta } from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "Про нас та рецепти",
  description:
    "Історія КЛЕШНЯКИ: понад 10 років свіжих раків у Києві. Як ми працюємо від поставки до столу та покроковий рецепт варки раків удома.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <ProcessSection />
      <RecipeSteps />
      <AboutCta />
    </>
  );
}
