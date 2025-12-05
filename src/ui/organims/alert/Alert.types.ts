// ui/molecules/Alert/Alert.types.ts

import type { HTMLAttributes, ReactNode } from "react";
import type { UIColorScheme, UISize, UIVariant } from "@/core/types";

export type AlertSize = UISize;

export type AlertVariant = Extract<
  UIVariant,
  "solid" | "subtle" | "ghost" | "outline"
>;
export type AlertStatus = "info" | "success" | "warning" | "error";

// opcional: para alinear con tokens globales
export type AlertColorScheme = Extract<
  UIColorScheme,
  "primary" | "success" | "warning" | "danger" | "neutral"
>;

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus; // semantic (info/success/...)
  variant?: AlertVariant; // visual style (solid/subtle/outline)
  colorScheme?: AlertColorScheme;
  size?: AlertSize;
  title?: string;
  description?: ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  onClose?: () => void;
}
