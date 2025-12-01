// core/utils/role-utils.ts

import { ROLE, ROLE_HIERARCHY } from "../constants";
import { AuthIdentity } from "../types";

// Verifica si el rol del usuario coincide con el rol requerido o está en la lista de roles requeridos.
export function hasRole(user: AuthIdentity, required: ROLE | ROLE[]): boolean {
  const userRole = user.role;
  const needed = Array.isArray(required) ? required : [required];

  // Utilizamos includes directamente ya que user.role es de tipo ROLE
  return needed.includes(userRole);
}

// Verifica si el rol del usuario tiene al menos el nivel del rol requerido según la jerarquía definida.
export function hasRoleAtLeast(user: AuthIdentity, required: ROLE): boolean {
  const userRole = user.role;
  // ROLE_HIERARCHY contiene el rol actual y todos los roles que puede gestionar (hijos).
  const hierarchy = ROLE_HIERARCHY[userRole] ?? [];

  return hierarchy.includes(required);
}

// Verifica si un código de rol es válido.
export function isValidRole(roleCode: string): boolean {
  // Verificamos si la clave existe en el objeto de jerarquía de roles.
  return roleCode in ROLE_HIERARCHY;
}
