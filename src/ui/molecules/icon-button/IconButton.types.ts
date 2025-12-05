// ui/molecules/iconButton/IconButton.types.ts

import type { ButtonHTMLAttributes, ReactNode } from "react";
import type {
  ButtonColorScheme,
  ButtonSize,
  ButtonStyleVariant,
} from "@/ui/atoms/button";
import type { IconName } from "@/ui/atoms/icon";

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  icon: IconName | ReactNode;
  size?: ButtonSize;
  colorScheme?: ButtonColorScheme;
  variant?: ButtonStyleVariant;
  "aria-label": string;
}
