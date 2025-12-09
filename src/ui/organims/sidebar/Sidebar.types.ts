// ui/organisms/sidebar/Sidebar.types.ts

import type { ReactNode, HTMLAttributes } from "react";

export interface SidebarNavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export interface SidebarProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  header?: ReactNode; // logo + título, por ejemplo
  items: SidebarNavItem[];
  footer?: ReactNode; // usuario, acciones, etc.
}
