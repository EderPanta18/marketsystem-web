// src/ui/atoms/link/Link.tsx

import NextLink from "next/link";
import { cn } from "@/shared/utils";
import type {
  LinkProps,
  LinkSize,
  LinkColorScheme,
  LinkVariant,
} from "./Link.types";
import {
  linkBaseClasses,
  getLinkSizeClasses,
  getLinkColorClasses,
  getLinkUnderlineClasses,
} from "./Link.helpers";

export const Link: React.FC<LinkProps> = ({
  children,
  leftIcon,
  rightIcon,
  size = "md",
  colorScheme = "primary",
  variant = "subtle",
  underline = "hover",
  fullWidth = false,
  active = false,
  disabled = false,
  className,
  href,
  ...props
}) => {
  const sizeClasses = getLinkSizeClasses(size as LinkSize);
  const colorClasses = getLinkColorClasses(
    colorScheme as LinkColorScheme,
    variant as LinkVariant
  );
  const underlineClasses = getLinkUnderlineClasses(underline);

  const baseClasses = cn(
    linkBaseClasses,
    sizeClasses,
    colorClasses,
    underlineClasses,
    fullWidth && "w-full",
    active && "font-semibold",
    disabled && [
      "opacity-60 cursor-not-allowed pointer-events-none",
      "hover:bg-transparent active:bg-transparent",
    ],
    className
  );

  if (disabled) {
    return (
      <span className={baseClasses} aria-disabled="true">
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="truncate">{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    );
  }

  return (
    <NextLink href={href} className={baseClasses} {...props}>
      {leftIcon && <span className="shrink-0 pr-2">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {rightIcon && <span className="shrink-0 pl-2">{rightIcon}</span>}
    </NextLink>
  );
};

export default Link;
