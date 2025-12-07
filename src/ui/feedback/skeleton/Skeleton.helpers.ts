// ui/feedback/skeleton/Skeleton.helpers.ts

import { cn } from "@/shared/utils";
import type { SkeletonVariant } from "./Skeleton.types";

export function getSkeletonBaseClasses(variant: SkeletonVariant) {
  const base = "bg-gray-200/70 animate-pulse";
  if (variant === "circle") {
    return cn(base, "rounded-full");
  }
  if (variant === "rect") {
    return cn(base, "rounded-md");
  }
  // text: pill fino
  return cn(base, "rounded-full h-3");
}

export function parseSize(value?: string | number): string | undefined {
  if (value === undefined) return;
  if (typeof value === "number") return `${value}px`;
  return value;
}
