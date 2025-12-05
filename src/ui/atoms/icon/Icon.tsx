// ui/atoms/icon/Icon.tsx

import React from "react";
import { cn } from "@/shared/utils";
import { ICONS_MAP } from "./icons-map";
import type {
  IconProps,
  IconName,
  IconSize,
  IconColorScheme,
} from "./Icon.types";
import { getIconSizeClasses, getIconColorClass } from "./Icon.helpers";

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  colorScheme = "neutral",
  className,
  ...props
}) => {
  const Component = ICONS_MAP[name as IconName];
  if (!Component) return null;

  const sizeClass = getIconSizeClasses(size as IconSize);
  const colorClass = getIconColorClass(colorScheme as IconColorScheme);

  return (
    <Component
      className={cn(sizeClass, colorClass, className)}
      stroke="currentColor"
      fill="none"
      aria-hidden="true"
      {...props}
    />
  );
};

export default Icon;
