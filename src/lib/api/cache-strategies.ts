// lib/api/cache-strategies.ts

import { APP_CONFIG } from "@/core/config";

export interface CacheOptions {
  ttl: number; // Tiempo de vida en ms
  key: string;
}

export class CacheStrategy {
  private static cache = new Map<string, { data: any; expiry: number }>();

  static set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });

    // Logging en desarrollo
    if (APP_CONFIG.IS_DEVELOPMENT) {
      console.log(`Cache creada: ${key}`, { ttl, expiry });
    }
  }

  static get<T>(key: string): T | null {
    const cached = this.cache.get(key);

    if (!cached) {
      return null;
    }

    // Check expiry
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);

      if (APP_CONFIG.IS_DEVELOPMENT) {
        console.log(`Cache expirada: ${key}`);
      }

      return null;
    }

    if (APP_CONFIG.IS_DEVELOPMENT) {
      console.log(`Cache accedida: ${key}`);
    }

    return cached.data as T;
  }

  static delete(key: string): void {
    this.cache.delete(key);

    if (APP_CONFIG.IS_DEVELOPMENT) {
      console.log(`Cache eliminada: ${key}`);
    }
  }

  static clear(): void {
    this.cache.clear();

    if (APP_CONFIG.IS_DEVELOPMENT) {
      console.log("Cache limpiada completamente");
    }
  }
}

// Estrategias de cache específicas
export const CacheStrategies = {
  // Cache de corta duración (1 minuto)
  SHORT: 60 * 1000,

  // Cache de media duración (5 minutos)
  MEDIUM: 5 * 60 * 1000,

  // Cache de larga duración (15 minutos)
  LONG: 15 * 60 * 1000,

  // Cache de sesión (mientras la app esté abierta)
  SESSION: Number.MAX_SAFE_INTEGER,
};
