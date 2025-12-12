// ui/atoms/icon/Icon.types.ts

import type { SVGProps } from "react";
import type { UISize, UIColorScheme } from "@/core/types";

export type IconSize = UISize;
export type IconColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "danger" | "success" | "warning" | "neutral"
>;

// Ajusta esta unión según los íconos que uses realmente
export type IconName =
  | "search"
  | "user"
  | "email"
  | "lock"
  | "eye"
  | "eye-off"
  | "alert"
  | "check"
  | "x"
  | "loader"
  | "info"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "send"
  | "bell"
  | "layout-dashboard"
  | "building-2"
  | "grid-2x2"
  | "store"
  | "bar-chart-2"
  | "receipt"
  | "users"
  | "settings"
  | "log-out"
  | "menu"
  | "clean";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  colorScheme?: IconColorScheme;
}
