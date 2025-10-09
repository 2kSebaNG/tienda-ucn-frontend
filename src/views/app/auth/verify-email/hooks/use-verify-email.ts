import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useVerifyEmailMutation } from "@/hooks/api";
import { handleApiError } from "@/lib";
import { VerifyEmailRequest } from "@/models/requests";

export const useVerifyEmail = () => {
  const {
    mutateAsync: verifyEmailAsync,
    isPending: isVerifying,
    error: verifyError,
  } = useVerifyEmailMutation();

  const router = useRouter();

  const handleVerify = async (verifyData: VerifyEmailRequest) => {
    try {
      await verifyEmailAsync(verifyData);
      toast.success("Cuenta verificada exitosamente. Redirigiendo...");
      router.push(`/auth/login`);
    } catch (error) {}
  };

  return {
    handleVerify,
    isLoading: isVerifying,
    error: handleApiError(verifyError).details,
  };
};
