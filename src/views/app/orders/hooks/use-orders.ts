import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

import { useGetOrdersList } from "@/hooks/api";
import { useOrderPDF } from "@/hooks/common";
import { handleApiError } from "@/lib";
import { PaginationQueryParams } from "@/models/requests";

export const useOrders = () => {
  // State
  const [filters, setFilters] = useState<PaginationQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
  });

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
  } = useGetOrdersList(filters);

  // Computed values
  const ordersData = queryData?.data;
  const orders = ordersData?.orders ?? [];
  const totalPages = ordersData?.totalPages ?? 0;
  const totalCount = ordersData?.totalCount ?? 0;
  const currentPage = ordersData?.currentPage ?? 1;
  const hasOrders = orders.length > 0;

  // Helpers
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        pages.push(2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push("...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = totalPages > 1 ? generatePageNumbers() : [];

  const obtainErrorDetails = () => {
    if (!error) return null;

    return handleApiError(error);
  };

  // Actions
  const handleUpdateFilters = (newFilters: Partial<PaginationQueryParams>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleGoToPage = (page: number) => {
    handleUpdateFilters({ pageNumber: page });
  };

  const handleSearch = (searchTerm: string) => {
    handleUpdateFilters({ searchTerm, pageNumber: 1 });
  };

  const handleChangePageSize = (pageSize: number) => {
    handleUpdateFilters({ pageSize, pageNumber: 1 });
  };

  const handleViewOrderDetail = (orderId: string) => {
    router.push(`/orders/order/${orderId}`);
  };

  const handleDownloadPDF = async (orderCode: string) => {
    try {
      const order = orders.find(o => o.code === orderCode);
      if (!order) {
        toast.error("No se encontró la orden");
        return;
      }
      await generateOrderPDF(order);
    } catch (error) {
      toast.error("Error al descargar el PDF");
    }
  };

  const handlePreviousPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage > 1) {
      handleGoToPage(currentPage - 1);
    }
  };

  const handleNextPage = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      handleGoToPage(currentPage + 1);
    }
  };

  const handlePageClick = (
    e: MouseEvent<HTMLAnchorElement>,
    pageNum: number
  ) => {
    e.preventDefault();
    handleGoToPage(pageNum);
  };

  const handleRetry = () => {
    refetch();
  };

  return {
    // Order data
    orders,
    hasOrders,
    pagination: {
      totalPages,
      totalCount,
      currentPage,
      pageNumbers,
    },

    // Loading and error states
    isLoading,
    error: obtainErrorDetails(),

    // Filter state
    filters,

    // Actions
    actions: {
      handleSearch,
      handleChangePageSize,
      handleViewOrderDetail,
      handleDownloadPDF,
      handlePreviousPage,
      handleNextPage,
      handlePageClick,
      handleRetry,
    },
  };
};
