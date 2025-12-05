// ui/atoms/badge/Badge.helpers.ts

import type { BadgeSize, BadgeColorScheme, BadgeVariant } from "./Badge.types";
import { getColorVariantBaseClasses } from "@/ui/tokens";

const sizeClassesMap: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-[11px]",
  md: "h-6 px-2.5 text-xs",
  lg: "h-7 px-3 text-sm",
};

export function getBadgeSizeClasses(size: BadgeSize): string {
  return sizeClassesMap[size];
}

export function getBadgeColorClasses(
  colorScheme: BadgeColorScheme,
  variant: BadgeVariant
): string[] {
  return getColorVariantBaseClasses(colorScheme, variant);
}
