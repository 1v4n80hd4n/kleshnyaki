import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/lib/data/products";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductDetail } from "@/components/product/ProductDetail";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Товар не знайдено" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} · КЛЕШНЯКИ`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return (
    <div className="shell py-10 md:py-14">
      <Breadcrumbs
        items={[
          { href: "/", label: "Головна" },
          { href: "/shop", label: "Каталог" },
          { label: product.name },
        ]}
      />
      <ProductDetail product={product} />
      <RelatedProducts currentId={product.id} category={product.category} />
      <RecentlyViewed excludeId={product.id} />
    </div>
  );
}
