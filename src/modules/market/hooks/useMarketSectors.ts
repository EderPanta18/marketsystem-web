// hooks/market/useMarketSectors.ts

import { useEffect, useState } from "react";
import type { MarketSectorSummary } from "../types";

interface UseMarketSectorsResult {
  sectors: MarketSectorSummary[];
  loading: boolean;
  error: string | null;
}

export function useMarketSectors(marketId: string): UseMarketSectorsResult {
  const [sectors, setSectors] = useState<MarketSectorSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // TODO: reemplazar por llamada real a servicio
    const mock: MarketSectorSummary[] = [
      {
        id: "carnes",
        name: "Carnes",
        totalStalls: 22,
        activeStalls: 19,
        closedStalls: 2,
        freeStalls: 1,
        periodicity: "Semanal",
        collectionDay: "Lunes",
      },
      {
        id: "pescados",
        name: "Pescados",
        totalStalls: 22,
        activeStalls: 18,
        closedStalls: 4,
        freeStalls: 0,
        periodicity: "Semanal",
        collectionDay: "Lunes",
      },
      {
        id: "bazar",
        name: "Bazar",
        totalStalls: 128,
        activeStalls: 120,
        closedStalls: 3,
        freeStalls: 5,
        periodicity: "Diario",
        collectionDay: "--",
      },
      {
        id: "plataforma-a",
        name: "Plataforma A",
        totalStalls: 128,
        activeStalls: 120,
        closedStalls: 3,
        freeStalls: 5,
        periodicity: "Diario",
        collectionDay: "--",
      },
      {
        id: "plataforma-b",
        name: "Plataforma B",
        totalStalls: 128,
        activeStalls: 120,
        closedStalls: 3,
        freeStalls: 5,
        periodicity: "Semanal",
        collectionDay: "Lunes",
      },
      {
        id: "plataforma-c",
        name: "Plataforma C",
        totalStalls: 128,
        activeStalls: 120,
        closedStalls: 3,
        freeStalls: 5,
        periodicity: "Semanal",
        collectionDay: "Lunes",
      },
    ];

    const timer = setTimeout(() => {
      setSectors(mock);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [marketId]);

  return { sectors, loading, error };
}
