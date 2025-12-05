// ui/atoms/button/Button.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type {
  ButtonProps,
  ButtonSize,
  ButtonColorScheme,
  ButtonStyleVariant,
} from "./Button.types";
import {
  buttonBaseClasses,
  getButtonSizeClasses,
  getButtonColorClasses,
} from "./Button.helpers";

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  colorScheme = "primary",
  variant = "solid",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const sizeClasses = getButtonSizeClasses(size as ButtonSize);
  const colorClasses = getButtonColorClasses(
    colorScheme as ButtonColorScheme,
    variant as ButtonStyleVariant
  );

  return (
    <button
      className={cn(
        buttonBaseClasses,
        sizeClasses,
        colorClasses,
        variant === "solid" && "shadow-sm hover:shadow-md",
        fullWidth && "w-full",
        isDisabled && "opacity-60",
        loading && "cursor-wait",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      <span className="inline-flex items-center gap-1">{children}</span>
    </button>
  );
};

export default Button;
