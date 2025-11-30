// lib/utils/date-utils.ts

/**
 * Utilidades para manejo de fechas
 */

/**
 * Formatea una fecha según el locale especificado
 */
export const formatDate = (
  date: Date | string | number,
  locale: string = "es-ES",
  options: Intl.DateTimeFormatOptions = {}
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
};

/**
 * Formatea una fecha y hora
 */
export const formatDateTime = (
  date: Date | string | number,
  locale: string = "es-ES"
): string => {
  const dateObj = new Date(date);
  return dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Formatea una fecha en formato relativo (hace 2 días, hace 1 hora)
 */
export const formatRelativeTime = (
  date: Date | string | number,
  locale: string = "es-ES"
): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
  if (diffInSeconds < 3600)
    return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
  if (diffInSeconds < 86400)
    return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
  if (diffInSeconds < 2592000)
    return rtf.format(-Math.floor(diffInSeconds / 86400), "day");
  if (diffInSeconds < 31536000)
    return rtf.format(-Math.floor(diffInSeconds / 2592000), "month");

  return rtf.format(-Math.floor(diffInSeconds / 31536000), "year");
};

/**
 * Calcula la diferencia entre dos fechas en días
 */
export const getDaysDifference = (
  startDate: Date | string | number,
  endDate: Date | string | number
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Verifica si una fecha es hoy
 */
export const isToday = (date: Date | string | number): boolean => {
  const today = new Date();
  const targetDate = new Date(date);
  return (
    targetDate.getDate() === today.getDate() &&
    targetDate.getMonth() === today.getMonth() &&
    targetDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Verifica si una fecha es futura
 */
export const isFutureDate = (date: Date | string | number): boolean => {
  return new Date(date) > new Date();
};

/**
 * Verifica si una fecha es pasada
 */
export const isPastDate = (date: Date | string | number): boolean => {
  return new Date(date) < new Date();
};

/**
 * Agrega días a una fecha
 */
export const addDays = (date: Date | string | number, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Agrega meses a una fecha
 */
export const addMonths = (
  date: Date | string | number,
  months: number
): Date => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

/**
 * Obtiene el primer día del mes
 */
export const getFirstDayOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Obtiene el último día del mes
 */
export const getLastDayOfMonth = (date: Date = new Date()): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Convierte a formato ISO sin timezone
 */
export const toISODateString = (date: Date | string | number): string => {
  const dateObj = new Date(date);
  return dateObj.toISOString().split("T")[0];
};

/**
 * Valida si un string es una fecha válida
 */
export const isValidDate = (date: any): boolean => {
  if (!date) return false;
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
};

/**
 * Obtiene el inicio del día (00:00:00)
 */
export const startOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

/**
 * Obtiene el fin del día (23:59:59)
 */
export const endOfDay = (date: Date = new Date()): Date => {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
};
