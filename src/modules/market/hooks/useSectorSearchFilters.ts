// modules/market/hooks/useSectorSearchFilters.ts

"use client";

import { useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SYSTEM_ROUTE } from "@/core/constants";

type SectorFilters = {
  location?: string[];
};

export function useSectorSearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("query") ?? "";

  const filters: SectorFilters = useMemo(
    () => ({
      location: (() => {
        const values = searchParams.getAll("location");
        return values.length ? values : undefined;
      })(),
    }),
    [searchParams]
  );

  const buildUrl = useCallback(
    (nextSearch: string, nextFilters: SectorFilters) => {
      const params = new URLSearchParams(searchParams?.toString());

      if (nextSearch) params.set("query", nextSearch);
      else params.delete("query");

      params.delete("location");
      if (nextFilters.location?.length) {
        nextFilters.location.forEach((loc) => params.append("location", loc));
      }

      const hasAnyParam = !!nextSearch || !!nextFilters.location?.length;
      if (!hasAnyParam) return SYSTEM_ROUTE.MARKET_SECTORS;

      const basePath = `${SYSTEM_ROUTE.MARKET_SECTORS}/search`;
      const queryString = params.toString();
      return queryString ? `${basePath}?${queryString}` : basePath;
    },
    [searchParams]
  );

  // Estos ya no hacen router.push; solo actualizan "draft" lógico
  const setSearch = useCallback(
    (value: string) => {
      // devolverías el nuevo search para que el caller lo guarde si quiere
      return { search: value, filters };
    },
    [filters]
  );

  const setFilters = useCallback((next: SectorFilters) => next, []);

  const apply = useCallback(
    (nextSearch: string, nextFilters: SectorFilters) => {
      const url = buildUrl(nextSearch, nextFilters);
      router.push(url);
    },
    [buildUrl, router]
  );

  const reset = useCallback(() => {
    router.push(SYSTEM_ROUTE.MARKET_SECTORS);
  }, [router]);

  return {
    search,
    filters,
    apply,
    reset,
    setSearch,
    setFilters,
  };
}
