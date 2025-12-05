// ui/layouts/form-layout/FormLayout.tsx

import * as React from "react";
import { cn } from "@/shared/utils";
import type { FormLayoutProps } from "./FormLayout.types";
import {
  getFormLayoutContainerClasses,
  getFormLayoutGridClasses,
} from "./FormLayout.helpers";

export const FormLayout: React.FC<FormLayoutProps> = ({
  headerTitle,
  headerDescription,
  variant = "boxed",
  columns = 1,
  showRequiredLegend = false,
  requiredLabel = "Los campos marcados con * son obligatorios.",
  errorMessage,
  successMessage,
  actions,
  secondaryActions,
  children,
  className,
  ...props
}) => {
  const containerClasses = getFormLayoutContainerClasses(variant);
  const gridClasses = getFormLayoutGridClasses(columns);

  const hasHeader = headerTitle || headerDescription || showRequiredLegend;
  const hasMessages = errorMessage || successMessage;
  const hasFooter = actions || secondaryActions || hasMessages;

  return (
    <form className={cn(containerClasses, className)} {...props}>
      {hasHeader && (
        <header className="mb-6 text-center">
          {headerTitle && (
            <div className="text-lg font-semibold text-gray-900">
              {headerTitle}
            </div>
          )}
          {headerDescription && (
            <p className="mt-1 text-sm text-gray-600">{headerDescription}</p>
          )}
          {showRequiredLegend && (
            <p className="mt-2 text-xs text-gray-500">{requiredLabel}</p>
          )}
        </header>
      )}

      <section className={gridClasses}>{children}</section>

      {hasFooter && (
        <footer className="mt-6 space-y-3 flex flex-col place-items-center">
          {hasMessages && (
            <div className="text-sm">
              {errorMessage && <p className="text-red-600">{errorMessage}</p>}
              {successMessage && !errorMessage && (
                <p className="text-green-600">{successMessage}</p>
              )}
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {secondaryActions && (
              <div className="flex items-center gap-2">{secondaryActions}</div>
            )}
            {actions && (
              <div className="w-full sm:w-auto flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </footer>
      )}
    </form>
  );
};

export default FormLayout;
