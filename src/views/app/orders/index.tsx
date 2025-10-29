"use client";

import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import {
  OrdersErrorState,
  OrdersFilterBar,
  OrdersPagination,
  OrdersTable,
  OrdersTableEmptyState,
  OrdersTableSkeleton,
} from "./components";
import { useOrders } from "./hooks";

export default function OrdersView() {
  const {
    orders,
    hasOrders,
    pagination,
    isLoading,
    error,
    filters,
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
  } = useOrders();

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" className="mb-4 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Mis Órdenes</h1>
        </div>
        <p className="text-muted-foreground">
          Gestiona y revisa todas tus órdenes de compra
        </p>
      </div>

      {/* Filter Bar */}
      <div className="mb-6">
        <OrdersFilterBar
          onSearch={handleSearch}
          onPageSizeChange={handleChangePageSize}
          currentPageSize={filters.pageSize ?? 1}
          currentSearch={filters.searchTerm ?? ""}
          maxPageSize={pagination.totalCount}
        />
      </div>

      {/* Content */}
      <div className="mb-6">
        {isLoading ? (
          <OrdersTableSkeleton />
        ) : error ? (
          <OrdersErrorState
            onRetry={handleRetry}
            canRetry={error.canRetry}
            errorDetail={error.details || "Error desconocido"}
          />
        ) : !hasOrders ? (
          <OrdersTableEmptyState />
        ) : (
          <OrdersTable
            orders={orders}
            onViewDetail={handleViewOrderDetail}
            onDownloadPDF={handleDownloadPDF}
          />
        )}
      </div>

      {/* Pagination Info & Controls */}
      {!isLoading && !error && hasOrders && (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Mostrando {orders.length} de {pagination.totalCount} órdenes
          </p>
          <OrdersPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageNumbers={pagination.pageNumbers}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageClick={handlePageClick}
          />
        </div>
      )}
    </div>
  );
}
