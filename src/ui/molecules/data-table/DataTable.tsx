// ui/molecules/dataTable/DataTable.tsx

import React from "react";
import { cn } from "@/shared/utils";
import { Spinner } from "@/ui/atoms";
import type { DataTableProps } from "./DataTable.types";
import { getTableClasses } from "./DataTable.helpers";

export const DataTable = <TData,>({
  columns,
  data,
  loading = false,
  emptyMessage = "Sin registros",
  className,
  colorScheme = "neutral",
  striped = false,
  hoverable = true,
  compact = false,
}: DataTableProps<TData>) => {
  const hasData = data.length > 0;

  const styles = getTableClasses<TData>({
    colorScheme,
    striped,
    hoverable,
    compact,
  });

  return (
    <div className={cn(styles.tableWrapper, className)}>
      <table className="min-w-full">
        <thead className={styles.thead}>
          <tr>
            {columns.map((col, index) => (
              <th
                key={String(col.key) ?? index}
                scope="col"
                className={cn(
                  styles.th,
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right"
                )}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tbody}>
          {loading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Spinner colorScheme={colorScheme} />
                </div>
              </td>
            </tr>
          )}

          {!loading && !hasData && (
            <tr>
              <td
                colSpan={columns.length}
                className={cn(
                  "px-4 text-center text-sm text-gray-500",
                  styles.emptyPadding
                )}
              >
                {emptyMessage}
              </td>
            </tr>
          )}

          {!loading &&
            hasData &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={styles.tr}>
                {columns.map((col, colIndex) => {
                  const value =
                    col.render?.(row) ??
                    ((row as any)[col.key as keyof TData] as React.ReactNode);

                  return (
                    <td
                      key={colIndex}
                      className={cn(
                        styles.td,
                        styles.rowPadding,
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right"
                      )}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
