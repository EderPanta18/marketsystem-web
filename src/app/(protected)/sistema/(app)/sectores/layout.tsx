// app/(protected)/sistema/(app)/sectores/layout.tsx

"use client";

import type { ReactNode } from "react";
import { EmptyState } from "@/shared/components/empty";
import { useCurrentMarket } from "@/hooks/market";
import { SectorsSidebar } from "./_layout/sidebar";

export default function SectorsLayout({ children }: { children: ReactNode }) {
  const { currentMarketId } = useCurrentMarket();

  if (!currentMarketId) {
    return (
      <EmptyState
        title="No tienes un mercado asignado"
        description="Para ver y administrar los sectores, debes tener un mercado asignado. Por favor, contacta con el administrador del sistema."
        className="h-full"
      />
    );
  }

  return (
    <div className="h-full flex flex-col md:flex-row gap-2">
      <div className="flex-1">{children}</div>
      <div className="bg-gray-50 rounded p-1">
        <SectorsSidebar />
      </div>
    </div>
  );
}
