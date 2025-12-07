// ui/feedback/skeleton/Skeleton.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type { SkeletonProps, SkeletonVariant } from "./Skeleton.types";
import { getSkeletonBaseClasses, parseSize } from "./Skeleton.helpers";

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "rect",
  width,
  height,
  rounded,
  lines = 1,
  className,
  ...props
}) => {
  const baseClasses = getSkeletonBaseClasses(variant as SkeletonVariant);

  // múltiple líneas para texto
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, idx) => (
          <div
            key={idx}
            className={cn(baseClasses, rounded)}
            style={{
              width: parseSize(width) ?? "100%",
              height: parseSize(height) ?? "0.75rem",
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, rounded, className)}
      style={{
        width: parseSize(width),
        height: parseSize(height),
      }}
      {...props}
    />
  );
};

export default Skeleton;
