// hooks/market/useCurrentMarket.ts

import { useMarketStore } from "@/stores";

export function useCurrentMarket() {
  const { currentMarketId, currentMarketName, setCurrentMarket, clearMarket } =
    useMarketStore();

  return {
    currentMarketId,
    currentMarketName,
    setCurrentMarket,
    clearMarket,
    hasMarketSelected: !!currentMarketId,
  };
}
