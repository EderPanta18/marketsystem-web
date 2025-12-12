// ui/molecules/search-input/SearchInput.helpers.ts

import { cn } from "@/shared/utils";
import type { SearchInputSize } from "./SearchInput.types";

const sizeClassesMap: Record<SearchInputSize, string> = {
  sm: "h-8 text-xs",
  md: "h-9 text-sm",
  lg: "h-10 text-sm",
};

export function getSearchInputSizeClasses(size: SearchInputSize = "md") {
  return sizeClassesMap[size] ?? sizeClassesMap.md;
}

export function getSearchInputWrapperClasses(opts: {
  fullWidth?: boolean;
  className?: string;
}) {
  const { fullWidth, className } = opts;
  return cn(
    "relative inline-flex items-center",
    fullWidth && "w-full",
    className
  );
}

export function getSearchInputFieldClasses(opts: { inputClassName?: string }) {
  const { inputClassName } = opts;
  return cn("pl-9 pr-9", inputClassName);
}
