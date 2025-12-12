// ui/organisms/filter-panel/FilterPanel.helpers.ts

import { cn } from "@/shared/utils";

export function getPanelClasses(extra?: string, width?: "full" | string) {
  // añade max-h aquí también
  return cn(
    " h-full flex flex-col gap-3 rounded-xl bg-white",
    width === "full" && "w-full",
    extra
  );
}

export function getPanelStyle(width?: "full" | string) {
  if (!width || width === "full") return undefined;
  return { width };
}

export function getGroupsContainerClasses() {
  // overflow-y para scroll vertical si se abren muchos grupos
  return "flex flex-col gap-1 overflow-y-auto scroll-auto";
}

export function getFooterClasses() {
  return "mt-2 flex items-center justify-end gap-3";
}
