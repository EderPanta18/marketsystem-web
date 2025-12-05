// ui/atoms/input/Input.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type { InputProps, InputSize, InputVariant } from "./Input.types";
import { getInputSizeClasses, getInputVariantClasses } from "./input.helpers";

export const Input: React.FC<InputProps> = ({
  fullWidth = false,
  leftIcon,
  rightIcon,
  size = "md",
  variant = "default",
  colorScheme = "primary",
  className,
  id,
  disabled,
  ...props
}) => {
  const inputId = id ?? React.useId();

  const hasLeftIcon = Boolean(leftIcon);
  const hasRightIcon = Boolean(rightIcon);

  const sizeClasses = getInputSizeClasses(size as InputSize);
  const variantClasses = getInputVariantClasses(
    variant as InputVariant,
    colorScheme
  );

  return (
    <div className={cn("relative", fullWidth && "w-full")}>
      {hasLeftIcon && (
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          {leftIcon}
        </span>
      )}

      <input
        id={inputId}
        className={cn(
          "w-full rounded-md outline-none transition-all duration-150",
          "placeholder:text-gray-400",
          "disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed",
          sizeClasses,
          variantClasses,
          hasLeftIcon && "pl-9",
          hasRightIcon && "pr-9",
          className
        )}
        disabled={disabled}
        {...props}
      />

      {hasRightIcon && (
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          {rightIcon}
        </span>
      )}
    </div>
  );
};

export default Input;
