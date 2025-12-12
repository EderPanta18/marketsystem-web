// ui/organisms/filter-panel/FilterPanel.types.ts

import { OptionGroupItem } from "@/ui/molecules/option-group-filter";

export interface FilterGroupConfig {
  id: string;
  label: string;
  options: OptionGroupItem[];
  values: string[];
  multiple?: boolean;
  disabled?: boolean;
  width?: "full" | string;
}

export interface FilterPanelProps {
  title?: string;
  groups: FilterGroupConfig[];
  onGroupChange: (groupId: string, values: string[]) => void;
  className?: string;
  width?: "full" | string;
}
