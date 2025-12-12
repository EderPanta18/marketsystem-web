// modules/market/components/market-sectors/MarketSectors.tsx

"use client";

import { cn } from "@/shared/utils";
import { Spinner } from "@/ui/atoms";
import { useMarketSectors } from "@/modules/market/hooks";
import { MarketSectorCard } from "./MarketSectorCard";

export interface MarketSectorsProps {
  marketId: string;
  marketName?: string;
}

export const MarketSectors: React.FC<MarketSectorsProps> = ({
  marketId,
  marketName,
}) => {
  const { sectors, loading } = useMarketSectors(marketId);

  return (
    <section className="flex flex-col gap-3 h-full">
      <h2 className="text-2xl font-bold text-primary-700">
        {marketName ?? "Mercado"} – Sectores
      </h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <Spinner size="md" colorScheme="primary" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-2.5 overflow-y-auto">
          {sectors.map((sector) => (
            <MarketSectorCard key={sector.id} sector={sector} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MarketSectors;
