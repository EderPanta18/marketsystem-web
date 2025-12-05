// ui/layouts/form-layout/FormLayout.helpers.ts

import { cn } from "@/shared/utils";
import type { FormLayoutVariant } from "./FormLayout.types";

export function getFormLayoutContainerClasses(variant: FormLayoutVariant) {
  if (variant === "boxed") {
    return cn(
      "w-full max-w-md mx-auto", // tamaño tipo login
      "rounded-2xl border border-gray-200 bg-white shadow-lg",
      "px-6 py-6 sm:px-8 sm:py-8"
    );
  }

  // default: sin caja, sólo layout
  return "w-full max-w-3xl mx-auto";
}

export function getFormLayoutGridClasses(columns: number) {
  if (columns === 1) return "grid grid-cols-1 gap-4";
  return "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6";
}
