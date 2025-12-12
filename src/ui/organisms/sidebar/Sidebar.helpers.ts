// ui/organisms/sidebar/Sidebar.helpers.ts

import { cn } from "@/shared/utils";
import type { SidebarNavItem } from "./Sidebar.types";

export const sidebarBaseClasses =
  "flex h-full w-64 flex-col bg-gray-100 shadow-xl shadow-gray-400";

export function getSidebarClassName(extra?: string) {
  return cn(sidebarBaseClasses, extra);
}

export function getSidebarItemClasses(item: SidebarNavItem): string {
  return cn(
    "bg-transparent px-6 py-3 text-base font-medium transition-colors",
    item.active
      ? "bg-gray-300 text-gray-900"
      : "text-gray-800 hover:bg-gray-200",
    item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
  );
}
