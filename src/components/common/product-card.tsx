"use client";

import Image from "next/image";
import { Button } from "@/components";
import { Product } from "@/models/product";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`Producto ${product.name} agregado al carrito.`);
  };

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="mt-2 text-blue-700 font-bold text-xl">${product.price}</p>
        <Button className="mt-4 w-full" onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};
