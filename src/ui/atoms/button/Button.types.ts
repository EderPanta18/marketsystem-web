// ui/atoms/button/Button.types.ts

import type { ButtonHTMLAttributes } from "react";
import type { UISize, UIColorScheme, UIVariant } from "@/core/types";

export type ButtonSize = UISize;
export type ButtonColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "danger" | "success" | "warning" | "neutral"
>;
export type ButtonStyleVariant = Extract<
  UIVariant,
  "solid" | "outline" | "ghost" | "subtle"
>;

// Omitimos size nativo (que es number)
type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size">;

export interface ButtonBaseProps {
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  variant?: ButtonStyleVariant;
  fullWidth?: boolean;
  loading?: boolean;
}

export type ButtonProps = NativeButtonProps & ButtonBaseProps;
