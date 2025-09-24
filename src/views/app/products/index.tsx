"use client";

import { Suspense } from "react";

import { ProductForCustomerResponse } from "@/models/responses";

import {
  FilterBar,
  ProductCard,
  ProductCardSkeleton,
  ProductsEmptyState,
  ProductsErrorState,
  ProductsPagination,
} from "./components";
import { useProducts } from "./hooks";

export default function ProductsView() {
  const { products, pagination, isLoading, error, filters, actions } =
    useProducts();

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <div className="flex flex-col gap-y-4">
        <h1 className="flex justify-center items-center text-5xl p-2 pt-4 italic">
          Productos disponibles
        </h1>

        <FilterBar
          maxPageSize={pagination.totalCount}
          onSearch={actions.handleSearch}
          onPageSizeChange={actions.handleChangePageSize}
          currentPageSize={filters.pageSize ?? 1}
          currentSearch={filters.searchTerm ?? ""}
        />

        {error && (
          <ProductsErrorState error={error} onRetry={actions.handleRetry} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-5 mb-5">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            products.map((product: ProductForCustomerResponse) => (
              <ProductCard
                key={product.id}
                product={product}
                isPriority={product.mainImageURL.includes("default")}
                onClick={() =>
                  actions.handleRedirectToProductDetail(product.id)
                }
              />
            ))
          )}
        </div>

        <ProductsPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          pageNumbers={pagination.pageNumbers}
          onPreviousPage={actions.handlePreviousPage}
          onNextPage={actions.handleNextPage}
          onPageClick={actions.handlePageClick}
        />

        {products.length === 0 && !isLoading && <ProductsEmptyState />}
      </div>
    </Suspense>
  );
}
