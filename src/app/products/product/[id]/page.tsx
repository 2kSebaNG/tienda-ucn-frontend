import { Metadata } from "next";
import { notFound } from "next/navigation";

import { productService } from "@/services";
import { SingleProductView } from "@/views/app/products/[id]";

interface SingleProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const { id } = await params;

  const response = await getProductDetail(id);
  const productDetail = response.data;

  if (!productDetail) {
    return {
      title: "Producto no encontrado - Tienda UCN",
      description: "El producto que buscas no está disponible.",
    };
  }

  return {
    title: `${productDetail.brandName} | ${productDetail.title} - Tienda UCN`,
    description: `Detalles del producto ${productDetail.title} en Tienda UCN.`,
  };
}

const getProductDetail = async (id: string) => {
  try {
    const productDetail = await productService.getProductDetail(id);
    return productDetail.data;
  } catch {
    notFound();
  }
};

export default async function SingleProductPage({
  params,
}: SingleProductPageProps) {
  const { id } = await params;

  return <SingleProductView id={id} />;
}
