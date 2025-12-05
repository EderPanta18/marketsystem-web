// ui/molecules/card/Card.tsx

import * as React from "react";
import { cn } from "@/shared/utils";
import type { CardProps } from "./Card.types";
import { getCardStyleTokens } from "./Card.helpers";

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  headerExtra,
  footer,
  children,
  className,
  colorScheme = "neutral",
  size = "md",
  variant = "elevated",
  ...props
}) => {
  const hasHeader = title || subtitle || headerExtra;
  const hasFooter = Boolean(footer);

  const styles = getCardStyleTokens(colorScheme, size, variant);

  return (
    <div className={cn(styles.container, className)} {...props}>
      {hasHeader && (
        <div
          className={cn(
            "flex items-start justify-between gap-2 border-b",
            styles.headerBorder,
            styles.headerPadding
          )}
        >
          <div>
            {title && (
              <h3 className={cn("text-sm font-semibold", styles.title)}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className={cn("mt-0.5 text-xs", styles.subtitle)}>
                {subtitle}
              </p>
            )}
          </div>
          {headerExtra && (
            <div className="flex items-center gap-2">{headerExtra}</div>
          )}
        </div>
      )}

      <div className={styles.contentPadding}>{children}</div>

      {hasFooter && (
        <div
          className={cn(
            "mt-auto border-t",
            styles.footerBorder,
            styles.footerPadding
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
