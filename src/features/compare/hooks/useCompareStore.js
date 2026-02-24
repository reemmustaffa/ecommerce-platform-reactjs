import { create } from "zustand";

export const useCompareStore = create((set) => ({
  compareProducts: [],

  addToCompare: (product) =>
    set((state) => {
      const exists = state.compareProducts.find((p) => p.id === product.id);
      if (exists) return state;

      if (state.compareProducts.length < 2) {
        return { compareProducts: [...state.compareProducts, product] };
      }

      return {
        compareProducts: [state.compareProducts[1], product],
      };
    }),

  removeFromCompare: (id) =>
    set((state) => ({
      compareProducts: state.compareProducts.filter((p) => p.id !== id),
    })),

  clearCompare: () => set({ compareProducts: [] }),
}));
