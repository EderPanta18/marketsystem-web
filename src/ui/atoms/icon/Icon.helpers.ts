// ui/atoms/icon/Icon.helpers.ts

import type { IconSize, IconColorScheme } from "./Icon.types";

export const iconSizeClasses: Record<IconSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconColorClasses: Record<IconColorScheme, string> = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  danger: "text-red-600",
  success: "text-green-600",
  warning: "text-amber-500",
  neutral: "text-gray-800",
};

export function getIconSizeClasses(size: IconSize): string {
  return iconSizeClasses[size];
}

export function getIconColorClass(colorScheme: IconColorScheme): string {
  return iconColorClasses[colorScheme] ?? "text-gray-800";
}
