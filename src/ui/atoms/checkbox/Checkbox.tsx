// ui/atoms/checkbox/Checkbox.tsx

"use client";

import { useId, useState } from "react";
import { cn } from "@/shared/utils";
import type {
  CheckboxProps,
  CheckboxSize,
  CheckboxColorScheme,
  CheckboxShape,
} from "./Checkbox.types";
import {
  getCheckboxColorClasses,
  getCheckboxShapeClasses,
  getCheckboxSizeClasses,
} from "./Checkbox.helpers";

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  helperText,
  error,
  size = "md",
  colorScheme = "primary",
  shape = "square",
  iconVariant = "check",
  fullWidth = false,
  className,
  checked,
  defaultChecked,
  disabled,
  ...props
}) => {
  const inputId = id ?? useId();
  const hasError = Boolean(error);
  const isControlled = checked !== undefined;

  const [internalChecked, setInternalChecked] = useState(
    defaultChecked ?? false
  );

  const effectiveChecked = isControlled ? checked! : internalChecked;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    props.onChange?.(e);
  };

  const sizeClasses = getCheckboxSizeClasses(size as CheckboxSize);
  const colorClasses = getCheckboxColorClasses(
    effectiveChecked,
    colorScheme as CheckboxColorScheme
  );
  const shapeClasses = getCheckboxShapeClasses(shape as CheckboxShape);

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "inline-flex items-start gap-2 cursor-pointer select-none",
        disabled && "cursor-not-allowed opacity-60",
        fullWidth && "w-full"
      )}
    >
      <span className="relative flex items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          {...props}
        />

        <span
          className={cn(
            "inline-flex items-center justify-center border transition-colors duration-150",
            sizeClasses,
            shapeClasses,
            colorClasses,
            "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/60"
          )}
          aria-hidden="true"
        >
          {iconVariant === "check" && (
            <span
              className={cn(
                "leading-none transition-opacity",
                !effectiveChecked && "opacity-0"
              )}
            >
              ✓
            </span>
          )}
          {iconVariant === "none" && null}
        </span>
      </span>

      {(label || helperText || hasError) && (
        <span className={cn("flex flex-col text-wrap", fullWidth && "flex-1")}>
          {label && (
            <span className="text-sm text-gray-900 leading-tight">{label}</span>
          )}
          {helperText && !hasError && (
            <span className="text-xs text-gray-500 mt-0.5">{helperText}</span>
          )}
          {hasError && (
            <span className="text-xs text-red-600 mt-0.5">{error}</span>
          )}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
