import { toast } from "sonner";

import { useLoginMutation } from "@/hooks/api";

export const useLogin = () => {
  const {
    mutateAsync: loginAsync,
    isPending: isLoginIn,
    error: loginError,
  } = useLoginMutation();

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
    } catch (error) {}
  };

  return {
    handleLogin,
    isLoading: isLoginIn,
    error: loginError,
  };
};
