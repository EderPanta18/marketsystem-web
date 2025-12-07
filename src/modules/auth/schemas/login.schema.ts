// modules/auth/schemas/login.schema.ts

import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("El nombre de usuario es obligatorio")
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  password: z
    .string()
    .nonempty("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
