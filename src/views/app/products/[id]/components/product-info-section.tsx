"use client";

import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui";
import { ProductDetailForCustomerResponse } from "@/models/responses";

import { useProductDetailCart } from "../hooks";

interface ProductInfoSectionProps {
  product: ProductDetailForCustomerResponse;
  discountedPrice: (price: string, discount: number) => string;
}

export const ProductInfoSection = ({
  product,
  discountedPrice,
}: ProductInfoSectionProps) => {
  const {
    localQuantity,
    isInCart,
    hasChanges,
    isAdding,
    buttonText,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleResetQuantity,
    handleSetMax,
  } = useProductDetailCart({
    productId: product.id,
    productTitle: product.title,
    maxStock: product.stock,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Información del Producto
      </h2>

      {/* Brand and Title */}
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">
          {product.brandName || "Marca no disponible"}
        </h2>
        <h1 className="text-2xl text-gray-700">
          {product.title || "Título no disponible"}
        </h1>
      </div>

      {/* Price Section */}
      <div className="space-y-1">
        {product.discount ? (
          <div className="flex items-center space-x-2">
            <h3 className="text-2xl font-bold text-green-600">
              {discountedPrice(product.price, product.discount)}
            </h3>
            <h4 className="text-lg line-through text-gray-500">
              {product.price}
            </h4>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
              -{Math.round(product.discount * 100)}%
            </span>
          </div>
        ) : (
          <h3 className="text-2xl font-bold text-blue-600">{product.price}</h3>
        )}
      </div>

      {/* Stock Info */}
      <div className="text-sm text-gray-600">
        {product.stock > 0 ? (
          <span>Stock disponible: {product.stock} unidades</span>
        ) : (
          <span className="text-red-600 font-semibold">Sin stock</span>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Cantidad:</label>
        <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg w-fit">
          {/* Reset + Decrement */}
          <div className="flex items-center space-x-1">
            <Button
              variant="link"
              size="sm"
              className="text-gray-800 hover:text-gray-900 cursor-pointer"
              onClick={handleResetQuantity}
              disabled={localQuantity === 1 || isAdding}
            >
              Reset
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full cursor-pointer"
              onClick={handleDecrement}
              disabled={localQuantity <= 1 || isAdding}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Disminuir</span>
            </Button>
          </div>

          {/* Current quantity */}
          <div className="px-4">
            <div className="text-xl font-bold tracking-tighter min-w-[2rem] text-center">
              {localQuantity}
            </div>
          </div>

          {/* Increment + Max */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full cursor-pointer"
              onClick={handleIncrement}
              disabled={localQuantity >= product.stock || isAdding}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Aumentar</span>
            </Button>

            <Button
              variant="link"
              size="sm"
              className="text-gray-800 hover:text-gray-900 cursor-pointer"
              onClick={handleSetMax}
              disabled={localQuantity === product.stock || isAdding}
            >
              Max
            </Button>
          </div>
        </div>

        {/* Visual indicator if in cart */}
        {isInCart && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Check className="h-3 w-3" />
            Este producto está en tu carrito
            {hasChanges && " - Cantidad modificada"}
          </p>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        className="w-full py-3 text-lg font-semibold cursor-pointer"
        onClick={handleAddToCart}
        disabled={product.stock === 0 || isAdding || (isInCart && !hasChanges)}
      >
        <ShoppingCart className="mr-2 h-5 w-5" />
        {buttonText}
      </Button>

      {/* Additional info */}
      {isInCart && !hasChanges && (
        <p className="text-xs text-center text-muted-foreground">
          Modifica la cantidad para actualizar el carrito
        </p>
      )}
    </div>
  );
};
