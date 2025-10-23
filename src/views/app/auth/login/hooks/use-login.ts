import { toast } from "sonner";

import { useLoginMutation } from "@/hooks/api";

export const useLogin = () => {
  // API Call
  const {
    mutateAsync: loginAsync,
    isPending: isLoginIn,
    error: loginError,
  } = useLoginMutation();

  // Actions
  const handleLogin = async (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    try {
      await loginAsync({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      const apiError = error as Error;
      toast.error(apiError.message);
    }
  };

  return {
    // Loading and error states
    isLoading: isLoginIn,
    error: loginError,

    // Actions
    actions: { handleLogin },
  };
};
