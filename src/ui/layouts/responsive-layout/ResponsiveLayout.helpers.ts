// ui/layouts/responsive-layout/ResponsiveLayout.helpers.ts

import { cn } from "@/shared/utils";
import type { ResponsiveLayoutPlacement } from "./ResponsiveLayout.types";

export function getBreakpointClasses(
  breakpoint: "md" | "lg" | "xl",
  desktopExtra?: string
) {
  const map: Record<"md" | "lg" | "xl", string> = {
    md: "hidden md:block",
    lg: "hidden lg:block",
    xl: "hidden xl:block",
  };

  return cn(map[breakpoint], "shrink-0", desktopExtra);
}

export function getMobileHiddenClasses(breakpoint: "md" | "lg" | "xl") {
  const map: Record<"md" | "lg" | "xl", string> = {
    md: "md:hidden",
    lg: "lg:hidden",
    xl: "xl:hidden",
  };
  return map[breakpoint];
}

export function getOverlayClasses(extra?: string) {
  return cn(
    "fixed inset-0 z-50 flex bg-black/40",
    "transition-opacity duration-200",
    extra
  );
}

export function getPanelContainerClasses(
  placement: ResponsiveLayoutPlacement,
  maxHeightMobile?: string,
  extra?: string
) {
  const basePanel = "bg-white shadow-lg overflow-y-auto";

  // Contenedor interno dentro del overlay: controla alineación + padding externo
  const overlayAlign: Record<ResponsiveLayoutPlacement, string> = {
    // panel abajo, ancho completo, con padding lateral
    bottom: "flex items-end justify-stretch px-0 pb-0 w-full",
    // panel a la derecha con separación del borde
    right: "flex items-stretch justify-end pr-3 py-3 w-full",
    // panel a la izquierda con separación del borde
    left: "flex items-stretch justify-start pl-3 py-3 w-full",
  };

  // Tamaño del panel según posición
  const sizeClasses: Record<ResponsiveLayoutPlacement, string> = {
    bottom: "w-full rounded-t-2xl",
    right: "w-full max-w-sm h-full rounded-l-2xl",
    left: "w-full max-w-sm h-full rounded-r-2xl",
  };

  const panel = cn(
    basePanel,
    sizeClasses[placement],
    placement === "bottom" && maxHeightMobile
      ? `max-h-[${maxHeightMobile}]`
      : placement === "bottom"
      ? "max-h-[80vh]"
      : "",
    // padding interno para que el contenido no toque el borde
    "px-4 pt-3 pb-4",
    extra
  );

  return {
    overlayInner: overlayAlign[placement],
    panel,
  };
}

export function getTriggerClasses(extra?: string) {
  return cn(
    "inline-flex items-center gap-2 rounded-full",
    "px-4 py-2 text-sm shadow-sm",
    extra
  );
}

export function getHeaderClasses(extra?: string) {
  return cn("flex items-center justify-end mb-4", extra);
}
