import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

import { handleApiError } from "@/lib";
import { LoginRequest } from "@/models/requests";
import { RegisterRequest, VerifyEmailRequest } from "@/models/requests";
import { queryClient } from "@/providers";
import { authService } from "@/services/auth-service";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      try {
        const response = await authService.login({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        });

        const result = await signIn("credentials", {
          email: data.email,
          token: response.data.data,
          redirect: false,
        });

        if (!result?.ok) {
          throw new Error("Error al crear la sesión");
        }

        return result;
      } catch (error) {
        const apiError = handleApiError(error);
        throw new Error(apiError.details);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.replace("/products");
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
