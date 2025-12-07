// ui/layouts/background-layout/BackgroundLayout.types.ts

import type { ReactNode, HTMLAttributes } from "react";

export type BackgroundLayoutMode = "full-screen" | "container";

export type BackgroundContentAlign =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type BackgroundOverlayVariant = "none" | "light" | "dark" | "custom";

export interface BackgroundLayoutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;

  imageSrc: string;
  imageAlt?: string;

  mode?: BackgroundLayoutMode;
  contentAlign?: BackgroundContentAlign;

  overlayVariant?: BackgroundOverlayVariant;
  overlayClassName?: string;

  wrapperClassName?: string;
  contentClassName?: string;
}
