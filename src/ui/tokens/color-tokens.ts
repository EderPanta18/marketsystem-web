// ui/tokens/color-tokens.ts

import type { UIColorScheme, UIColorTokens } from "@/core/types";

export const COLOR_TOKENS: Record<UIColorScheme, UIColorTokens> = {
  primary: {
    solid: {
      bg: "bg-blue-600",
      bgHover: "hover:bg-blue-600/90",
      bgActive: "active:bg-blue-700",
      text: "text-white",
      border: "border-blue-600",
    },
    outline: {
      text: "text-blue-700",
      border: "border-blue-600",
      bgHover: "hover:bg-blue-50",
      bgActive: "active:bg-blue-100",
    },
    ghost: {
      text: "text-blue-700",
      bgHover: "hover:bg-blue-50",
      bgActive: "active:bg-blue-100",
    },
    subtle: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      border: "border-blue-100",
    },
  },
  secondary: {
    solid: {
      bg: "bg-sky-200", // celeste pastel suave
      bgHover: "hover:bg-sky-300", // un poco más oscuro
      bgActive: "active:bg-sky-400",
      text: "text-sky-900", // celeste muy oscuro (no azul)
      border: "border-sky-400",
    },
    outline: {
      text: "text-sky-900",
      border: "border-sky-500",
      bgHover: "hover:bg-sky-200",
      bgActive: "active:bg-sky-300",
    },
    ghost: {
      text: "text-sky-900",
      bgHover: "hover:bg-sky-100",
      bgActive: "active:bg-sky-200",
    },
    subtle: {
      bg: "bg-sky-100",
      text: "text-sky-900",
      border: "border-sky-200",
    },
  },

  danger: {
    solid: {
      bg: "bg-red-600",
      bgHover: "hover:bg-red-600/90",
      bgActive: "active:bg-red-700",
      text: "text-white",
      border: "border-red-600",
    },
    outline: {
      text: "text-red-700",
      border: "border-red-600",
      bgHover: "hover:bg-red-50",
      bgActive: "active:bg-red-100",
    },
    ghost: {
      text: "text-red-700",
      bgHover: "hover:bg-red-50",
      bgActive: "active:bg-red-100",
    },
    subtle: {
      bg: "bg-red-50",
      text: "text-red-800",
      border: "border-red-100",
    },
  },
  success: {
    solid: {
      bg: "bg-green-600",
      bgHover: "hover:bg-green-600/90",
      bgActive: "active:bg-green-700",
      text: "text-white",
      border: "border-green-600",
    },
    outline: {
      text: "text-green-700",
      border: "border-green-600",
      bgHover: "hover:bg-green-50",
      bgActive: "active:bg-green-100",
    },
    ghost: {
      text: "text-green-700",
      bgHover: "hover:bg-green-50",
      bgActive: "active:bg-green-100",
    },
    subtle: {
      bg: "bg-green-50",
      text: "text-green-800",
      border: "border-green-100",
    },
  },
  warning: {
    solid: {
      bg: "bg-amber-500",
      bgHover: "hover:bg-amber-500/90",
      bgActive: "active:bg-amber-600",
      text: "text-black",
      border: "border-amber-500",
    },
    outline: {
      text: "text-amber-700",
      border: "border-amber-500",
      bgHover: "hover:bg-amber-50",
      bgActive: "active:bg-amber-100",
    },
    ghost: {
      text: "text-amber-700",
      bgHover: "hover:bg-amber-50",
      bgActive: "active:bg-amber-100",
    },
    subtle: {
      bg: "bg-amber-50",
      text: "text-amber-900",
      border: "border-amber-100",
    },
  },
  neutral: {
    solid: {
      bg: "bg-gray-800",
      bgHover: "hover:bg-gray-800/90",
      bgActive: "active:bg-gray-900",
      text: "text-white",
      border: "border-gray-400",
    },
    outline: {
      text: "text-gray-800",
      border: "border-gray-500",
      bgHover: "hover:bg-gray-50",
      bgActive: "active:bg-gray-100",
    },
    ghost: {
      text: "text-gray-800",
      bgHover: "hover:bg-gray-50",
      bgActive: "active:bg-gray-100",
    },
    subtle: {
      bg: "bg-gray-50",
      text: "text-gray-900",
      border: "border-gray-200",
    },
  },
};
