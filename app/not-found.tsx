import { Link } from "next-view-transitions";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60dvh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-claw md:text-8xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-cream md:text-3xl">
        Такої сторінки немає
      </h1>
      <p className="mt-2 max-w-sm text-cream-muted">
        Можливо, товар прибрали з каталогу або посилання застаріло.
      </p>
      <Link
        href="/shop"
        className="focus-ring mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-claw px-7 text-sm font-semibold text-cream transition-all duration-200 ease-smooth active:scale-[0.98] hover:bg-claw-400"
      >
        <Home className="h-4 w-4" />
        До каталогу
      </Link>
    </div>
  );
}
