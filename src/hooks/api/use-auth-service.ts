import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { loginAction } from "@/lib/actions";
import { LoginRequest } from "@/models/requests";
import { RegisterRequest, VerifyEmailRequest } from "@/models/requests";
import { queryClient } from "@/providers";
import { authService } from "@/services/auth-service";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const result = await loginAction(data);

      if (!result.ok) {
        throw new Error(result.message || "Error al iniciar sesión");
      }

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      window.location.replace("/products");
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await authService.register(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });
};

export const useVerifyEmailMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      await authService.verifyEmail(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/auth/login");
    },
  });
};

export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await authService.resendVerificationCode(email);
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
      queryClient.clear();
    },
    onSuccess: () => {
      toast.success("Sesión cerrada correctamente");
      router.refresh();
    },
  });
};
