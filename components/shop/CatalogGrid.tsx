"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageOpen } from "lucide-react";
import { PRODUCTS } from "@/lib/data/products";
import { useMounted } from "@/lib/use-mounted";
import { useWishlistStore } from "@/store/wishlist-store";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { SearchBar } from "./SearchBar";
import { CatalogFilters, type FilterValue } from "./CatalogFilters";
import { SortSelect, type SortKey } from "./SortSelect";

const VALID_FILTERS: FilterValue[] = [
  "all",
  "live",
  "boiled",
  "shrimp",
  "fish",
  "other",
];

const VALID_SORTS: SortKey[] = ["default", "price-asc", "price-desc", "name"];

export function CatalogGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mounted = useMounted();
  const wishlistIds = useWishlistStore((s) => s.ids);

  const urlCategory = params.get("category") as FilterValue | null;
  const urlSort = params.get("sort") as SortKey | null;
  const wishlistOnly = params.get("wishlist") === "1";

  const [category, setCategory] = useState<FilterValue>(
    urlCategory && VALID_FILTERS.includes(urlCategory) ? urlCategory : "all"
  );
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>(
    urlSort && VALID_SORTS.includes(urlSort) ? urlSort : "default"
  );

  const syncUrl = useCallback(
    (next: { category?: FilterValue; query?: string; sort?: SortKey }) => {
      const sp = new URLSearchParams(params.toString());
      const cat = next.category ?? category;
      const q = next.query ?? query;
      const s = next.sort ?? sort;

      if (cat === "all") sp.delete("category");
      else sp.set("category", cat);
      if (q.trim()) sp.set("q", q.trim());
      else sp.delete("q");
      if (s === "default") sp.delete("sort");
      else sp.set("sort", s);

      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, category, query, sort, router, pathname]
  );

  const changeCategory = (v: FilterValue) => {
    setCategory(v);
    syncUrl({ category: v });
  };
  const changeQuery = (v: string) => {
    setQuery(v);
    syncUrl({ query: v });
  };
  const changeSort = (v: SortKey) => {
    setSort(v);
    syncUrl({ sort: v });
  };

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    if (wishlistOnly) list = list.filter((p) => wishlistIds.includes(p.id));
    if (category !== "all") list = list.filter((p) => p.category === category);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc") list.sort((a, b) => a.basePrice - b.basePrice);
    if (sort === "price-desc") list.sort((a, b) => b.basePrice - a.basePrice);
    if (sort === "name") list.sort((a, b) => a.name.localeCompare(b.name, "uk"));

    return list;
  }, [category, query, sort, wishlistOnly, wishlistIds]);

  const loadingWishlist = wishlistOnly && !mounted;

  const resetFilters = () => {
    setCategory("all");
    setQuery("");
    setSort("default");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <SearchBar value={query} onChange={changeQuery} />
          </div>
          <SortSelect value={sort} onChange={changeSort} />
        </div>
        {!wishlistOnly && (
          <CatalogFilters value={category} onChange={changeCategory} />
        )}
      </div>

      <p className="mt-6 text-sm text-cream-dim">
        {wishlistOnly ? "Обрані товари" : "Знайдено товарів"}:{" "}
        <span className="font-semibold text-cream">
          {loadingWishlist ? "…" : filtered.length}
        </span>
      </p>

      <div className="mt-4">
        {loadingWishlist ? (
          <ProductGridSkeleton />
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} enableTransition />
            ))}
          </div>
        ) : (
          <EmptyState wishlist={wishlistOnly} onReset={resetFilters} />
        )}
      </div>
    </div>
  );
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-line bg-ink-800"
        >
          <Skeleton className="aspect-[4/5] rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  wishlist,
  onReset,
}: {
  wishlist: boolean;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line py-20 text-center">
      <PackageOpen className="h-12 w-12 text-cream-dim" strokeWidth={1.5} />
      <h3 className="mt-4 font-display text-xl font-bold text-cream">
        {wishlist ? "В обраному поки порожньо" : "Нічого не знайшли"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-cream-muted">
        {wishlist
          ? "Додавайте товари сердечком у каталозі, щоб не загубити."
          : "Спробуйте змінити запит або скинути фільтри."}
      </p>
      {!wishlist && (
        <button
          type="button"
          onClick={onReset}
          className="focus-ring mt-6 inline-flex h-11 items-center rounded-full bg-claw px-6 text-sm font-semibold text-cream transition-colors hover:bg-claw-400"
        >
          Скинути фільтри
        </button>
      )}
    </div>
  );
}
