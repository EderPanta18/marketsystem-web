// ui/molecules/Modal/Modal.types.ts

import type { HTMLAttributes, ReactNode } from "react";
import type { UIColorScheme, UISize, UIVariant } from "@/core/types";

export type ModalSize = UISize;
export type ModalVariant = Extract<UIVariant, "subtle" | "outline">;

export type ModalColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "neutral"
>;

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  title?: string;
  description?: string;
  showClose?: boolean;
  onClose?: () => void;
  size?: ModalSize;
  colorScheme?: ModalColorScheme;
  variant?: ModalVariant;
  headerExtra?: ReactNode;
}
