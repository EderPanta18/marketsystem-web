// ui/molecules/search-input/SearchInput.tsx

"use client";

import React from "react";
import { cn } from "@/shared/utils";
import { Input, Icon } from "@/ui/atoms";
import {
  getSearchInputFieldClasses,
  getSearchInputSizeClasses,
  getSearchInputWrapperClasses,
} from "./SearchInput.helpers";
import type { SearchInputProps } from "./SearchInput.types";
import { IconButton } from "../icon-button";

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeValue,
  size = "md",
  placeholder = "Buscar...",
  fullWidth = true,
  showSearchIcon = true,
  searchIcon,
  showClearButton = true,
  debounceMs = 0,
  className,
  inputClassName,
  disabled,
  ...rest
}) => {
  const [internal, setInternal] = React.useState(value);

  React.useEffect(() => {
    setInternal(value);
  }, [value]);

  React.useEffect(() => {
    if (!debounceMs) return;
    const handle = setTimeout(() => {
      if (internal !== value) onChangeValue(internal);
    }, debounceMs);
    return () => clearTimeout(handle);
  }, [debounceMs, internal, onChangeValue, value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const next = e.target.value;
    setInternal(next);
    if (!debounceMs) onChangeValue(next);
  };

  const handleClear = () => {
    setInternal("");
    onChangeValue("");
  };

  const hasValue = internal.trim().length > 0;

  const wrapperClasses = getSearchInputWrapperClasses({ fullWidth, className });
  const sizeClasses = getSearchInputSizeClasses(size);
  const fieldClasses = getSearchInputFieldClasses({ inputClassName });

  return (
    <div className={wrapperClasses}>
      <Input
        value={internal}
        onChange={handleChange}
        placeholder={placeholder}
        fullWidth={fullWidth}
        size={size}
        colorScheme="neutral"
        className={cn(
          sizeClasses,
          fieldClasses,
          "focus:ring-1 focus:ring-gray-400"
        )}
        disabled={disabled}
        leftIcon={
          showSearchIcon
            ? searchIcon ?? (
                <Icon name="search" aria-label="Buscar" size={size} />
              )
            : undefined
        }
        rightIcon={
          showClearButton && hasValue && !disabled ? (
            <IconButton
              icon="clean"
              aria-label="Limpiar"
              type="button"
              onClick={handleClear}
              colorScheme="neutral"
              variant="ghost"
            />
          ) : undefined
        }
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
