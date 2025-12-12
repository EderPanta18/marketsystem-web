// ui/layouts/responsive-layout/ResponsiveLayout.types.ts

import type { ReactNode, HTMLAttributes } from "react";

export type ResponsiveLayoutPlacement = "left" | "right" | "bottom";

export interface ResponsiveLayoutProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  children: ReactNode;

  // Trigger (solo mobile)
  triggerLabel?: string;
  triggerIcon?: ReactNode;
  showTrigger?: boolean;

  // Layout desktop
  desktopBreakpoint?: "md" | "lg" | "xl";
  desktopWidthClass?: string;
  showOnDesktop?: boolean;

  // Layout mobile
  placement?: ResponsiveLayoutPlacement;
  maxHeightMobile?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;

  // Control de estado
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Textos / accesibilidad
  closeLabel?: string;
  ariaLabel?: string;

  // Estilos extra
  panelClassName?: string;
  overlayClassName?: string;
  triggerClassName?: string;
  headerClassName?: string;
}
