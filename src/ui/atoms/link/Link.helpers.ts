// ui/atoms/link/Link.helpers.ts

import type { UIColorScheme, UIVariant } from "@/core/types";
import { cn } from "@/shared/utils";
import { getColorVariantInteractiveClasses } from "@/ui/tokens";
import type {
  LinkSize,
  LinkColorScheme,
  LinkVariant,
  LinkUnderline,
  LinkProps,
} from "./Link.types";

export const linkBaseClasses =
  "inline-flex items-center font-medium rounded-md transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed";

const sizeClassesMap: Record<LinkSize, string> = {
  sm: "text-xs px-1.5 py-0.5 gap-1",
  md: "text-sm px-2 py-1 gap-1.5",
  lg: "text-base px-3 py-1.5 gap-2",
};

const underlineClassesMap: Record<LinkUnderline, string> = {
  none: "no-underline",
  hover: "no-underline hover:underline",
  always: "underline",
};

export function getLinkSizeClasses(size: LinkSize): string {
  return sizeClassesMap[size];
}

export function getLinkColorClasses(
  colorScheme: LinkColorScheme,
  variant: LinkVariant
): string[] {
  return getColorVariantInteractiveClasses(
    colorScheme as UIColorScheme,
    variant as UIVariant
  );
}

export function getLinkUnderlineClasses(underline: LinkUnderline): string {
  return underlineClassesMap[underline];
}

export function getLinkClasses(props: LinkProps): string {
  const {
    size = "md",
    colorScheme = "primary",
    variant = "subtle",
    underline = "hover",
    fullWidth,
    active,
    disabled,
  } = props;

  const colorClasses = getLinkColorClasses(
    colorScheme as LinkColorScheme,
    variant as LinkVariant
  );

  const layoutClasses = [
    linkBaseClasses,
    getLinkSizeClasses(size),
    getLinkUnderlineClasses(underline),
    fullWidth ? "w-full justify-between" : "justify-start",
  ];

  const stateClasses: string[] = [];

  if (disabled) {
    stateClasses.push(
      "opacity-60 cursor-not-allowed pointer-events-none",
      "hover:bg-transparent active:bg-transparent"
    );
  } else if (active) {
    stateClasses.push("font-semibold");
  }

  return cn(...colorClasses, ...layoutClasses, ...stateClasses);
}
