// ui/molecules/formField/FormField.tsx

import React from "react";
import { cn } from "@/shared/utils";
import type { FormFieldProps } from "./FormField.types";
import { getLayoutClasses } from "./FormField.helpers";

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  description,
  error,
  required = false,
  showLabel = true,
  showAsterisk = true,
  showDescription = true,
  showError = true,
  layout = "vertical",
  labelWidth,
  children,
}) => {
  const fieldId = id ?? React.useId();
  const hasError = Boolean(error);
  const showDescriptionText = showDescription && !!description;
  const showErrorText = showError && hasError;

  const descriptionId =
    showDescriptionText || showErrorText ? `${fieldId}-description` : undefined;

  const layoutClasses = getLayoutClasses(layout, labelWidth);

  const control = React.isValidElement(children)
    ? React.cloneElement(children as any, {
        id: (children as any).props.id ?? fieldId,
        "aria-invalid": hasError || (children as any).props["aria-invalid"],
        "aria-describedby":
          descriptionId ?? (children as any).props["aria-describedby"],
      })
    : children;

  return (
    <div className={layoutClasses.root}>
      {showLabel && label && (
        <label htmlFor={fieldId} className={layoutClasses.label}>
          {label}
          {required && showAsterisk && <span className="text-red-600"> *</span>}
        </label>
      )}

      <div className={layoutClasses.controlWrapper}>
        {control}

        {/* Contenedor fijo para mensaje, para que no mueva el layout */}
        <div className="min-h-4 mt-0.5">
          {(showErrorText || showDescriptionText) && (
            <p
              id={descriptionId}
              className={cn(
                "text-xs",
                showErrorText ? "text-red-600" : "text-gray-500"
              )}
            >
              {showErrorText ? error : description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormField;
