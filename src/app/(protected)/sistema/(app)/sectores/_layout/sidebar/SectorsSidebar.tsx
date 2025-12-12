// app/(protected)/sistema/(app)/sectores/_layout/sidebar/SectorsSidebar.tsx

"use client";

import { ResponsiveLayout } from "@/ui/layouts";
import SectorsFilters from "./SectorsFilters";

export const SectorsSidebar: React.FC = () => (
  <ResponsiveLayout
    triggerLabel="Filtros de sectores"
    placement="bottom"
    desktopBreakpoint="md"
    desktopWidthClass="w-32 md:w-64 lg:w-72"
  >
    <SectorsFilters />
  </ResponsiveLayout>
);

export default SectorsSidebar;
