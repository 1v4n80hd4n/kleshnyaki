import { getHits } from "@/lib/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HitCard } from "./HitCard";

export function HitsSection() {
  const hits = getHits();
  const featured = hits.find((p) => p.category === "boiled") ?? hits[0];
  const rest = hits.filter((p) => p.id !== featured.id).slice(0, 2);

  return (
    <section className="shell py-20 md:py-28">
      <SectionHeading
        title="Найчастіше замовляють"
        action={{ href: "/shop", label: "Весь каталог" }}
      />

      <div className="mt-10 grid gap-4 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-7">
          <HitCard product={featured} featured index={0} />
        </div>
        <div className="grid gap-4 md:col-span-5 md:gap-6">
          {rest.map((product, i) => (
            <HitCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
