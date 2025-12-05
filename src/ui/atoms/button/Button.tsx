// ui/atoms/Button/Button.tsx

import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils";
import type {
  ButtonBaseProps,
  ButtonVariant,
  ButtonSize,
} from "./Button.types";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonBaseProps {}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const base =
    "inline-flex items-center justify-center font-medium rounded-lg border border-transparent transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed";
  const sizes: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white shadow-sm hover:bg-blue-600/90 hover:shadow-md active:bg-blue-700",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300",
    outline:
      "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50 active:bg-blue-100",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200",
  };

  return (
    <button
      className={cn(
        base,
        sizes[size],
        variants[variant],
        fullWidth && "w-full",
        isDisabled && "opacity-60",
        loading && "cursor-wait",
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
