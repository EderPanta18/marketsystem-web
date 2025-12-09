// app/(protected)/sistema/_layout-components/sidebar-navigation/sidebar-footer/SidebarFooter.helpers.ts

import { cn } from "@/shared/utils";

export const sidebarFooterClasses = "flex flex-col gap-3";

export const sidebarQuickActionsRowClasses = "flex items-center gap-2";

export const userClasses =
  "flex w-full items-center justify-between rounded-2xl bg-gray-200 px-3 py-2  font-medium text-slate-800";

export const userMenuClasses =
  "absolute inset-x-0 bottom-full mb-3 rounded-lg bg-white shadow-lg ring-1 ring-gray-300 overflow-hidden";

export function getSidebarFooterClassName(extra?: string) {
  return cn(sidebarFooterClasses, extra);
}
