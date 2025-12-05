// core/types/ui.types.ts

export type UISize = "sm" | "md" | "lg";

export type UIColorScheme =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "neutral";

export type UIVariant = "solid" | "outline" | "ghost" | "subtle";
export interface UIColorTokens {
  solid: {
    bg: string;
    bgHover: string;
    bgActive: string;
    text: string;
    border: string;
  };
  outline: {
    text: string;
    border: string;
    bgHover: string;
    bgActive: string;
  };
  ghost: {
    text: string;
    bgHover: string;
    bgActive: string;
  };
  subtle: {
    bg: string;
    text: string;
    border: string;
  };
}
