// ui/layouts/form-layout/FormLayout.tsx

import React from "react";
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
  children,
  className,
  ...props
}) => {
  const containerClasses = getFormLayoutContainerClasses(variant);
  const gridClasses = getFormLayoutGridClasses(columns);

  const hasHeader = headerTitle || headerDescription || showRequiredLegend;
  const hasMessages = errorMessage || successMessage;
  const hasFooter = actions || hasMessages;

  return (
    <div className={cn(containerClasses, className)} {...props}>
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
        <footer className="mt-5 flex flex-col items-stretch gap-3">
          {actions && (
            <div className="w-full flex items-center justify-center">
              <div className="w-full">{actions}</div>
            </div>
          )}

          <div className="min-h-5 flexitems-center justify-center">
            {hasMessages && (
              <p
                className={cn(
                  "text-sm text-center",
                  errorMessage ? "text-red-600" : "text-green-600"
                )}
              >
                {errorMessage ?? successMessage}
              </p>
            )}
          </div>
        </footer>
      )}
    </div>
  );
};

export default FormLayout;
