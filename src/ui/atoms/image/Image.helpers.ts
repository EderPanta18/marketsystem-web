// ui/atoms/Image/Image.helpers.ts

import { cn } from "@/shared/utils";
import type {
  ImageRounded,
  ImageFit,
  ImageSkeletonVariant,
} from "./Image.types";

export const roundedClassMap: Record<ImageRounded, string> = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const fitClassMap: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

export function getImageClassName(
  rounded: ImageRounded,
  fit: ImageFit,
  className?: string
) {
  return cn(fitClassMap[fit], roundedClassMap[rounded], className);
}

export function getSkeletonClassName(
  variant: ImageSkeletonVariant,
  rounded: ImageRounded
) {
  if (variant === "none") return "hidden";

  const base = "w-full h-full";
  const roundedClass = roundedClassMap[rounded];

  if (variant === "solid") {
    return cn(base, roundedClass, "bg-gray-200");
  }

  // pulse
  return cn(base, roundedClass, "bg-gray-200 animate-pulse");
}
