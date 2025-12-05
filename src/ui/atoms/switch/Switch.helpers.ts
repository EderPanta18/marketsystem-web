// ui/atoms/switch/Switch.helpers.ts

import { cn } from "@/shared/utils";
import { COLOR_TOKENS } from "@/ui/tokens";
import type { SwitchSize, SwitchColorScheme } from "./Switch.types";

export const trackSizeClasses: Record<SwitchSize, string> = {
  sm: "w-9 h-5",
  md: "w-11 h-6",
  lg: "w-14 h-7",
};

export const thumbSizeClasses: Record<SwitchSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const thumbTranslateClasses: Record<SwitchSize, string> = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-7",
};

export function getSwitchTrackClasses(
  checked: boolean,
  colorScheme: SwitchColorScheme
): string {
  if (!checked) {
    return "bg-gray-200";
  }

  const t = COLOR_TOKENS[colorScheme].solid;
  return cn(t.bg, t.bgHover, t.bgActive, t.border);
}
