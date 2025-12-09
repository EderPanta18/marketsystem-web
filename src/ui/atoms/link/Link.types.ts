// ui/atoms/link/Link.types.ts

import type { ReactNode } from "react";
import type { LinkProps as NextLinkProps } from "next/link";
import type { UISize, UIColorScheme, UIVariant } from "@/core/types";

export type LinkSize = UISize;
export type LinkColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "neutral"
>;
export type LinkVariant = Extract<UIVariant, "solid" | "outline" | "subtle">;

export type LinkUnderline = "none" | "hover" | "always";

export interface LinkStyleProps {
  size?: UISize;
  colorScheme?: UIColorScheme;
  variant?: UIVariant;
  underline?: LinkUnderline;
  fullWidth?: boolean;
  active?: boolean;
  disabled?: boolean;
}

export interface LinkContentProps {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export type LinkProps = LinkStyleProps &
  LinkContentProps &
  Omit<NextLinkProps, "href" | "as"> & {
    href: string;
    className?: string;
  };
