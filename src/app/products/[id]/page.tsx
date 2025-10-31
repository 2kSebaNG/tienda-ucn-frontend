import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { isValidId } from "@/lib";
import { productService } from "@/services";
import { ProductDetailView } from "@/views";

interface SingleProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: SingleProductPageProps): Promise<Metadata> {
  const { id } = await params;

  if (!isValidId(id)) {
    return notFound();
  }

  try {
    const response = await productService.getProductDetail(id);
    const productDetail = response.data.data;

    if (!productDetail) {
      return {
        title: "Producto no disponible | Tienda UCN",
        description: "Este producto no está disponible en este momento.",
      };
    }

    return {
      title: `${productDetail.brandName} ${productDetail.title} | Tienda UCN`,
      description: productDetail.description,
    };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        return {
          title: "Producto no encontrado | Tienda UCN",
          description: "El producto que buscas no existe.",
        };
      }
      return {
        title: "Error al cargar el producto | Tienda UCN",
        description: "Hubo un error al cargar el producto.",
      };
    }

    return {
      title: "Error al cargar el producto | Tienda UCN",
      description: "Hubo un error al cargar el producto.",
    };
  }
}

export default async function SingleProductPage({
  params,
}: SingleProductPageProps) {
  const { id } = await params;

  if (!isValidId(id)) {
    return notFound();
  }

  const queryClient = new QueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: ["products", "detail", id],
      queryFn: async () => {
        const response = await productService.getProductDetail(id);
        return response.data;
      },
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) return notFound();
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailView id={id} />
    </HydrationBoundary>
  );
}
