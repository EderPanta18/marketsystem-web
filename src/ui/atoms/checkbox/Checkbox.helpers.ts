// ui/atoms/checkbox/Checkbox.helpers.ts

import { COLOR_TOKENS } from "@/ui/tokens";
import type {
  CheckboxSize,
  CheckboxColorScheme,
  CheckboxShape,
} from "./Checkbox.types";

const sizeClassesMap: Record<CheckboxSize, string> = {
  sm: "h-4 w-4 text-[10px]",
  md: "h-5 w-5 text-[11px]",
  lg: "h-6 w-6 text-xs",
};

export function getCheckboxSizeClasses(size: CheckboxSize) {
  return sizeClassesMap[size];
}

export function getCheckboxColorClasses(
  checked: boolean,
  colorScheme: CheckboxColorScheme
) {
  const tokens = COLOR_TOKENS[colorScheme].solid;
  if (!checked) {
    return "border-gray-400 bg-white text-transparent";
  }
  return `${tokens.bg} ${tokens.border} text-white`;
}

export function getCheckboxShapeClasses(shape: CheckboxShape) {
  return shape === "round" ? "rounded-full" : "rounded-md";
}
