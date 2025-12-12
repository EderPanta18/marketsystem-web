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

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  header?: ReactNode;
  items?: SidebarNavItem[]; // ahora opcional
  footer?: ReactNode;
}
