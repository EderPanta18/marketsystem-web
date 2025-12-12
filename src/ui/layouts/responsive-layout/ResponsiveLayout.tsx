// ui/layouts/responsive-layout/ResponsiveLayout.tsx

"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import { Button, Icon } from "@/ui/atoms";
import {
  getBreakpointClasses,
  getHeaderClasses,
  getMobileHiddenClasses,
  getOverlayClasses,
  getPanelContainerClasses,
  getTriggerClasses,
} from "./ResponsiveLayout.helpers";
import type { ResponsiveLayoutProps } from "./ResponsiveLayout.types";
import { IconButton } from "@/ui/molecules";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick";

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  triggerLabel = "Abrir panel",
  triggerIcon,
  showTrigger = true,
  desktopBreakpoint = "lg",
  desktopWidthClass = "w-64 md:w-80",
  showOnDesktop = true,
  placement = "bottom",
  maxHeightMobile,
  closeOnBackdropClick = true,
  closeOnEsc = true,
  open,
  defaultOpen = false,
  onOpenChange,
  closeLabel = "Cerrar",
  ariaLabel,
  panelClassName,
  overlayClassName,
  triggerClassName,
  headerClassName,
  className,
  ...rest
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open! : internalOpen;

  const mobileHidden = getMobileHiddenClasses(desktopBreakpoint);
  const { overlayInner, panel } = getPanelContainerClasses(
    placement,
    maxHeightMobile,
    panelClassName
  );

  const handleOpenChange = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const handleBackdropClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // solo para casos especiales; el cierre principal lo hace useOutsideClick
    if (!closeOnBackdropClick) return;
    if (e.target === e.currentTarget) handleOpenChange(false);
  };

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleOpenChange(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeOnEsc, isOpen]);

  const panelRef = useOutsideClick<HTMLDivElement>(
    () => {
      if (!closeOnBackdropClick || !isOpen) return;
      handleOpenChange(false);
    },
    { enabled: isOpen }
  );

  return (
    <div className={className} {...rest}>
      {showOnDesktop && (
        <div
          className={getBreakpointClasses(desktopBreakpoint, desktopWidthClass)}
        >
          {children}
        </div>
      )}

      {showTrigger && (
        <div className={`${mobileHidden} fixed bottom-2 right-2`}>
          <Button
            type="button"
            variant="solid"
            colorScheme="neutral"
            className={getTriggerClasses(triggerClassName)}
            onClick={() => handleOpenChange(true)}
          >
            {triggerIcon ?? (
              <Icon name="search" className="text-white" size="sm" />
            )}
            <span>{triggerLabel}</span>
          </Button>
        </div>
      )}

      {isOpen && (
        <div
          className={`${mobileHidden} ${getOverlayClasses(overlayClassName)}`}
          onClick={handleBackdropClick}
          aria-label={ariaLabel}
          role="dialog"
          aria-modal="true"
        >
          <div className={overlayInner}>
            <div ref={panelRef} className={panel}>
              <div className={getHeaderClasses(headerClassName)}>
                <IconButton
                  type="button"
                  icon="x"
                  size="sm"
                  variant="outline"
                  colorScheme="neutral"
                  onClick={() => handleOpenChange(false)}
                  aria-label="Cerrar panel de búsqueda de sectores"
                />
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveLayout;
