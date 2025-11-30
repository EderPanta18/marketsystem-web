// lib/crypto/hashing.ts

import { createHash, randomBytes, scrypt, timingSafeEqual } from "crypto";

export class HashingService {
  private static saltLength = 16;
  private static keyLength = 64;

  /**
   * Crea un hash SHA-256
   */
  static sha256(data: string): string {
    return createHash("sha256").update(data).digest("hex");
  }

  /**
   * Crea un hash MD5 (solo para uso interno, no para contraseñas)
   */
  static md5(data: string): string {
    return createHash("md5").update(data).digest("hex");
  }

  /**
   * Hashea una contraseña usando scrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(this.saltLength).toString("hex");

      scrypt(password, salt, this.keyLength, (err, derivedKey) => {
        if (err) reject(err);
        resolve(`${salt}:${derivedKey.toString("hex")}`);
      });
    });
  }

  /**
   * Verifica una contraseña contra un hash
   */
  static async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":");
      const keyBuffer = Buffer.from(key, "hex");

      scrypt(password, salt, this.keyLength, (err, derivedKey) => {
        if (err) reject(err);
        resolve(timingSafeEqual(keyBuffer, derivedKey));
      });
    });
  }

  /**
   * Crea un HMAC (Hash-based Message Authentication Code)
   */
  static hmac(data: string, secret: string): string {
    return createHash("sha256")
      .update(data + secret)
      .digest("hex");
  }

  /**
   * Genera un token seguro aleatorio
   */
  static generateToken(length: number = 32): string {
    return randomBytes(length).toString("hex");
  }

  /**
   * Crea un hash para verificación de integridad
   */
  static createChecksum(data: string | object): string {
    const dataString = typeof data === "string" ? data : JSON.stringify(data);
    return this.sha256(dataString);
  }

  /**
   * Verifica la integridad de los datos usando checksum
   */
  static verifyChecksum(data: string | object, checksum: string): boolean {
    return this.createChecksum(data) === checksum;
  }
}

export default HashingService;
