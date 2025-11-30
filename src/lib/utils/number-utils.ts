// lib/utils/number-utils.ts

/**
 * Utilidades para manejo de números
 */

/**
 * Formatea un número como moneda
 */
export const formatCurrency = (
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Formatea un número con separadores
 */
export const formatNumber = (
  number: number,
  locale: string = "en-US",
  options: Intl.NumberFormatOptions = {}
): string => {
  return new Intl.NumberFormat(locale, options).format(number);
};

/**
 * Redondea un número a decimales específicos
 */
export const round = (number: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
};

/**
 * Calcula porcentaje
 */
export const calculatePercentage = (
  value: number,
  total: number,
  decimals: number = 2
): number => {
  if (total === 0) return 0;
  return round((value / total) * 100, decimals);
};

/**
 * Genera un número aleatorio en un rango
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Valida si un string es un número válido
 */
export const isValidNumber = (value: any): boolean => {
  if (value === null || value === undefined) return false;
  if (typeof value === "number") return !isNaN(value);

  const num = Number(value);
  return !isNaN(num) && isFinite(num);
};

/**
 * Convierte a número seguro (evita NaN)
 */
export const toSafeNumber = (value: any, defaultValue: number = 0): number => {
  if (!isValidNumber(value)) return defaultValue;
  return Number(value);
};

/**
 * Formatea bytes a formato legible
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
    sizes[i]
  }`;
};

/**
 * Formatea número a formato abreviado (1K, 1M, 1B)
 */
export const formatAbbreviatedNumber = (num: number): string => {
  if (num < 1000) return num.toString();

  const units = ["K", "M", "B", "T"];
  const unitIndex = Math.floor(Math.log10(num) / 3) - 1;
  const unit = units[unitIndex];

  if (!unit) return num.toString();

  const scaled = num / Math.pow(1000, unitIndex + 1);
  return `${scaled.toFixed(1)}${unit}`;
};

/**
 * Calcula el impuesto de un amount
 */
export const calculateTax = (
  amount: number,
  taxRate: number,
  decimals: number = 2
): number => {
  return round(amount * (taxRate / 100), decimals);
};

/**
 * Aplica descuento a un amount
 */
export const applyDiscount = (
  amount: number,
  discount: number,
  isPercentage: boolean = true,
  decimals: number = 2
): number => {
  if (isPercentage) {
    return round(amount * (1 - discount / 100), decimals);
  }
  return round(Math.max(0, amount - discount), decimals);
};

/**
 * Calcula el total con impuestos
 */
export const calculateTotalWithTax = (
  amount: number,
  taxRate: number,
  decimals: number = 2
): number => {
  const tax = calculateTax(amount, taxRate, decimals);
  return round(amount + tax, decimals);
};

/**
 * Valida si un número está en un rango
 */
export const isInRange = (
  value: number,
  min: number,
  max: number,
  inclusive: boolean = true
): boolean => {
  if (inclusive) {
    return value >= min && value <= max;
  }
  return value > min && value < max;
};

/**
 * Normaliza un número a un rango
 */
export const normalize = (
  value: number,
  min: number,
  max: number,
  newMin: number = 0,
  newMax: number = 1
): number => {
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
};

/**
 * Clampa un número a un rango
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};
