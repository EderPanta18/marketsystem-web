// ui/atoms/input/input.helper.ts

import type { UIColorScheme } from "@/core/types";
import { COLOR_TOKENS } from "@/ui/tokens";
import type { InputVariant, InputSize } from "./Input.types";

const sizeClassesMap: Record<InputSize, string> = {
  sm: "h-8 px-2 text-xs",
  md: "h-9 px-3 text-sm",
  lg: "h-10 px-3.5 text-sm",
};

export function getInputSizeClasses(size: InputSize) {
  return sizeClassesMap[size];
}

export function getInputVariantClasses(
  variant: InputVariant,
  colorScheme: UIColorScheme
) {
  const border = COLOR_TOKENS[colorScheme].solid.border; // ej: "border-blue-600"
  const match = border.match(/^border-(.+)$/);
  const borderColor = match ? match[1] : "blue-500";

  const focusBorder = `focus:border-${borderColor}`;
  const focusRing = `focus:ring-2 focus:ring-${borderColor}/20`;

  switch (variant) {
    case "default":
      return ["border bg-white", "border-gray-500", focusBorder, focusRing];
    case "filled":
      return [
        "border bg-gray-50",
        "border-transparent",
        "focus:bg-white",
        focusBorder,
        focusRing,
      ];
    case "underline":
      return [
        "border-0 border-b rounded-none px-0 bg-transparent",
        "border-gray-300",
        focusBorder,
        "focus:ring-0",
      ];
  }
}
