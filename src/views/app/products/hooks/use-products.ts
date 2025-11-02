import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

import { useGetProductsForCustomer } from "@/hooks/api";
import { PaginationQueryParams } from "@/models/requests";

export const useProducts = () => {
  // State
  const [filters, setFilters] = useState<PaginationQueryParams>({
    pageNumber: 1,
    pageSize: 10,
    searchTerm: "",
  });

  const router = useRouter();

  // API calls
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useGetProductsForCustomer(filters);

  // Computed values
  const productsData = queryData?.data;
  const products = productsData?.products ?? [];
  const totalPages = productsData?.totalPages ?? 0;
  const totalCount = productsData?.totalCount ?? 0;
  const currentPage = productsData?.currentPage ?? 1;

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

  const handleRedirectToProductDetail = (productId: number) => {
    router.push(`/products/${productId}`);
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
    // Product data
    products,
    pagination: {
      totalPages,
      totalCount,
      currentPage,
      pageNumbers,
    },

    // Loading and error states
    isLoading,
    error,

    // Filter state
    filters,

    // Actions
    actions: {
      handleSearch,
      handleChangePageSize,
      handleRedirectToProductDetail,
      handlePreviousPage,
      handleNextPage,
      handlePageClick,
      handleRetry,
    },
  };
};
