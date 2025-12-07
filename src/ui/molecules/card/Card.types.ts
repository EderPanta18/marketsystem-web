// ui/molecules/card/Card.types.ts

import type { HTMLAttributes, ReactNode } from "react";
import type { UIColorScheme, UISize, UIVariant } from "@/core/types";

export type CardSize = UISize; // sm | md | lg

export type CardVariant = Extract<UIVariant, "outline" | "subtle"> | "elevated";

export type CardColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "neutral"
>;

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  headerExtra?: ReactNode;
  footer?: ReactNode;
  colorScheme?: CardColorScheme;
  size?: CardSize;
  variant?: CardVariant;
}
