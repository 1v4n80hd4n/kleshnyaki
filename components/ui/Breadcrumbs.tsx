import { Link } from "next-view-transitions";
import { ChevronRight } from "lucide-react";

interface Crumb {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлібні крихти" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-cream-dim">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="focus-ring rounded transition-colors hover:text-cream"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "text-cream" : undefined}>{item.label}</span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
