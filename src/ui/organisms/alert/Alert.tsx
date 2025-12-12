// ui/molecules/Alert/Alert.tsx

import React from "react";
import { cn } from "@/shared/utils";
import { extractTextColorClass, getColorVariantBaseClasses } from "@/ui/tokens";
import { Icon } from "@/ui/atoms";
import type {
  AlertProps,
  AlertStatus,
  AlertVariant,
  AlertSize,
  AlertColorScheme,
} from "./Alert.types";

const STATUS_ICON: Record<AlertStatus, "info" | "check" | "alert" | "x"> = {
  info: "info",
  success: "check",
  warning: "alert",
  error: "x",
};

const sizeClasses: Record<AlertSize, string> = {
  sm: "px-2 py-2 text-xs",
  md: "px-3 py-2.5 text-xs",
  lg: "px-4 py-3 text-sm",
};

export const Alert: React.FC<AlertProps> = ({
  status = "info",
  variant = "subtle",
  colorScheme = "neutral",
  size = "md",
  title,
  description,
  showIcon = true,
  closable = false,
  onClose,
  children,
  className,
  ...props
}) => {
  const iconName = STATUS_ICON[status];

  const baseColorClasses = getColorVariantBaseClasses(
    colorScheme as AlertColorScheme,
    variant as AlertVariant
  );
  const textColorClass = extractTextColorClass(baseColorClasses);

  const alertSizeClasses = sizeClasses[size];
  const hasBody = description || children;

  return (
    <div
      className={cn(
        "flex w-full items-start gap-3 rounded-lg",
        alertSizeClasses,
        baseColorClasses,
        className
      )}
      role="alert"
      {...props}
    >
      {showIcon && (
        <span className="mt-0.5">
          <Icon name={iconName} size="sm" className={cn(textColorClass)} />
        </span>
      )}

      <div className="flex-1 min-w-0">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        {hasBody && (
          <div className="text-[11px] leading-snug">
            {description ?? children}
          </div>
        )}
      </div>

      {closable && (
        <button
          type="button"
          onClick={onClose}
          className="ml-2 mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-blue-500"
          aria-label="Cerrar alerta"
        >
          <Icon name="x" size="sm" className={cn(textColorClass)} />
        </button>
      )}
    </div>
  );
};

export default Alert;
