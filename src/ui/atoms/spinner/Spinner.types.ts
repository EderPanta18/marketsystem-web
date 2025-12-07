// ui/atoms/Spinner/Spinner.types.ts

import type { HTMLAttributes } from "react";
import type { UIColorScheme, UISize } from "@/core/types";

export type SpinnerSize = UISize | "xl" | "2xl" | "3xl" | "5xl";
export type SpinnerColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "neutral"
>;

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  colorScheme?: SpinnerColorScheme;
  label?: string;
  showLabel?: boolean;
}
