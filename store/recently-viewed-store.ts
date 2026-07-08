import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewedState {
  ids: string[];
  add: (id: string) => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      ids: [],
      add: (id) =>
        set((s) => ({ ids: [id, ...s.ids.filter((x) => x !== id)].slice(0, 8) })),
    }),
    { name: "kleshnyaki-recently-viewed" }
  )
);
