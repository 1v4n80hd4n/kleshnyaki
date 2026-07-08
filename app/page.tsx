import { Hero } from "@/components/home/Hero";
import { HitsSection } from "@/components/home/HitsSection";
import { CalibersSection } from "@/components/home/CalibersSection";
import { Advantages } from "@/components/home/Advantages";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { StoresPreview } from "@/components/home/StoresPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HitsSection />
      <CalibersSection />
      <Advantages />
      <Testimonials />
      <Faq />
      <StoresPreview />
    </>
  );
}
