import { create } from "zustand";

export type ToastTone = "default" | "success";

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastState {
  toasts: Toast[];
  push: (message: string, tone?: ToastTone) => void;
  remove: (id: number) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (message, tone = "default") =>
    set((s) => ({ toasts: [...s.toasts, { id: ++counter, message, tone }] })),
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
