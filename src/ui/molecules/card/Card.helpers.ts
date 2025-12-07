// ui/molecules/card/Card.helper.ts

import {
  extractBorderColorClass,
  getColorVariantBaseClasses,
} from "@/ui/tokens";
import type { CardColorScheme, CardSize, CardVariant } from "./Card.types";

interface CardStyleTokens {
  container: string;
  contentPadding: string;
  headerPadding: string;
  footerPadding: string;
  headerBorder: string;
  footerBorder: string;
  title: string;
  subtitle: string;
}

const sizePaddingMap: Record<
  CardSize,
  { header: string; content: string; footer: string }
> = {
  sm: {
    header: "px-3 py-2.5",
    content: "px-3 py-2.5",
    footer: "px-3 py-2.5",
  },
  md: {
    header: "px-4 py-3",
    content: "px-4 py-3",
    footer: "px-4 py-3",
  },
  lg: {
    header: "px-5 py-4",
    content: "px-5 py-4",
    footer: "px-5 py-4",
  },
};

export function getCardStyleTokens(
  colorScheme: CardColorScheme,
  size: CardSize,
  variant: CardVariant
): CardStyleTokens {
  const padding = sizePaddingMap[size];

  // CardVariant -> UIVariant
  const uiVariant = variant === "subtle" ? "subtle" : "outline";

  const colorClasses = getColorVariantBaseClasses(colorScheme, uiVariant);
  // extraemos solo la clase de borde para header/footer
  const borderClass = extractBorderColorClass(colorClasses, "border-gray-200");

  let containerBase = "rounded-xl flex flex-col bg-white";
  if (variant === "subtle") {
    // en subtle usamos el bg del helper
    containerBase = `rounded-xl flex flex-col ${colorClasses.join(" ")}`;
  } else {
    containerBase = `rounded-xl flex flex-col bg-white ${borderClass}`;
  }

  if (variant === "elevated") {
    containerBase += " shadow-sm";
  }

  return {
    container: containerBase,
    headerPadding: padding.header,
    contentPadding: padding.content,
    footerPadding: padding.footer,
    headerBorder: borderClass,
    footerBorder: borderClass,
    title: "text-gray-900",
    subtitle: "text-gray-500",
  };
}
