// ui/atoms/switch/Switch.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type {
  SwitchProps,
  SwitchSize,
  SwitchColorScheme,
} from "./Switch.types";
import {
  trackSizeClasses,
  thumbSizeClasses,
  thumbTranslateClasses,
  getSwitchTrackClasses,
} from "./Switch.helpers";

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  size = "md",
  colorScheme = "primary",
  disabled = false,
  className,
  name,
  id,
  ...props
}) => {
  const inputId = id ?? React.useId();

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (onChange) {
      const syntheticEvent = {
        ...event,
        target: { checked } as any,
      } as any;
      onChange(!checked, syntheticEvent);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
        trackSizeClasses[size as SwitchSize],
        getSwitchTrackClasses(checked, colorScheme as SwitchColorScheme),
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
      onClick={handleToggle}
      {...props}
    >
      <span className="sr-only">{name}</span>
      <span
        className={cn(
          "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          thumbSizeClasses[size as SwitchSize],
          checked ? thumbTranslateClasses[size as SwitchSize] : "translate-x-0"
        )}
      />
      <input
        id={inputId}
        name={name}
        type="checkbox"
        className="hidden"
        checked={checked}
        readOnly
      />
    </button>
  );
};

export default Switch;
