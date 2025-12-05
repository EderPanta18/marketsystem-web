// ui/feedback/skeleton/Skeleton.types.ts

import type { HTMLAttributes } from "react";

export type SkeletonVariant = "text" | "rect" | "circle";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  rounded?: string;
  lines?: number;
}
