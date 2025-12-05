// ui/tokens/color-helpers.ts

import { UIColorScheme, UIVariant } from "@/core/types";
import { COLOR_TOKENS } from "./color-tokens";

export function getColorVariantBaseClasses(
  colorScheme: UIColorScheme,
  variant: UIVariant
): string[] {
  const tokens = COLOR_TOKENS[colorScheme];

  switch (variant) {
    case "solid": {
      const t = tokens.solid;
      return [t.bg, t.text, t.border];
    }
    case "outline": {
      const t = tokens.outline;
      return ["bg-transparent", t.text, t.border, "border"];
    }
    case "ghost": {
      const t = tokens.ghost;
      return ["bg-transparent", t.text];
    }
    case "subtle": {
      const t = tokens.subtle;
      return [t.bg, t.text, t.border, "border"];
    }
  }
}

export function getColorVariantInteractiveClasses(
  colorScheme: UIColorScheme,
  variant: UIVariant
): string[] {
  const tokens = COLOR_TOKENS[colorScheme];

  switch (variant) {
    case "solid": {
      const t = tokens.solid;
      return [t.bg, t.text, t.border, t.bgHover, t.bgActive];
    }
    case "outline": {
      const t = tokens.outline;
      return [
        "bg-transparent",
        t.text,
        t.border,
        "border",
        t.bgHover,
        t.bgActive,
      ];
    }
    case "ghost": {
      const t = tokens.ghost;
      return ["bg-transparent", t.text, t.bgHover, t.bgActive];
    }
    case "subtle": {
      const t = tokens.subtle;
      return [t.bg, t.text, t.border, "border"];
    }
  }
}
