import { create } from "zustand";

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Flight {
  id: number;
  image: string;
  from: Rect;
}

interface FlyToCartState {
  flights: Flight[];
  launch: (opts: { image: string; from: DOMRect | Rect }) => void;
  remove: (id: number) => void;
}

let counter = 0;

export const useFlyToCartStore = create<FlyToCartState>((set) => ({
  flights: [],
  launch: ({ image, from }) =>
    set((state) => ({
      flights: [
        ...state.flights,
        {
          id: ++counter,
          image,
          from: { x: from.x, y: from.y, width: from.width, height: from.height },
        },
      ],
    })),
  remove: (id) =>
    set((state) => ({ flights: state.flights.filter((f) => f.id !== id) })),
}));
