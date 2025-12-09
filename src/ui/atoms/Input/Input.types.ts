// ui/atoms/input/Input.types.ts

import type { InputHTMLAttributes, ReactNode } from "react";
import type { UIColorScheme, UISize } from "@/core/types/ui.types";

export type InputSize = UISize;
export type InputVariant = "default" | "filled" | "underline";
export type InputColorScheme = Extract<UIColorScheme, "primary" | "secondary">;

// Omitimos el size nativo del input
type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputBaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: InputSize;
  variant?: InputVariant;
  colorScheme?: InputColorScheme;
}

export type InputProps = NativeInputProps & InputBaseProps;
