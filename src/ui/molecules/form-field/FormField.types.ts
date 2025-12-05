// ui/molecules/formField/FormField.types.ts

import type { ReactNode } from "react";

export type FormFieldLayout = "vertical" | "inline";

export interface FormFieldProps {
  id?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;

  // control de visibilidad de partes
  showLabel?: boolean;
  showAsterisk?: boolean;
  showDescription?: boolean;
  showError?: boolean;

  layout?: FormFieldLayout; // "vertical" | "inline"
  labelWidth?: string; // ej: "w-40", "w-48"

  children: ReactNode; // suele ser <Input />, <Switch />, etc.
}
