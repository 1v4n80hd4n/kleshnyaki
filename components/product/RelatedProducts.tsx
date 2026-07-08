import { PRODUCTS, getHits } from "@/lib/data/products";
import type { Category } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentId: string;
  category: Category;
}

export function RelatedProducts({ currentId, category }: RelatedProductsProps) {
  let related = PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentId
  );
  if (related.length < 2) {
    related = getHits().filter((p) => p.id !== currentId);
  }
  related = related.slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 md:mt-28">
      <SectionHeading title="Також замовляють" />
      <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {related.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
