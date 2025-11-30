// lib/utils/object-utils.ts

/**
 * Utilidades para manejo de objetos
 */

/**
 * Clona un objeto profundamente
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array)
    return obj.map((item) => deepClone(item)) as unknown as T;

  const cloned = {} as T;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
};

/**
 * Fusiona dos objetos profundamente
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T,
  source: Partial<T>
): T => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key as keyof T] = deepMerge(target[key], source[key]!);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};

/**
 * Verifica si es un objeto plano
 */
export const isObject = (item: any): item is Record<string, any> => {
  return item && typeof item === "object" && !Array.isArray(item);
};

/**
 * Omite propiedades de un objeto
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

/**
 * Selecciona propiedades específicas de un objeto
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Transforma claves de objeto
 */
export const transformKeys = <T>(
  obj: Record<string, any>,
  transformer: (key: string) => string
): T => {
  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const newKey = transformer(key);
    result[newKey] = obj[key];
  });

  return result as T;
};

/**
 * Convierte claves a camelCase
 */
export const keysToCamelCase = <T>(obj: Record<string, any>): T => {
  return transformKeys<T>(obj, (key) => {
    return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  });
};

/**
 * Convierte claves a snake_case
 */
export const keysToSnakeCase = <T>(obj: Record<string, any>): T => {
  return transformKeys<T>(obj, (key) => {
    return key.replace(/([A-Z])/g, "_$1").toLowerCase();
  });
};

/**
 * Remueve valores null/undefined
 */
export const removeNullish = <T extends Record<string, any>>(
  obj: T
): Partial<T> => {
  const result: Partial<T> = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] != null) {
      result[key as keyof T] = obj[key];
    }
  });

  return result;
};

/**
 * Aplana un objeto
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = ""
): Record<string, any> => {
  const result: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (isObject(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  });

  return result;
};

/**
 * Compara dos objetos profundamente
 */
export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

/**
 * Obtiene valor de objeto por path
 */
export const get = <T>(
  obj: Record<string, any>,
  path: string,
  defaultValue?: T
): T | undefined => {
  const keys = path.split(".");
  let result: any = obj;

  for (const key of keys) {
    if (result == null || !(key in result)) {
      return defaultValue;
    }
    result = result[key];
  }

  return result !== undefined ? result : defaultValue;
};

/**
 * Establece valor en objeto por path
 */
export const set = <T extends Record<string, any>>(
  obj: T,
  path: string,
  value: any
): T => {
  const keys = path.split(".");
  const result = { ...obj };
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
};
