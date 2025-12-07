// ui/molecules/formField/FormField.helpers.ts

import { cn } from "@/shared/utils";
import type { FormFieldLayout } from "./FormField.types";

interface LayoutClasses {
  root: string;
  label: string;
  controlWrapper: string;
}

export function getLayoutClasses(
  layout: FormFieldLayout,
  labelWidth?: string
): LayoutClasses {
  if (layout === "inline") {
    return {
      root: "w-full flex items-start gap-4",
      label: cn(
        "text-sm font-medium text-gray-800 mt-1 shrink-0",
        labelWidth ?? "w-fit"
      ),
      controlWrapper: "flex-1 flex flex-col gap-1",
    };
  }

  // vertical
  return {
    root: "w-full flex flex-col gap-1.5",
    label: "text-sm font-medium text-gray-800",
    controlWrapper: "flex flex-col gap-1",
  };
}
