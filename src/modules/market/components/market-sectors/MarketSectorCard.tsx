// modules/market/components/market-sectors/MarketSectorCard.tsx

import { cn } from "@/shared/utils";
import { MarketSectorSummary } from "@/modules/market/types";

interface Props {
  sector: MarketSectorSummary;
  className?: string;
}

export const MarketSectorCard: React.FC<Props> = ({ sector, className }) => {
  return (
    <article
      className={cn(
        "rounded-2xl border border-gray-300 bg-white px-5 py-3 shadow-sm",
        className
      )}
    >
      <h3 className="text-lg font-semibold text-primary-700 mb-1">
        {sector.name}
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-y-1 text-sm text-gray-800">
        <div>
          <p>Total de Puestos: {sector.totalStalls}</p>
          <p>Puestos Activos: {sector.activeStalls}</p>
        </div>
        <div>
          <p>Puestos Cerrados: {sector.closedStalls}</p>
          <p>Puestos Libres: {sector.freeStalls}</p>
        </div>
        <div>
          <p>Periodicidad: {sector.periodicity}</p>
          <p>Día de Cobranza: {sector.collectionDay}</p>
        </div>
      </div>
    </article>
  );
};
