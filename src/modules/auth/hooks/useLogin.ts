// modules/auth/hooks/useLogin.ts

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getErrorMessage } from "@/core/utils";
import { SYSTEM_ROUTE } from "@/core/constants";
import { AuthService } from "@/services/auth";
import type { LoginFormValues } from "../schemas";

export function useLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const login = async (values: LoginFormValues) => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const payload = {
      username: values.username,
      password: values.password,
    };

    const result = await AuthService.login(payload);

    if (!result.ok) {
      const error = result.error;
      const message = error.code
        ? getErrorMessage(error.code, "Login fallido")
        : error.message;
      setErrorMessage(message);
    } else {
      const data = result.data;
      setSuccessMessage(data.message || "Login exitoso");
      router.replace(SYSTEM_ROUTE.DASHBOARD);
    }

    setLoading(false);
    return result;
  };

  return { login, loading, errorMessage, successMessage };
}
