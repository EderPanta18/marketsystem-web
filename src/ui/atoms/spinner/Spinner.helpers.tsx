// ui/atoms/spinner/Spinner.helpers.ts

import { COLOR_TOKENS } from "@/ui/tokens";
import type { SpinnerSize, SpinnerColorScheme } from "./Spinner.types";

const SIZE_TO_PIXELS: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
  "2xl": 56,
  "3xl": 72,
  "5xl": 96,
};

export function getSpinnerSizePx(size: SpinnerSize): number {
  return SIZE_TO_PIXELS[size];
}

export function getSpinnerColorClass(colorScheme: SpinnerColorScheme): string {
  const solidBg = COLOR_TOKENS[colorScheme].solid.bg; // ej: bg-blue-600
  return solidBg.replace("bg-", "text-");
}

export function getSpinnerLabelFontSize(sizePx: number): string {
  const px = Math.max(10, Math.min(sizePx * 0.25, 22));
  return `${px}px`;
}
