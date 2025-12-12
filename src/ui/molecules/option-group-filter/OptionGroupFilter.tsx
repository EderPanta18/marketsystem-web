// ui/molecules/option-group-filter/OptionGroupFilter.tsx

"use client";

import { useState } from "react";
import { cn } from "@/shared/utils";
import { Icon, Checkbox, Button } from "@/ui/atoms";
import type {
  OptionGroupFilterProps,
  OptionGroupItem,
} from "./OptionGroupFilter.types";
import {
  getRootClasses,
  getHeaderClasses,
  getContentClasses,
  getRootStyle,
} from "./OptionGroupFilter.helpers";

export const OptionGroupFilter: React.FC<OptionGroupFilterProps> = ({
  label,
  options,
  values,
  onChange,
  className,
  disabled = false,
  multiple = true,
  defaultOpen = true,
  width = "full",
}) => {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggleOpen = () => {
    if (disabled) return;
    setOpen((prev) => !prev);
  };

  const toggleValue = (option: OptionGroupItem) => {
    if (disabled || option.disabled) return;

    if (!multiple) {
      const next = values.includes(option.value) ? [] : [option.value];
      onChange(next);
      return;
    }

    const exists = values.includes(option.value);
    const next = exists
      ? values.filter((v) => v !== option.value)
      : [...values, option.value];

    onChange(next);
  };

  const handleClear = () => {
    if (disabled || values.length === 0) return;
    onChange([]);
  };

  return (
    <div
      className={getRootClasses(className, width)}
      style={getRootStyle(width)}
    >
      <div className={getHeaderClasses(disabled)} aria-disabled={disabled}>
        <button
          type="button"
          onClick={handleToggleOpen}
          className="flex items-center gap-2 flex-1 text-left"
          disabled={disabled}
        >
          <span>{label}</span>
          <Icon
            name={open ? "chevron-up" : "chevron-down"}
            size="sm"
            colorScheme="neutral"
          />
        </button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          colorScheme="neutral"
          onClick={handleClear}
          disabled={disabled || values.length === 0}
        >
          Limpiar
        </Button>
      </div>

      <div className={getContentClasses(open)}>
        {options.map((option) => {
          const checked = values.includes(option.value);
          const optionDisabled = disabled || option.disabled;

          const handleToggle = () => toggleValue(option);

          return (
            <div
              key={option.id}
              className={cn(
                "w-full flex items-center gap-3 py-1",
                optionDisabled && "opacity-60 cursor-not-allowed"
              )}
            >
              <Checkbox
                checked={checked}
                onChange={handleToggle}
                size="md"
                shape="round"
                iconVariant="none"
                colorScheme="primary"
                aria-label={option.label}
                disabled={optionDisabled}
              />
              <span
                className="select-none text-sm text-gray-900 w-full cursor-pointer"
                onClick={optionDisabled ? undefined : handleToggle}
              >
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionGroupFilter;
