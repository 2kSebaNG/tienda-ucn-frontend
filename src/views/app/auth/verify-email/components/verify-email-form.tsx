"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui";

import { useResendCode, useVerifyEmail } from "../hooks";

const formSchema = z.object({
  email: z.email("El correo electrónico no es válido"),
  verificationCode: z.string().length(6, "El código debe tener 6 caracteres"),
});

interface Props {
  email?: string;
}

export function VerifyEmailForm({ email }: Props) {
  const {
    isLoading: isVerifying,
    error: verifyError,
    actions: { handleVerify },
  } = useVerifyEmail();
  const {
    isLoading: isResending,
    actions: { handleResend },
  } = useResendCode();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      verificationCode: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await handleVerify({
      email: values.email,
      verificationCode: values.verificationCode,
    });
  };

  const onResend = async () => {
    await handleResend(form.getValues("email"));
  };

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
                  type="email"
                  placeholder="correo@ejemplo.com"
                  {...field}
                  disabled={isVerifying}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de verificación</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  {...field}
                  disabled={isVerifying}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {verifyError && verifyError.includes("ya ha sido verificado") && (
          <div className="text-sm text-red-600">
            {verifyError}{" "}
            <span className="font-semibold underline">
              <Link href={`/auth/login`}>Inicia sesión para continuar</Link>
            </span>
          </div>
        )}

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className={`w-full ${isVerifying ? "cursor-wait" : "cursor-pointer"}`}
            disabled={isVerifying || isResending || !form.formState.isValid}
          >
            Ingresar
          </Button>
        </div>

        {/* Resend section */}
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm text-muted-foreground">
            ¿No recibiste el código o ya expiró?
          </p>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={onResend}
            disabled={isResending || isVerifying}
            className={`h-auto p-0 ${isResending ? "cursor-wait" : "cursor-pointer"}`}
          >
            {isResending ? "Reenviando..." : "Reenviar código"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
