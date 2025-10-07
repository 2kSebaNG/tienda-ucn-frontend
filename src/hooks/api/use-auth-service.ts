import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { loginAction } from "@/lib/actions";
import { LoginRequest } from "@/models/requests";
import { authService } from "@/services/auth-service";

import {
  RegisterRequest,
  VerifyEmailRequest,
} from "../../models/requests/auth";

export const useAuth = () => {
  const { data: session, status, update } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      await authService.register(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      await authService.verifyEmail(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      router.push("/auth/login");
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      await authService.resendVerificationCode(email);
    },
  });

  const loginMutation = useMutation({
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

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut({ redirect: false });
      queryClient.clear();
    },
    onSuccess: async () => {
      await update();
    },
  });

  return {
    session,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    isUnauthenticated: status === "unauthenticated",
    user: session?.user,
    updateSession: update,

    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
    registerData: registerMutation.data,
    registerSuccess: registerMutation.isSuccess,

    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    isVerifying: verifyEmailMutation.isPending,
    verifyError: verifyEmailMutation.error,
    verifySuccess: verifyEmailMutation.isSuccess,

    resendCode: resendCodeMutation.mutate,
    resendCodeAsync: resendCodeMutation.mutateAsync,
    isResending: resendCodeMutation.isPending,
    resendError: resendCodeMutation.error,
    resendSuccess: resendCodeMutation.isSuccess,

    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,
    loginSuccess: loginMutation.isSuccess,

    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
  };
};
