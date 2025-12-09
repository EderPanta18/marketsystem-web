// hooks/ui/useIsActiveRoute.ts

"use client";

import { usePathname } from "next/navigation";
import { normalizePath } from "@/core/utils";

export function useIsActiveRoute(targetPath: string) {
  const pathname = usePathname();

  const current = normalizePath(pathname);
  const target = normalizePath(targetPath);

  const isActive = current === target;

  return { isActive };
}
