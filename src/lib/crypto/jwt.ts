// lib/crypto/jwt.ts

import { jwtVerify, SignJWT, type JWTPayload } from "jose";

export class JWTService {
  /**
   * Convierte la clave secreta a Uint8Array
   */
  private static getJwtSecret(secretKey: string): Uint8Array {
    if (!secretKey) {
      throw new Error("Secret key no proporcionada");
    }
    return new TextEncoder().encode(secretKey.trim());
  }

  /**
   * Verifica y decodifica un token JWT con una clave específica
   */
  static async verifyAndDecodeToken<T = JWTPayload>(
    token: string,
    secretKey: string
  ): Promise<T | null> {
    try {
      const { payload } = await jwtVerify(token, this.getJwtSecret(secretKey), {
        algorithms: ["HS256"],
      });
      return payload as T;
    } catch (error) {
      console.error("Verificación de token fallida:", error);
      return null;
    }
  }

  /**
   * Crea un nuevo token JWT con una clave específica
   */
  static async createToken(
    payload: JWTPayload,
    secretKey: string,
    expiresIn: string = "15m"
  ): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(expiresIn)
      .setIssuedAt()
      .sign(this.getJwtSecret(secretKey));
  }

  /**
   * Verifica un token sin decodificar el payload
   */
  static async verifyToken(token: string, secretKey: string): Promise<boolean> {
    try {
      await jwtVerify(token, this.getJwtSecret(secretKey), {
        algorithms: ["HS256"],
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Decodifica un token sin verificar la firma (solo para debugging)
   */
  static decodeToken<T = JWTPayload>(token: string): T | null {
    try {
      const payload = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      ) as T;
      return payload;
    } catch {
      return null;
    }
  }
}

// Exportación para compatibilidad con tu código existente
export async function verifyAndDecodeToken<T = Record<string, unknown>>(
  token: string,
  secretKey: string
): Promise<T | null> {
  return JWTService.verifyAndDecodeToken<T>(token, secretKey);
}

// Exportación por defecto
export default JWTService;
