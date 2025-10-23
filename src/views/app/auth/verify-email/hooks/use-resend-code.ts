import { toast } from "sonner";

import { useResendCodeMutation } from "@/hooks/api";
import { handleApiError } from "@/lib";

export const useResendCode = () => {
  // API Call
  const { mutateAsync: resendCodeAsync, isPending: isResending } =
    useResendCodeMutation();

  // Actions
  const handleResend = async (email: string) => {
    try {
      await resendCodeAsync(email);
      toast.success("Código reenviado exitosamente. Revisa tu email.");
    } catch (error) {
      const errorMessage = handleApiError(error).details;

      if (errorMessage?.includes("Object")) {
        toast.error(
          "Su cuenta ha sido deshabilitada. Contacte al administrador o cree una nueva cuenta."
        );
      } else {
        toast.error(
          errorMessage || "Error al reenviar el código. Inténtalo de nuevo."
        );
      }
    }
  };

  return {
    isLoading: isResending,
    actions: {
      handleResend,
    },
  };
};
