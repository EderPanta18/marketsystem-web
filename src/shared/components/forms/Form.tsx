// shared/components/forms/Form.tsx

import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import type { FormHTMLAttributes, ReactNode } from "react";

interface FormProps<T extends FieldValues>
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "children"> {
  methods: UseFormReturn<T>;
  onSubmit: (values: T) => void | Promise<void>;
  children: ReactNode;
}

export const Form = <T extends FieldValues>({
  methods,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
