// ui/atoms/button/Button.helpers.ts

import { getColorVariantInteractiveClasses } from "@/ui/tokens";
import type {
  ButtonSize,
  ButtonColorScheme,
  ButtonStyleVariant,
} from "./Button.types";

export const buttonBaseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg border border-transparent transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed hover:cursor-pointer";

const sizeClassesMap: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-10 px-5 text-sm",
};

export function getButtonSizeClasses(size: ButtonSize): string {
  return sizeClassesMap[size];
}

export function getButtonColorClasses(
  colorScheme: ButtonColorScheme,
  variant: ButtonStyleVariant
): string[] {
  return getColorVariantInteractiveClasses(colorScheme, variant);
}
