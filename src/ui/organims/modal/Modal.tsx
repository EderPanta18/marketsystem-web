"use client";

// ui/molecules/Modal/Modal.tsx

import * as React from "react";
import { cn } from "@/shared/utils";
import { Icon, Button } from "@/ui/atoms"; // importa Button
import type { ModalProps } from "./Modal.types";
import { modalWidthClasses, getModalStyleClasses } from "./Modal.helper";

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  description,
  showClose = true,
  onClose,
  size = "md",
  colorScheme = "primary",
  variant = "subtle",
  children,
  className,
  headerExtra,
  ...props
}) => {
  if (!open) return null;

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const styles = getModalStyleClasses(colorScheme, variant);

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex items-center justify-center",
        "bg-black/40 backdrop-blur-sm"
      )}
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={title ? "modal-title" : undefined}
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div
        className={cn(
          "w-full rounded-xl shadow-xl border flex flex-col",
          styles.container,
          modalWidthClasses[size],
          className
        )}
        {...props}
      >
        {(title || description || showClose || headerExtra) && (
          <div
            className={cn(
              "flex items-start justify-between gap-2 border-b px-4 py-3",
              styles.headerBorder
            )}
          >
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className={cn("text-sm font-semibold", styles.title)}
                >
                  {title}
                </h2>
              )}
              {description && (
                <p
                  id="modal-description"
                  className={cn("mt-0.5 text-xs", styles.subtitle)}
                >
                  {description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {headerExtra}
              {showClose && (
                <Button
                  type="button"
                  variant="ghost"
                  colorScheme={colorScheme}
                  size="sm"
                  onClick={onClose}
                  className="h-7 w-7 p-0 rounded-full"
                  aria-label="Cerrar"
                >
                  <Icon name="x" size="sm" colorScheme={colorScheme} />
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
