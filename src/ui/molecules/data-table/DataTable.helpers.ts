// ui/molecules/dataTable/DataTable.helpers.ts

import { cn } from "@/shared/utils";
import {
  extractBgColorClass,
  extractBorderColorClass,
  extractTextColorClass,
  getColorVariantBaseClasses,
} from "@/ui/tokens";
import type { DataTableProps } from "./DataTable.types";

export function getTableClasses<TData>({
  colorScheme = "neutral",
  striped = false,
  hoverable = true,
  compact = false,
}: Pick<
  DataTableProps<TData>,
  "colorScheme" | "striped" | "hoverable" | "compact"
>) {
  // usamos outline para encabezado/bordes
  const baseClasses = getColorVariantBaseClasses(colorScheme, "outline");
  const headerBg = extractBgColorClass(baseClasses, "bg-gray-50");
  const borderColor = extractBorderColorClass(baseClasses, "border-gray-200");
  const headerText = extractTextColorClass(baseClasses, "text-gray-700");

  const tableWrapper = cn(
    "w-full text-sm overflow-x-auto rounded-lg border bg-white",
    borderColor
  );

  const thead = cn("border-b", borderColor);
  const th = cn(
    "px-4 py-2 text-left font-semibold uppercase tracking-wide",
    headerBg,
    headerText
  );

  const tbody = "divide-y divide-gray-200";

  const tr = cn(
    striped && "odd:bg-gray-50 even:bg-white",
    hoverable && "hover:bg-gray-100 transition-colors"
  );

  const td = "px-4 py-2 align-middle text-gray-800";

  const rowPadding = compact ? "py-1.5" : "py-2";
  const emptyPadding = compact ? "py-4" : "py-6";

  return {
    tableWrapper,
    thead,
    th,
    tbody,
    tr,
    td,
    rowPadding,
    emptyPadding,
  };
}
