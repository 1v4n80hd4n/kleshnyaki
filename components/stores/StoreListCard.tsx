"use client";

import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Store } from "@/lib/types";
import { directionsUrl, telHref } from "@/lib/maps";

interface StoreListCardProps {
  store: Store;
  active: boolean;
  onSelect: () => void;
}

export function StoreListCard({ store, active, onSelect }: StoreListCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 transition-colors",
        active ? "border-claw bg-claw/5" : "border-line bg-ink-800"
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className="focus-ring w-full text-left"
      >
        <h3 className="font-display text-lg font-bold text-cream">{store.name}</h3>
        <div className="mt-3 space-y-2 text-sm">
          <p className="flex items-start gap-2 text-cream-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-claw/70" />
            <span>
              {store.address}
              {store.landmark && (
                <span className="block text-xs text-cream-dim">{store.landmark}</span>
              )}
            </span>
          </p>
          <p className="flex items-start gap-2 text-cream-dim">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-claw/70" />
            {store.hours}
          </p>
        </div>
      </button>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={telHref(store.phones[0])}
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-cream transition-colors hover:bg-ink-700"
        >
          <Phone className="h-3.5 w-3.5 text-claw/70" />
          {store.phones[0]}
        </a>
        <a
          href={directionsUrl(store)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-xs font-semibold text-cream transition-colors hover:bg-ink-700"
        >
          <Navigation className="h-3.5 w-3.5 text-claw/70" />
          Маршрут
        </a>
      </div>
    </div>
  );
}
