import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";
import { KG_MAX, KG_MIN } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity" | "key"> & { quantity?: number }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const buildKey = (productId: string, variantId?: string) =>
  variantId ? `${productId}::${variantId}` : productId;

function clampQty(qty: number, unit: CartItem["unit"]): number {
  if (unit === "kg") {
    return Math.min(KG_MAX, Math.max(KG_MIN, Number(qty.toFixed(1))));
  }
  return Math.max(1, Math.round(qty));
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (incoming) =>
        set((state) => {
          const key = buildKey(incoming.productId, incoming.variantId);
          const qty = incoming.quantity ?? 1;
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key
                  ? { ...i, quantity: clampQty(i.quantity + qty, i.unit) }
                  : i
              ),
            };
          }
          const newItem: CartItem = {
            ...incoming,
            key,
            quantity: clampQty(qty, incoming.unit),
          };
          return { items: [...state.items, newItem] };
        }),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: clampQty(quantity, i.unit) } : i
          ),
        })),
      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    {
      name: "kleshnyaki-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const useCartCount = () =>
  useCartStore((s) =>
    s.items.reduce((n, i) => n + (i.unit === "kg" ? 1 : i.quantity), 0)
  );

export const useCartSubtotal = () =>
  useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
