// app/(protected)/sistema/(app)/sectores/page.tsx

"use client";

import { MarketSectors } from "@/modules/market";
import { useMarketStore } from "@/stores";

export default function SectorsPage() {
  const currentMarketId = useMarketStore((state) => state.currentMarketId);
  const currentMarketName = useMarketStore((state) => state.currentMarketName);

  return (
    <div className="size-full">
      <MarketSectors
        marketId={currentMarketId!}
        marketName={currentMarketName! ?? "Mercado"}
      />
    </div>
  );
}
