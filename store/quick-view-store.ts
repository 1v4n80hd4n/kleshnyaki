import { create } from "zustand";
import type { Product } from "@/lib/types";

interface QuickViewState {
  product: Product | null;
  isOpen: boolean;
  open: (product: Product) => void;
  close: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  product: null,
  isOpen: false,
  open: (product) => set({ product, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
