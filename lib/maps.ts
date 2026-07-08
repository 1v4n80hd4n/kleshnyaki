import type { Store } from "./types";

export const directionsUrl = (store: Store) =>
  `https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`;

export const telHref = (phone: string) =>
  `tel:+380${phone.replace(/\D/g, "").slice(1)}`;
