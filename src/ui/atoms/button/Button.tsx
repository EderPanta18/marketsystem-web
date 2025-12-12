// ui/atoms/button/Button.tsx

import { cn } from "@/shared/utils";
import type {
  ButtonProps,
  ButtonSize,
  ButtonColorScheme,
  ButtonStyleVariant,
} from "./Button.types";
import { getButtonSizeClasses, getButtonColorClasses } from "./Button.helpers";

export const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  colorScheme = "primary",
  variant = "solid",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const sizeClasses = getButtonSizeClasses(size as ButtonSize);
  const colorClasses = getButtonColorClasses(
    colorScheme as ButtonColorScheme,
    variant as ButtonStyleVariant
  );

  // interacciones solo si está activo y no cargando
  const interactiveClasses =
    !isDisabled && variant === "solid"
      ? "shadow-sm hover:shadow-lg hover:brightness-110"
      : "";

  // cursor solo en estado normal
  const cursorClasses = !isDisabled ? "cursor-pointer" : "cursor-not-allowed";

  // loading → mantiene colores pero se atenúa
  const loadingClasses = loading
    ? "opacity-80 pointer-events-none cursor-wait"
    : "";

  // disabled puro → sin colores, neutro
  const disabledClasses =
    disabled && !loading
      ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-900 border-gray-500"
      : "";

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg border transition-all duration-200 ease-out",
        sizeClasses,
        !disabled && colorClasses, // disabled puro no usa esquema
        interactiveClasses,
        cursorClasses,
        fullWidth && "w-full",
        loadingClasses,
        disabledClasses,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-current text-current" />
      )}
      <span className="inline-flex items-center gap-1">{children}</span>
    </button>
  );
};

export default Button;
