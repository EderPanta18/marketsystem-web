// app/(protected)/sistema/_layout-components/sidebar-navigation/SidebarNavigation.tsx

"use client";

import React from "react";
import { cn } from "@/shared/utils";
import { IconButton } from "@/ui/molecules";
import { useAuthorizedRoutes } from "@/hooks/auth";
import { Sidebar } from "@/ui/organims";
import { useIsActiveRoute } from "@/hooks/ui";
import { Icon } from "@/ui/atoms";
import { SidebarHeader } from "./sidebar-header";
import { SidebarFooter } from "./sidebar-footer";
import { SIDEBAR_NAV_ITEMS } from "./config";

export const SidebarNavigation: React.FC = () => {
  const { accessiblePaths } = useAuthorizedRoutes();
  const allowed = new Set(accessiblePaths);

  const items = SIDEBAR_NAV_ITEMS.filter((item) => allowed.has(item.href)).map(
    (item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      active: useIsActiveRoute(item.href).isActive,
      disabled: false,
      icon: item.icon ? <Icon name={item.icon} /> : undefined,
    })
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarContent = (
    <Sidebar
      header={<SidebarHeader />}
      items={items}
      footer={<SidebarFooter />}
    />
  );

  return (
    <>
      {/* Sidebar fijo solo en pantallas grandes */}
      <div className="hidden lg:block">{sidebarContent}</div>

      {/* Top bar fijo SOLO en mobile (botón menú) */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-end bg-white px-4 py-2 shadow-sm lg:hidden">
        <IconButton
          icon="menu"
          aria-label="Abrir menú"
          size="md"
          colorScheme="neutral"
          variant="ghost"
          className="h-9 w-9 rounded-full"
          onClick={() => setMobileOpen(true)}
        />
      </div>
      {/* Overlay SOLO en mobile */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer lateral SOLO en mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-transparent transition-transform duration-200 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
};

export default SidebarNavigation;
