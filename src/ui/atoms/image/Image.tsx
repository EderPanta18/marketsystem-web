// ui/atoms/Image/Image.tsx

"use client";

import React from "react";
import NextImage from "next/image";
import { cn } from "@/shared/utils";
import type { ImageProps } from "./Image.types";
import { getImageClassName, getSkeletonClassName } from "./Image.helpers";

export const Image: React.FC<ImageProps> = ({
  rounded = "md",
  fit = "cover",
  fullSize = false,
  showSkeleton = false,
  skeletonVariant = "pulse",
  wrapperClassName,
  className,
  onLoad,
  ...props
}) => {
  const [loaded, setLoaded] = React.useState(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const imageClassName = getImageClassName(rounded, fit, className);
  const skeletonClassName = getSkeletonClassName(skeletonVariant, rounded);

  const isSkeletonVisible = showSkeleton && !loaded;

  const wrapperClasses = cn(
    fullSize && "relative w-full h-full",
    !fullSize && "inline-block",
    wrapperClassName
  );

  return (
    <div className={wrapperClasses}>
      {isSkeletonVisible && (
        <div className={cn("absolute inset-0", skeletonClassName)} />
      )}

      <NextImage
        fill={fullSize}
        className={imageClassName}
        onLoad={handleLoad}
        {...props}
      />
    </div>
  );
};

export default Image;
