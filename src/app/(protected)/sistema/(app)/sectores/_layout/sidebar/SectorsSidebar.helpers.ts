// app/(protected)/sistema/(app)/sectores/_layout/sidebar/SectorsSidebar.helpers.ts

"use client";

import { useState, useMemo, useEffect } from "react";
import { useSectorSearchFilters } from "@/modules/market/hooks";
import type { FilterGroupConfig } from "@/ui/organisms/filter-panel";

export function useSectorsSidebarHelpers() {
  const { search, filters, apply, reset } = useSectorSearchFilters();

  const [localSearch, setLocalSearch] = useState(search);
  const [localFilters, setLocalFilters] = useState(filters);

  // sincroniza si la URL cambia desde fuera
  useEffect(() => {
    setLocalSearch(search);
    setLocalFilters(filters);
  }, [search, filters]);

  const groups: FilterGroupConfig[] = useMemo(
    () => [
      {
        id: "location",
        label: "Ubicación",
        options: [
          { id: "location-interior", value: "interior", label: "Interior" },
          { id: "location-exterior", value: "exterior", label: "Exterior" },
          {
            id: "location-vivanderas",
            value: "vivanderas",
            label: "Vivanderas",
          },
        ],
        values: localFilters.location ?? [],
        multiple: true,
        width: "full",
      },
    ],
    [localFilters.location]
  );

  const handleGroupChange = (groupId: string, values: string[]) => {
    if (groupId === "location") {
      setLocalFilters({ ...localFilters, location: values });
    }
  };

  const handleApply = () => {
    apply(localSearch, localFilters); // aquí sí actualizas URL una vez
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalFilters({});
    reset();
  };

  return {
    search: localSearch,
    setSearch: setLocalSearch,
    groups,
    handleGroupChange,
    apply: handleApply,
    reset: handleReset,
  };
}
