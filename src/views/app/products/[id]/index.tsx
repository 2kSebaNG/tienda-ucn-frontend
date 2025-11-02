"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui";
import { handleApiError } from "@/lib";

import {
  ProductDetailEmptyState,
  ProductDetailsTable,
  ProductErrorState,
  ProductImageCarousel,
  ProductInfoSection,
  ProductLoadingState,
} from "./components";
import { useProductDetail } from "./hooks";

interface ProductDetailViewProps {
  id: string;
}

export default function ProductDetailView({ id }: ProductDetailViewProps) {
  const { productDetail, isLoading, error, actions } = useProductDetail(id);

  if (isLoading) {
    return <ProductLoadingState />;
  }

  if (error) {
    return (
      <ProductErrorState
        error={handleApiError(error).details}
        canRetry={handleApiError(error).canRetry}
        onRetry={actions.handleRetry}
      />
    );
  }

  if (!productDetail) {
    return <ProductDetailEmptyState />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex items-center">
        <Button
          variant="outline"
          onClick={actions.handleGoToProducts}
          className="flex items-center space-x-2 hover:bg-gray-50 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImageCarousel images={productDetail.imagesURL} />
        <ProductInfoSection
          product={productDetail}
          discountedPrice={actions.handleCalculateDiscountedPrice}
        />
      </div>

      <ProductDetailsTable product={productDetail} />
    </div>
  );
}
