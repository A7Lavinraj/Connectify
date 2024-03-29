import { create } from "zustand";

export interface SearchModelStore {
  status: boolean;
  open: () => void;
  close: () => void;
}

export const useSearchModel = create<SearchModelStore>((set) => ({
  status: false,
  open: () => set({ status: true }),
  close: () => set({ status: false })
}));
