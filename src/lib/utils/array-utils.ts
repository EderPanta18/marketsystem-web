// lib/utils/array-utils.ts

/**
 * Utilidades para manejo de arrays
 */

/**
 * Encuentra un elemento por ID o propiedad específica
 */
export const findById = <T extends { id: string | number }>(
  array: T[],
  id: string | number
): T | undefined => {
  return array.find((item) => item.id === id);
};

/**
 * Encuentra el índice de un elemento por ID
 */
export const findIndexById = <T extends { id: string | number }>(
  array: T[],
  id: string | number
): number => {
  return array.findIndex((item) => item.id === id);
};

/**
 * Filtra elementos únicos por propiedad
 */
export const uniqueBy = <T, K extends keyof T>(array: T[], key: K): T[] => {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
};

/**
 * Filtra elementos duplicados
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * Agrupa elementos por propiedad
 */
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

/**
 * Ordena array por propiedad
 */
export const sortBy = <T, K extends keyof T>(
  array: T[],
  key: K,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...array].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue < bValue) return direction === "asc" ? -1 : 1;
    if (aValue > bValue) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

/**
 * Convierte array a objeto usando una clave
 */
export const arrayToObject = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T> => {
  return array.reduce((obj, item) => {
    const keyValue = String(item[key]);
    obj[keyValue] = item;
    return obj;
  }, {} as Record<string, T>);
};

/**
 * Divide array en chunks
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Une arrays y remueve duplicados
 */
export const mergeUnique = <T>(...arrays: T[][]): T[] => {
  return unique(arrays.flat());
};

/**
 * Diferencia entre dos arrays
 */
export const difference = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter((item) => !array2.includes(item));
};

/**
 * Intersección entre dos arrays
 */
export const intersection = <T>(array1: T[], array2: T[]): T[] => {
  return array1.filter((item) => array2.includes(item));
};

/**
 * Mapea y filtra en una sola operación
 */
export const filterMap = <T, U>(
  array: T[],
  callback: (item: T, index: number, array: T[]) => U | null | undefined
): U[] => {
  const result: U[] = [];

  array.forEach((item, index, arr) => {
    const mapped = callback(item, index, arr);
    if (mapped != null) {
      result.push(mapped);
    }
  });

  return result;
};

/**
 * Convierte array a options para select
 */
export const toSelectOptions = <T>(
  array: T[],
  valueKey: keyof T,
  labelKey: keyof T
): Array<{ value: string; label: string }> => {
  return array.map((item) => ({
    value: String(item[valueKey]),
    label: String(item[labelKey]),
  }));
};

/**
 * Calcula suma de propiedad numérica
 */
export const sumBy = <T>(array: T[], key: keyof T): number => {
  return array.reduce((sum, item) => {
    const value = Number(item[key]) || 0;
    return sum + value;
  }, 0);
};

/**
 * Calcula promedio de propiedad numérica
 */
export const averageBy = <T>(array: T[], key: keyof T): number => {
  if (array.length === 0) return 0;
  return sumBy(array, key) / array.length;
};

/**
 * Obtiene el valor máximo de una propiedad
 */
export const maxBy = <T>(array: T[], key: keyof T): T | undefined => {
  if (array.length === 0) return undefined;

  return array.reduce((max, item) => {
    const currentValue = Number(item[key]);
    const maxValue = Number(max[key]);
    return currentValue > maxValue ? item : max;
  });
};

/**
 * Obtiene el valor mínimo de una propiedad
 */
export const minBy = <T>(array: T[], key: keyof T): T | undefined => {
  if (array.length === 0) return undefined;

  return array.reduce((min, item) => {
    const currentValue = Number(item[key]);
    const minValue = Number(min[key]);
    return currentValue < minValue ? item : min;
  });
};
