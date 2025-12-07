// ui/atoms/Switch/Switch.types.ts

import type { ChangeEvent, HTMLAttributes } from "react";
import type { UISize, UIColorScheme } from "@/core/types/ui.types";

export type SwitchSize = UISize;
export type SwitchColorScheme = Extract<
  UIColorScheme,
  "primary" | "success" | "danger" | "neutral"
>;

export interface SwitchProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  size?: SwitchSize;
  colorScheme?: SwitchColorScheme;
  disabled?: boolean;
  name?: string;
  id?: string;
}
