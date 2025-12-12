// modules/market/types/market.typees.ts

export interface MarketSectorSummary {
  id: string;
  name: string;
  totalStalls: number;
  activeStalls: number;
  closedStalls: number;
  freeStalls: number;
  periodicity: string;
  collectionDay: string;
}
