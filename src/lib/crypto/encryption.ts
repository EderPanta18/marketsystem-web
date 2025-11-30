// lib/crypto/encryption.ts

import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "crypto";
import type { DecipherGCM, CipherGCM } from "crypto";

export class EncryptionService {
  private static algorithm = "aes-256-gcm";
  private static keyLength = 32;

  /**
   * Deriva una clave a partir de una contraseña usando scrypt
   */
  private static deriveKey(password: string, salt: Buffer): Buffer {
    return scryptSync(password, salt, this.keyLength);
  }

  /**
   * Encripta un texto usando AES-256-GCM
   */
  static encrypt(text: string, password: string): string {
    const salt = randomBytes(16);
    const key = this.deriveKey(password, salt);
    const iv = randomBytes(12);

    const cipher = createCipheriv(this.algorithm, key, iv) as CipherGCM;

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    // Combinar salt, iv, authTag y texto encriptado
    return Buffer.concat([
      salt,
      iv,
      authTag,
      Buffer.from(encrypted, "hex"),
    ]).toString("base64");
  }

  /**
   * Desencripta un texto usando AES-256-GCM
   */
  static decrypt(encryptedData: string, password: string): string {
    const data = Buffer.from(encryptedData, "base64");

    const salt = data.subarray(0, 16);
    const iv = data.subarray(16, 28);
    const authTag = data.subarray(28, 44);
    const encryptedText = data.subarray(44);

    const key = this.deriveKey(password, salt);

    const decipher = createDecipheriv(this.algorithm, key, iv) as DecipherGCM;
    // Establecer la etiqueta de autenticación antes de llamar a final()
    decipher.setAuthTag(authTag);

    try {
      const decryptedPart = decipher.update(encryptedText);
      const finalPart = decipher.final();
      const decrypted = Buffer.concat([decryptedPart, finalPart]);
      return decrypted.toString("utf8");
    } catch (err) {
      throw new Error(
        "Error de desencriptación: Datos corruptos o contraseña incorrecta"
      );
    }
  }

  /**
   * Genera una clave segura aleatoria
   */
  static generateKey(length: number = 32): string {
    return randomBytes(length).toString("hex");
  }

  /**
   * Encripta un objeto JSON
   */
  static encryptObject<T>(obj: T, password: string): string {
    return this.encrypt(JSON.stringify(obj), password);
  }

  /**
   * Desencripta un objeto JSON
   */
  static decryptObject<T>(encryptedData: string, password: string): T {
    const decrypted = this.decrypt(encryptedData, password);
    return JSON.parse(decrypted) as T;
  }
}

export default EncryptionService;
