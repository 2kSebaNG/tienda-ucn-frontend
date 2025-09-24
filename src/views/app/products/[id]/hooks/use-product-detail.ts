import { useRouter } from "next/navigation";

import { useGetProductDetail } from "@/hooks/api";
import { getErrorDetails } from "@/lib";

export const useProductDetail = (id: string) => {
  // State
  const router = useRouter();

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductDetail(id);

  // Computed values
  const productDetail = queryData?.data;
  const errorDetails = error ? getErrorDetails(error) : null;

  // Actions
  const handleGoToProducts = () => {
    router.push("/products");
  };

  const handleRetry = () => {
    if (errorDetails?.canRetry) {
      refetch();
    }
  };

  const handleCalculateDiscountedPrice = (price: string, discount: number) => {
    return (parseFloat(price) * (1 - discount)).toFixed(2);
  };

  return {
    // Data
    productDetail,
    isLoading,
    error,

    // Actions
    actions: {
      handleGoToProducts,
      handleRetry,
      handleCalculateDiscountedPrice,
    },
  };
};
