import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui";
import { ProductDetailForCustomerResponse } from "@/models/responses";

interface ProductInfoSectionProps {
  product: ProductDetailForCustomerResponse;
  discountedPrice: (price: string, discount: number) => string;
}

export const ProductInfoSection = ({
  product,
  discountedPrice,
}: ProductInfoSectionProps) => {
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

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Cantidad:</label>
        <div className="flex items-center justify-start space-x-3 bg-gray-50 p-2 rounded-lg w-fit">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="px-4">
            <div className="text-xl font-bold tracking-tighter min-w-[2rem] text-center">
              1
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button className="w-full py-3 text-lg font-semibold">
        Añadir al carro
      </Button>
    </div>
  );
};
