import { toast } from "sonner";

import { useResendCodeMutation } from "@/hooks/api";
import { handleApiError } from "@/lib";

export const useResendCode = () => {
  const {
    mutateAsync: resendCodeAsync,
    isPending: isResending,
    error: resendError,
  } = useResendCodeMutation();

  const handleResend = async (email: string) => {
    try {
      await resendCodeAsync(email);
      toast.success("Código reenviado exitosamente. Revisa tu email.");
    } catch (error) {
      const errorMessage = handleApiError(error).details;
      toast.error(errorMessage);
    }
  };

  return {
    handleResend,
    isLoading: isResending,
    error: handleApiError(resendError).details,
  };
};
