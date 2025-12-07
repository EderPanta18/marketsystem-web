// ui/layouts/background-layout/BackgroundLayout.helpers.ts

import { cn } from "@/shared/utils";
import type {
  BackgroundLayoutMode,
  BackgroundContentAlign,
  BackgroundOverlayVariant,
} from "./BackgroundLayout.types";

export function getWrapperClasses(mode: BackgroundLayoutMode, extra?: string) {
  const base =
    mode === "full-screen"
      ? "relative min-h-screen w-full"
      : "relative w-full h-full";
  return cn(base, extra);
}

export function getContentWrapperClasses(
  mode: BackgroundLayoutMode,
  align: BackgroundContentAlign,
  extra?: string
) {
  const flexBase =
    mode === "full-screen" ? "flex min-h-screen w-full" : "flex w-full h-full";

  const alignMap: Record<BackgroundContentAlign, string> = {
    center: "items-center justify-center",
    top: "items-start justify-center",
    bottom: "items-end justify-center",
    left: "items-center justify-start",
    right: "items-center justify-end",
    "top-left": "items-start justify-start",
    "top-right": "items-start justify-end",
    "bottom-left": "items-end justify-start",
    "bottom-right": "items-end justify-end",
  };

  return cn(flexBase, alignMap[align], extra);
}

export function getOverlayClasses(
  variant: BackgroundOverlayVariant,
  extra?: string
) {
  if (variant === "none") return "hidden";

  const base = "absolute inset-0";

  if (variant === "light") {
    return cn(base, "bg-white/30", extra);
  }

  if (variant === "dark") {
    return cn(base, "bg-black/40", extra);
  }

  return cn(base, extra);
}
