// modules/market/components/sector-filters/MarketSectorFilters.tsx

"use client";

import { cn } from "@/shared/utils";
import { Button } from "@/ui/atoms";
import { SearchInput } from "@/ui/molecules";
import { FilterPanel } from "@/ui/organisms";
import { FilterGroupConfig } from "@/ui/organisms/filter-panel";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  groups: FilterGroupConfig[];
  onGroupChange: (groupId: string, values: string[]) => void;
  className?: string;
  onApply: () => void;
  onClear: () => void;
}

export const MarketSectorFilters: React.FC<Props> = ({
  search,
  onSearchChange,
  groups,
  onGroupChange,
  className,
  onApply,
  onClear,
}) => {
  return (
    <aside className={cn("flex flex-col gap-4", className)}>
      <SearchInput
        value={search}
        onChangeValue={onSearchChange}
        placeholder="Buscar un Sector..."
        fullWidth
        size="md"
        showSearchIcon
        showClearButton
        debounceMs={0}
      />

      <FilterPanel
        title="Filtrar por:"
        groups={groups}
        onGroupChange={onGroupChange}
      />

      <div className="flex gap-2 w-full px-3">
        <Button
          onClick={onApply}
          colorScheme="secondary"
          variant="outline"
          fullWidth
          disabled={groups.every((group) => group.values.length === 0)}
        >
          Aplicar
        </Button>
        <Button
          onClick={onClear}
          colorScheme="secondary"
          variant="outline"
          fullWidth
          disabled={groups.every((group) => group.values.length === 0)}
        >
          Limpiar
        </Button>
      </div>
    </aside>
  );
};

export default MarketSectorFilters;
