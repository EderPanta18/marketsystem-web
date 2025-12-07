// ui/molecules/dataTable/DataTable.types.ts

import type { ReactNode } from "react";
import type { UIColorScheme } from "@/core/types";

export type DataTableAlign = "left" | "center" | "right";

export interface DataTableColumn<TData> {
  key: keyof TData | string;
  header: ReactNode;
  width?: string;
  align?: DataTableAlign;
  render?: (row: TData) => ReactNode;
}

export interface DataTableProps<TData> {
  columns: Array<DataTableColumn<TData>>;
  data: TData[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;

  // configuración visual
  colorScheme?: Extract<UIColorScheme, "primary" | "secondary" | "neutral">;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}
