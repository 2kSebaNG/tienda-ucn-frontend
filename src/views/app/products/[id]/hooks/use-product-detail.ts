import { useRouter } from "next/navigation";

import { useGetProductDetail } from "@/hooks/api";

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

  // Actions
  const handleGoToProducts = () => {
    router.push("/products");
  };

  const handleRetry = () => {
    refetch();
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
