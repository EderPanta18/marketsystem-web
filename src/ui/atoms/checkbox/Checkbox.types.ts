// ui/atoms/checkbox/Checkbox.types.ts

import type { InputHTMLAttributes } from "react";
import type { UIColorScheme, UISize } from "@/core/types";

export type CheckboxSize = Extract<UISize, "sm" | "md" | "lg">;
export type CheckboxColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "success" | "danger" | "neutral"
>;

export type CheckboxShape = "square" | "round";
export type CheckboxIconVariant = "check" | "none";

type NativeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
>;

export interface CheckboxBaseProps {
  label?: string;
  helperText?: string;
  error?: string;
  size?: CheckboxSize;
  colorScheme?: CheckboxColorScheme;
  shape?: CheckboxShape;
  iconVariant?: CheckboxIconVariant;
  fullWidth?: boolean;
}

export type CheckboxProps = NativeCheckboxProps & CheckboxBaseProps;
