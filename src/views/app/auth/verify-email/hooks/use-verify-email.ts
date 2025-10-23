import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useVerifyEmailMutation } from "@/hooks/api";
import { handleApiError } from "@/lib";
import { VerifyEmailRequest } from "@/models/requests";

export const useVerifyEmail = () => {
  // Router
  const router = useRouter();

  // API calls
  const {
    mutateAsync: verifyEmailAsync,
    isPending: isVerifying,
    error: verifyError,
  } = useVerifyEmailMutation();

  // Computed values
  const error = handleApiError(verifyError).details;

  // Actions
  const handleVerify = async (verifyData: VerifyEmailRequest) => {
    try {
      await verifyEmailAsync(verifyData);
      toast.success("Cuenta verificada exitosamente. Redirigiendo...");
      router.push(`/auth/login`);
    } catch (error) {
      const errorMessage = handleApiError(error).details;
      toast.error(errorMessage);
    }
  };

  return {
    // Loading and error states
    isLoading: isVerifying,
    error,

    // Actions
    actions: {
      handleVerify,
    },
  };
};
