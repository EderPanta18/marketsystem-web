"use client";

// modules/auth/components/LoginForm.tsx

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/shared/components/forms";
import { FormLayout } from "@/ui/layouts";
import { FormField } from "@/ui/molecules";
import { Input, Button } from "@/ui/atoms";
import { loginSchema, type LoginFormValues } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

export const LoginForm: React.FC = () => {
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login, loading, errorMessage, successMessage } = useLogin();

  const handleSubmit = async (values: LoginFormValues) => {
    await login(values);
  };

  const errors = methods.formState.errors;

  return (
    <Form<LoginFormValues> methods={methods} onSubmit={handleSubmit}>
      <FormLayout
        headerTitle={
          <span className="text-3xl text-sky-700 font-semibold">
            Iniciar Sesión
          </span>
        }
        headerDescription="Por favor, ingresa tus credenciales para acceder."
        variant="boxed"
        errorMessage={errorMessage!}
        successMessage={successMessage!}
        actions={
          <Button
            type="submit"
            fullWidth
            colorScheme="primary"
            loading={loading || methods.formState.isSubmitting}
          >
            Iniciar Sesión
          </Button>
        }
      >
        <FormField
          label="Nombre de usuario"
          required
          showAsterisk
          error={errors.username?.message}
        >
          <Input {...methods.register("username")} />
        </FormField>

        <FormField
          label="Contraseña"
          required
          showAsterisk
          error={errors.password?.message}
        >
          <Input type="password" {...methods.register("password")} />
        </FormField>
      </FormLayout>
    </Form>
  );
};

export default LoginForm;
