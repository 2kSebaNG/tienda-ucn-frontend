import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useCreateProductMutation } from "@/hooks/api";
import { handleApiError } from "@/lib";
import { CreateProductRequest } from "@/models/requests";

export const useNewProduct = () => {
  // Router
  const router = useRouter();

  // API calls
  const { mutateAsync: createProductAsync, isPending: isCreatingProduct } =
    useCreateProductMutation();

  // Actions
  const handleCreateProduct = async (productData: CreateProductRequest) => {
    try {
      const productFormData = new FormData();

      productFormData.append("title", productData.title);
      productFormData.append("description", productData.description);
      productFormData.append("price", productData.price.toString());
      productFormData.append("stock", productData.stock.toString());
      productFormData.append("status", productData.status);
      productFormData.append("categoryName", productData.categoryName);
      productFormData.append("brandName", productData.brandName);

      productData.images.forEach(image => {
        productFormData.append("images", image);
      });

      await createProductAsync(productFormData);
      toast.success("Producto creado exitosamente");
      router.push("/admin/products");
    } catch (error) {
      const apiError = handleApiError(error).details;
      toast.error(apiError);
    }
  };

  return {
    // Loading state
    isLoading: isCreatingProduct,

    // Actions
    actions: {
      handleCreateProduct,
    },
  };
};
