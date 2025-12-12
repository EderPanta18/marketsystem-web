// ui/molecules/Modal/Modal.helper.ts

import { getColorVariantBaseClasses } from "@/ui/tokens";
import {
  extractBgColorClass,
  extractBorderColorClass,
  extractTextColorClass,
} from "@/ui/tokens";
import type { ModalColorScheme, ModalVariant, ModalSize } from "./Modal.types";

export const modalWidthClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function getModalStyleClasses(
  colorScheme: ModalColorScheme,
  variant: ModalVariant
) {
  const baseClasses = getColorVariantBaseClasses(colorScheme, variant);

  const containerBg = extractBgColorClass(baseClasses, "bg-white");
  const containerBorder = extractBorderColorClass(
    baseClasses,
    "border-gray-200"
  );
  const textColor = extractTextColorClass(baseClasses, "text-gray-900");

  return {
    container: `${containerBg} ${containerBorder}`,
    headerBorder: containerBorder,
    title: textColor,
    subtitle: "text-gray-500",
  };
}
