// core/utils/permission-utils.ts

import { PERMISSION, ROLE_PERMISSIONS } from "../constants";
import { AuthIdentity } from "@/core/types/auth.types";

// Resuelve los permisos efectivos de un usuario basado en su identidad.
export function resolveEffectivePermissions(
  user: AuthIdentity
): readonly PERMISSION[] {
  if (!user) return [];

  // Priorizar permisos explícitos de la identidad (payload de JWT)
  if (user.permissions && user.permissions.length > 0) {
    return user.permissions;
  }

  // Fallback: Usar la asignación estática del rol si la identidad no trae permisos.
  // Esto puede ser útil para roles que no se personalizan.
  return ROLE_PERMISSIONS[user.role] || [];
}

// Verifica si el usuario tiene TODOS los permisos requeridos.
export function hasPermission(
  user: AuthIdentity | null,
  required: PERMISSION | PERMISSION[]
): boolean {
  // Si no hay usuario o no hay permisos requeridos, retorna false.
  if (!user) return false;

  const effectivePermissions = resolveEffectivePermissions(user);
  const effectiveSet = new Set(effectivePermissions);

  const needed = Array.isArray(required) ? required : [required];

  // Verifica que CADA permiso requerido esté en el Set de permisos efectivos
  return needed.every((p) => effectiveSet.has(p));
}

// Verifica si el usuario tiene ALGUNO de los permisos requeridos.
export function hasAnyPermission(
  user: AuthIdentity | null,
  required: PERMISSION | PERMISSION[]
): boolean {
  if (!user) return false;

  const effectivePermissions = resolveEffectivePermissions(user);
  const effectiveSet = new Set(effectivePermissions);

  const needed = Array.isArray(required) ? required : [required];

  // Verifica que AL MENOS UNO de los permisos requeridos esté en el Set de permisos efectivos
  return needed.some((p) => effectiveSet.has(p));
}
