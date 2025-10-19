"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

import { useLogin } from "../hooks";

const formSchema = z.object({
  email: z.email({ message: "Ingrese un correo válido" }),
  password: z.string().min(1, "La contraseña es obligatoria"),
  rememberMe: z.boolean(),
});

export function LoginForm() {
  const { handleLogin, isLoading, error } = useLogin();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onTouched",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    handleLogin(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="correo@ejemplo.com"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <Tooltip>
              <FormItem className="flex flex-row items-start space-y-0">
                <FormControl>
                  <Checkbox
                    className="cursor-pointer"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <TooltipTrigger>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Recordarme</FormLabel>
                  </div>
                </TooltipTrigger>
                <FormMessage />
              </FormItem>
              <TooltipContent side="right">
                <p>
                  Si selecciona esta opción, su sesión se mantendrá activa
                  durante 1 día.
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        />

        {error && error.message.includes("no ha sido confirmado") && (
          <div className="text-sm text-yellow-800 text-center">
            Tu cuenta no ha sido confirmada. Revisa tu correo para el enlace de
            confirmación y{" "}
            <span className="text-blue-600 underline">
              <Link
                href={`/auth/verify-email?email=${encodeURIComponent(form.getValues("email"))}`}
              >
                verifica tu cuenta
              </Link>
            </span>
          </div>
        )}
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className={`w-full ${isLoading ? "cursor-wait" : "cursor-pointer"}`}
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Link
            href="/auth/register"
            className="text-primary hover:underline font-medium"
          >
            Regístrate aquí
          </Link>
        </div>
      </form>
    </Form>
  );
}
