// hooks/ui/useIsActiveRoute.ts

"use client";

import { usePathname } from "next/navigation";
import { normalizePath } from "@/core/utils";

export function useIsActiveRoute(targetPath: string) {
  const pathname = usePathname();

  const current = normalizePath(pathname);
  const target = normalizePath(targetPath);

  // Activo si la ruta actual empieza con la ruta objetivo
  const isActive = current === target || current.startsWith(`${target}/`);

  return { isActive };
}
