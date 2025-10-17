"use client";

import { Suspense } from "react";

import { handleApiError } from "@/lib";
import { ProductForAdminResponse } from "@/models/responses";

import {
  AdminFilterBar,
  AdminProductCard,
  AdminProductCardSkeleton,
  AdminProductsEmptyState,
  AdminProductsErrorState,
  AdminProductsPagination,
} from "./components";
import { useAdminProducts } from "./hooks";

export default function AdminProductsView() {
  const {
    products,
    toggledProductId,
    pagination,
    isLoading,
    error,
    isToggling,
    filters,
    actions,
  } = useAdminProducts();

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className="flex flex-col gap-y-4">
        <h1 className="flex justify-center items-center text-2xl sm:text-5xl p-2 pt-4 italic">
          Productos disponibles
        </h1>

        <AdminFilterBar
          maxPageSize={pagination.totalCount}
          onSearch={actions.handleSearch}
          onPageSizeChange={actions.handleChangePageSize}
          currentPageSize={filters.pageSize ?? 1}
          currentSearch={filters.searchTerm ?? ""}
        />

        {error &&
          !handleApiError(error).message.includes("Producto no encontrado") && (
            <AdminProductsErrorState
              error={handleApiError(error).details}
              canRetry={handleApiError(error).canRetry}
              onRetry={actions.handleRetry}
            />
          )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mb-5">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <AdminProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            products.map((product: ProductForAdminResponse) => (
              <AdminProductCard
                key={product.id}
                product={product}
                onToggleAvailability={actions.handleToggleProductAvailability}
                isToggling={
                  isToggling && toggledProductId === product.id.toString()
                }
              />
            ))
          )}
        </div>

        <AdminProductsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageNumbers={pagination.pageNumbers}
          onPreviousPage={actions.handlePreviousPage}
          onNextPage={actions.handleNextPage}
          onPageClick={actions.handlePageClick}
        />

        {products.length === 0 &&
          !isLoading &&
          handleApiError(error).message.includes("Producto no encontrado") && (
            <AdminProductsEmptyState />
          )}
      </div>
    </Suspense>
  );
}
