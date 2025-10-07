import { toast } from "sonner";

import { useAuth } from "@/hooks/api";

export const useLogin = () => {
  const { loginAsync, isLoggingIn, loginError } = useAuth();

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
    isLoading: isLoggingIn,
    error: loginError,
  };
};
