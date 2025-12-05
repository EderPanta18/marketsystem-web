// ui/atoms/badge/Badge.types.ts

import type { HTMLAttributes, ReactNode } from "react";
import type { UISize, UIColorScheme, UIVariant } from "@/core/types";

export type BadgeSize = UISize;
export type BadgeColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "danger" | "success" | "warning" | "neutral"
>;
export type BadgeVariant = Extract<
  UIVariant,
  "solid" | "outline" | "ghost" | "subtle"
>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  colorScheme?: BadgeColorScheme;
  variant?: BadgeVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
