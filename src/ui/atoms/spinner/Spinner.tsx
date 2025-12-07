// ui/atoms/spinner/Spinner.tsx

import { cn } from "@/shared/utils";
import type {
  SpinnerProps,
  SpinnerSize,
  SpinnerColorScheme,
} from "./Spinner.types";
import {
  getSpinnerSizePx,
  getSpinnerColorClass,
  getSpinnerLabelFontSize,
} from "./Spinner.helpers";

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  colorScheme = "primary",
  label = "Cargando...",
  showLabel = true,
  className,
  children,
  ...props
}) => {
  const effectiveSize = getSpinnerSizePx(size as SpinnerSize);
  const textColor = getSpinnerColorClass(colorScheme as SpinnerColorScheme);
  const labelFontSize = getSpinnerLabelFontSize(effectiveSize);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "inline-flex flex-col items-center justify-center gap-4",
        !showLabel && "gap-0",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-transparent border-t-current",
          textColor
        )}
        style={{
          width: effectiveSize,
          height: effectiveSize,
        }}
      />
      {showLabel && (
        <span className="text-gray-700" style={{ fontSize: labelFontSize }}>
          {children ?? label}
        </span>
      )}
    </div>
  );
};

export default Spinner;
