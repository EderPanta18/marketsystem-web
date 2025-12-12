// app/(protected)/sistema/(app)/sectores/_layout/sidebar/SectorsFilters.tsx

"use client";

import { MarketSectorFilters } from "@/modules/market/components";
import { useSectorsSidebarHelpers } from "./SectorsSidebar.helpers";

export const SectorsFilters: React.FC = () => {
  const { search, setSearch, groups, handleGroupChange, apply, reset } =
    useSectorsSidebarHelpers();

  return (
    <MarketSectorFilters
      search={search}
      onSearchChange={setSearch}
      groups={groups}
      onGroupChange={handleGroupChange}
      onApply={apply}
      onClear={reset}
    />
  );
};

export default SectorsFilters;
