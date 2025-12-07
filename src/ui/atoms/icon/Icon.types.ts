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
  | "chevron-right";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: IconSize;
  colorScheme?: IconColorScheme;
}
