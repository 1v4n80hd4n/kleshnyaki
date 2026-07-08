import { Link } from "next-view-transitions";
import { Send, Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { BRAND, CATEGORY_LABELS, CATEGORY_ORDER } from "@/lib/constants";
import { STORES } from "@/lib/data/stores";
import { telHref } from "@/lib/maps";
import { Logo } from "@/components/ui/Logo";
import { Newsletter } from "./Newsletter";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-ink-800/50">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo size={52} wordmarkClassName="text-2xl" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">
            Більше 10 років на ринку. Живі та варені раки, креветки, риба та
            подарункові сертифікати. Свіжий, смачний рак не може коштувати дешево.
          </p>
          <div className="mt-6 flex gap-3">
            <SocialLink href={BRAND.socials.telegram} label="Telegram">
              <Send className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={BRAND.socials.instagram} label="Instagram">
              <Instagram className="h-5 w-5" />
            </SocialLink>
            <SocialLink href={BRAND.socials.facebook} label="Facebook">
              <Facebook className="h-5 w-5" />
            </SocialLink>
          </div>

          <div className="mt-8 max-w-xs">
            <p className="mb-3 text-sm font-semibold text-cream">
              Дізнавайтесь першими
            </p>
            <Newsletter />
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cream-dim">
            Каталог
          </h4>
          <ul className="mt-4 space-y-2.5">
            {CATEGORY_ORDER.map((c) => (
              <li key={c}>
                <Link
                  href={`/shop?category=${c}`}
                  className="text-sm text-cream-muted transition-colors hover:text-claw-400"
                >
                  {CATEGORY_LABELS[c]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cream-dim">
            Магазини
          </h4>
          <ul className="mt-4 space-y-2.5">
            {STORES.slice(0, 5).map((s) => (
              <li
                key={s.id}
                className="flex items-start gap-1.5 text-sm text-cream-muted"
              >
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-claw/70" />
                {s.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-cream-dim">
            Замовлення
          </h4>
          <div className="mt-4 space-y-3">
            <ContactPhone label="Правий берег" phone={BRAND.phonesRight[0]} />
            <ContactPhone label="Лівий берег" phone={BRAND.phonesLeft[0]} />
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-2 py-6 text-xs text-cream-dim sm:flex-row">
          <p>© {year} «КЛЕШНЯКИ» Київ. Усі права захищено.</p>
          <p>Свіжі раки щодня, доставка по Києву 60-120 хв.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-line text-cream-muted transition-colors hover:border-claw hover:text-claw-400"
    >
      {children}
    </a>
  );
}

function ContactPhone({ label, phone }: { label: string; phone: string }) {
  return (
    <div>
      <p className="text-xs text-cream-dim">{label}</p>
      <a
        href={telHref(phone)}
        className="flex items-center gap-2 font-display text-lg font-bold text-cream transition-colors hover:text-claw-400"
      >
        <Phone className="h-4 w-4 text-claw" />
        {phone}
      </a>
    </div>
  );
}
