// ui/molecules/option-group-filter/OptionGroupFilter.types.ts

export type OptionGroupFilterWidth = "full" | string; // "full" | "320px" | "20rem"...

export interface OptionGroupItem {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
}

export interface OptionGroupFilterProps {
  label: string;
  options: OptionGroupItem[];
  values: string[];
  onChange: (values: string[]) => void;
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
  defaultOpen?: boolean;
  width?: OptionGroupFilterWidth;
}
