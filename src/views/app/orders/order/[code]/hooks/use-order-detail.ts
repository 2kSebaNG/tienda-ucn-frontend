import { useRouter } from "next/navigation";

import { useGetOrderDetail } from "@/hooks/api";
import { useOrderPDF } from "@/hooks/common";
import { handleApiError } from "@/lib";

export const useOrderDetail = (orderId: string) => {
  // Router
  const router = useRouter();

  // PDF Generator
  const { generateOrderPDF } = useOrderPDF();

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetail(orderId);

  // Computed values
  const orderData = queryData?.data;
  const order = orderData;
  const items = order?.items ?? [];
  const subTotalPrice = order?.subTotal ?? "";
  const totalPrice = order?.total ?? "";
  const orderCode = order?.code ?? "";
  const createdAt = order?.purchasedAt ?? "";
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // Helpers
  const obtainErrorDetails = () => {
    if (!error) return null;

    return handleApiError(error);
  };

  // Actions
  const handleDownloadPDF = async () => {
    if (!order || !items.length) return;

    await generateOrderPDF({
      code: order.code,
      purchasedAt: order.purchasedAt,
      items: items,
      total: order.total,
      subTotal: order.subTotal,
    });
  };

  const handleGoBack = () => {
    router.push("/orders");
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    // Order data
    order: {
      code: orderCode,
      createdAt,
      subTotalPrice,
      totalPrice,
      totalItems,
    },
    items,

    // Loading and error states
    isLoading,
    error: obtainErrorDetails(),

    // Actions
    actions: {
      handleDownloadPDF,
      handleGoBack,
      handleRetry,
    },
  };
};
