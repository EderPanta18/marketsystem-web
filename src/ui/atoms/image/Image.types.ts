// ui/atoms/Image/Image.types.ts

import type { ImageProps as NextImageProps } from "next/image";

export type ImageRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";
export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageSkeletonVariant = "none" | "solid" | "pulse";

export interface ImageProps extends Omit<NextImageProps, "fill"> {
  rounded?: ImageRounded;
  fit?: ImageFit;
  fullSize?: boolean;
  showSkeleton?: boolean;
  skeletonVariant?: ImageSkeletonVariant;
  wrapperClassName?: string;
}
