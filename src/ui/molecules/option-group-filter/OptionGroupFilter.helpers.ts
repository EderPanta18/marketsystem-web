// ui/molecules/option-group-filter/OptionGroupFilter.helpers.ts

import { cn } from "@/shared/utils";

export function getRootClasses(extra?: string, width?: "full" | string) {
  const widthClass =
    width === "full"
      ? "w-full"
      : typeof width === "string"
      ? undefined
      : undefined;

  return cn("border border-gray-400 rounded-xl bg-gray-100", widthClass, extra);
}

export function getRootStyle(width?: "full" | string) {
  if (!width || width === "full") return undefined;
  return { width };
}

export function getHeaderClasses(disabled?: boolean) {
  return cn(
    "sticky top-0 z-10 rounded-xl flex items-center gap-4 justify-between px-3 py-2 cursor-pointer select-none border border-gray-300 bg-white",
    "text-sm font-medium text-gray-800",
    disabled && "cursor-not-allowed opacity-60"
  );
}

export function getContentClasses(isOpen: boolean) {
  return cn("px-4 pb-3 pt-1 space-y-1.5", !isOpen && "hidden");
}
