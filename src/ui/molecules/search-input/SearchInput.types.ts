// ui/molecules/search-input/SearchInput.types.ts

import type { InputHTMLAttributes, ReactNode } from "react";
import type { UIColorScheme, UISize } from "@/core/types/ui.types";

export type SearchInputSize = UISize;
export type SearchInputColorScheme = Extract<
  UIColorScheme,
  "primary" | "secondary" | "neutral"
>;

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  value: string;
  onChangeValue: (value: string) => void;

  size?: SearchInputSize;

  placeholder?: string;
  fullWidth?: boolean;

  showSearchIcon?: boolean;
  searchIcon?: ReactNode;

  showClearButton?: boolean;

  debounceMs?: number;

  className?: string;
  inputClassName?: string;
}
