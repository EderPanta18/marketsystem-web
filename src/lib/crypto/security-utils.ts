// lib/crypto/security-utils.ts

import * as crypto from "crypto";

export class SecurityUtils {
  /**
   * Genera un nonce seguro para CSP (Content Security Policy)
   */
  static generateNonce(length: number = 16): string {
    return crypto.randomBytes(length).toString("base64");
  }

  /**
   * Genera un token CSRF seguro
   */
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Crea un hash seguro para verificación de integridad
   */
  static createHash(
    data: string | Buffer,
    algorithm: string = "sha256"
  ): string {
    const hash = crypto.createHash(algorithm);
    hash.update(typeof data === "string" ? data : data.toString());
    return hash.digest("hex");
  }

  /**
   * Genera un salt criptográficamente seguro
   */
  static generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString("hex");
  }

  /**
   * Comparación segura en tiempo para prevenir timing attacks
   */
  static timingSafeEqual(a: string, b: string): boolean {
    try {
      const aBuffer = Buffer.from(a, "utf8");
      const bBuffer = Buffer.from(b, "utf8");
      return (
        aBuffer.length === bBuffer.length &&
        crypto.timingSafeEqual(aBuffer, bBuffer)
      );
    } catch {
      return false;
    }
  }

  /**
   * Enmascara datos sensibles de forma genérica
   */
  static maskData(
    data: string,
    visibleStart: number = 4,
    visibleEnd: number = 4,
    maskChar: string = "*"
  ): string {
    if (data.length <= visibleStart + visibleEnd) {
      return maskChar.repeat(data.length);
    }

    const start = data.substring(0, visibleStart);
    const end = data.substring(data.length - visibleEnd);
    const maskedLength = data.length - visibleStart - visibleEnd;

    return `${start}${maskChar.repeat(maskedLength)}${end}`;
  }

  /**
   * Valida si un string es base64 válido
   */
  static isValidBase64(str: string): boolean {
    try {
      // Buffer round-trip is safe and works in Node and browsers
      return Buffer.from(str, "base64").toString("base64") === str;
    } catch {
      return false;
    }
  }

  /**
   * Escapa caracteres especiales para uso seguro en regex
   */
  static escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /**
   * Genera un identificador único seguro
   */
  static generateUUID(): string {
    const bytes = crypto.randomBytes(16);
    // Per RFC 4122 v4
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = bytes.toString("hex");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
      12,
      16
    )}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }

  /**
   * Valida formato de UUID
   */
  static isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Convierte string a Buffer de forma segura
   */
  static toBuffer(data: string): Buffer {
    return Buffer.from(data, "utf8");
  }

  /**
   * Convierte Buffer a string de forma segura
   */
  static fromBuffer(buffer: Buffer): string {
    return buffer.toString("utf8");
  }

  /**
   * Limpia y normaliza string (elimina caracteres de control)
   */
  static normalizeString(str: string): string {
    return str.replace(/[\x00-\x1F\x7F-\x9F]/g, "").trim();
  }
}

export default SecurityUtils;
