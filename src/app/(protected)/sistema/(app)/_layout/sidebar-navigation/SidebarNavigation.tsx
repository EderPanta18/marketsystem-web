// app/(protected)/sistema/_layout-components/sidebar-navigation/SidebarNavigation.tsx
"use client";

import React from "react";
import { cn } from "@/shared/utils";
import { IconButton } from "@/ui/molecules";
import { Sidebar } from "@/ui/organisms";
import { useOutsideClick } from "@/shared/hooks";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarFooter, SidebarHeader } from "./components";

export const SidebarNavigation: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const sidebarRef = useOutsideClick<HTMLDivElement>(
    () => {
      if (mobileOpen) setMobileOpen(false);
    },
    { enabled: mobileOpen }
  );

  const sidebarContent = (
    <Sidebar header={<SidebarHeader />} footer={<SidebarFooter />}>
      {/* Si tu Sidebar organism soporta children, puedes renderizar aquí */}
      <SidebarMainNav />
    </Sidebar>
  );

  return (
    <>
      {/* Sidebar fijo solo en pantallas grandes */}
      <div className="hidden lg:block">{sidebarContent}</div>

      {/* Top bar fijo SOLO en mobile (botón menú) */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-end bg-white px-4 py-2 border-b-2 border-gray-300 shadow-sm lg:hidden">
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
      />

      {/* Drawer lateral SOLO en mobile */}
      <div
        ref={sidebarRef}
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
