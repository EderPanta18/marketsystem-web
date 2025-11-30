// lib/utils/string-utils.ts

/**
 * Utilidades para manejo de strings
 */

/**
 * Capitaliza la primera letra de un string
 */
export const capitalize = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitaliza cada palabra de un string
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return "";
  return str.replace(/\w\S*/g, (txt) => capitalize(txt));
};

/**
 * Convierte un string a camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
      index === 0 ? word.toLowerCase() : word.toUpperCase()
    )
    .replace(/\s+/g, "");
};

/**
 * Convierte un string a kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
};

/**
 * Convierte un string a snake_case
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();
};

/**
 * Trunca un string y agrega ellipsis si es necesario
 */
export const truncate = (
  str: string,
  maxLength: number,
  ellipsis: string = "..."
): string => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength - ellipsis.length) + ellipsis;
};

/**
 * Remueve acentos y diacríticos
 */
export const removeAccents = (str: string): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

/**
 * Normaliza un string para búsquedas (sin acentos, minúsculas)
 */
export const normalizeForSearch = (str: string): string => {
  return removeAccents(str).toLowerCase();
};

/**
 * Genera un slug URL-friendly
 */
export const generateSlug = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

/**
 * Enmascara parte de un string (útil para emails, tarjetas, etc.)
 */
export const maskString = (
  str: string,
  visibleStart: number = 0,
  visibleEnd: number = 0,
  maskChar: string = "*"
): string => {
  if (!str || str.length <= visibleStart + visibleEnd) return str;

  const start = str.slice(0, visibleStart);
  const end = visibleEnd > 0 ? str.slice(-visibleEnd) : "";
  const masked = maskChar.repeat(str.length - visibleStart - visibleEnd);

  return start + masked + end;
};

/**
 * Extrae iniciales de un nombre (ej: "Juan Pérez" → "JP")
 */
export const getInitials = (name: string, maxInitials: number = 2): string => {
  if (!name) return "";

  return name
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxInitials)
    .join("");
};

/**
 * Valida si un string es un email válido
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida si un string es un número de teléfono básico
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

/**
 * Limpia y formatea un número de teléfono
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1 ($2) $3-$4");
  }

  return phone;
};

/**
 * Genera un ID aleatorio
 */
export const generateId = (length: number = 8): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
