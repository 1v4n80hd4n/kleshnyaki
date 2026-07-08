"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import { STORES } from "@/lib/data/stores";
import { StoreListCard } from "./StoreListCard";

function markerIcon(L: typeof import("leaflet"), active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div class="store-pin${active ? " store-pin-active" : ""}"><img src="/logo.png" alt="" /></div>`,
    iconSize: [46, 46],
    iconAnchor: [23, 23],
  });
}

export function StoresView() {
  const [activeId, setActiveId] = useState(STORES[0].id);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, LeafletMarker>>({});
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;
      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }
      ).addTo(map);

      STORES.forEach((store) => {
        const marker = L.marker([store.lat, store.lng], {
          icon: markerIcon(L, store.id === STORES[0].id),
          title: store.name,
        }).addTo(map);
        marker.on("click", () => setActiveId(store.id));
        markersRef.current[store.id] = marker;
      });

      const bounds = L.latLngBounds(
        STORES.map((s) => [s.lat, s.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [48, 48] });
      setTimeout(() => map.invalidateSize(), 120);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const active = id === activeId;
      marker.setIcon(markerIcon(L, active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    const store = STORES.find((s) => s.id === activeId);
    if (store) map.flyTo([store.lat, store.lng], 15, { duration: 0.8 });
  }, [activeId]);

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr] lg:gap-8">
      <div className="order-2 max-h-[70dvh] space-y-3 overflow-y-auto pr-1 lg:order-1">
        {STORES.map((store) => (
          <StoreListCard
            key={store.id}
            store={store}
            active={store.id === activeId}
            onSelect={() => setActiveId(store.id)}
          />
        ))}
      </div>

      <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
        <div
          ref={containerRef}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line bg-ink-800 lg:aspect-auto lg:h-[70dvh]"
        />
      </div>
    </div>
  );
}
