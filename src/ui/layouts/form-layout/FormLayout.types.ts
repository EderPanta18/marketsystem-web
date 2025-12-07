// ui/layouts/form-layout/FormLayout.types.ts

import type { HTMLAttributes, ReactNode } from "react";

export type FormLayoutVariant = "default" | "boxed";

export interface FormLayoutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  headerTitle?: ReactNode;
  headerDescription?: ReactNode;

  variant?: FormLayoutVariant;
  columns?: number;

  showRequiredLegend?: boolean;
  requiredLabel?: string;

  errorMessage?: string;
  successMessage?: string;

  actions?: ReactNode;
  secondaryActions?: ReactNode;

  children: ReactNode;
}
