// stores/market.store.ts

import { create } from "zustand";

interface MarketState {
  currentMarketId: string | null;
  currentMarketName: string | null;
  setCurrentMarket: (id: string, name?: string | null) => void;
  clearMarket: () => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  currentMarketId: "id3434",
  currentMarketName: "Mercado San José",

  setCurrentMarket: (id, name = null) =>
    set({
      currentMarketId: id,
      currentMarketName: name,
    }),

  clearMarket: () =>
    set({
      currentMarketId: null,
      currentMarketName: null,
    }),
}));
