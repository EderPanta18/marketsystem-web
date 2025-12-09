// ui/atoms/button/Button.tsx

import { cn } from "@/shared/utils";
import type {
  ButtonProps,
  ButtonSize,
  ButtonColorScheme,
  ButtonStyleVariant,
} from "./Button.types";
import {
  buttonBaseClasses,
  getButtonSizeClasses,
  getButtonColorClasses,
} from "./Button.helpers";

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

  const interactiveClasses =
    variant === "solid" ? "shadow-sm hover:shadow-lg hover:brightness-110" : "";

  const disabledClasses =
    disabled && !loading ? "opacity-60 cursor-not-allowed" : "";

  const loadingClasses = loading ? "cursor-wait opacity-80" : "";

  return (
    <button
      className={cn(
        buttonBaseClasses,
        sizeClasses,
        colorClasses,
        !isDisabled && interactiveClasses,
        fullWidth && "w-full",
        disabledClasses,
        loadingClasses,
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      <span className="inline-flex items-center gap-1">{children}</span>
    </button>
  );
};

export default Button;
