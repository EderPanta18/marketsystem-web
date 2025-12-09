// ui/atoms/Badge/Badge.tsx

import { cn } from "@/shared/utils";
import type {
  BadgeProps,
  BadgeSize,
  BadgeColorScheme,
  BadgeVariant,
} from "./Badge.types";
import { getBadgeSizeClasses, getBadgeColorClasses } from "./Badge.helpers";

export const Badge: React.FC<BadgeProps> = ({
  children,
  size = "md",
  colorScheme = "neutral",
  variant = "subtle",
  leftIcon,
  rightIcon,
  className,
  ...props
}) => {
  const sizeClasses = getBadgeSizeClasses(size as BadgeSize);
  const colorClasses = getBadgeColorClasses(
    colorScheme as BadgeColorScheme,
    variant as BadgeVariant
  );

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium align-middle",
        sizeClasses,
        colorClasses,
        className
      )}
      {...props}
    >
      {leftIcon && (
        <span className="mr-1 inline-flex items-center">{leftIcon}</span>
      )}
      <span className="inline-flex items-center">{children}</span>
      {rightIcon && (
        <span className="ml-1 inline-flex items-center">{rightIcon}</span>
      )}
    </span>
  );
};

export default Badge;
