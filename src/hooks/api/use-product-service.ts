import { useMutation, useQuery } from "@tanstack/react-query";

import { isValidId } from "@/lib";
import { PaginationQueryParams } from "@/models/requests";
import { productService } from "@/services";

export const useGetProductsForCustomer = (
  params: PaginationQueryParams = { pageNumber: 1 }
) => {
  return useQuery({
    queryKey: ["products", "customer", params],
    queryFn: async () => {
      const response = await productService.getProductsForCustomer(params);
      return response.data;
    },
  });
};

export const useGetProductDetail = (id: string, enabled = true) => {
  return useQuery({
    queryKey: ["products", "detail", id],
    queryFn: async () => {
      const response = await productService.getProductDetail(id);
      return response.data;
    },
    enabled: enabled && isValidId(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetProductsForAdmin = (
  params: PaginationQueryParams = { pageNumber: 1 }
) => {
  return useQuery({
    queryKey: ["products", "admin", params],
    queryFn: async () => {
      const response = await productService.getProductsForAdmin(params);
      return response.data;
    },
  });
};

export const useCreateProductMutation = () => {
  return useMutation({
    mutationFn: async (productFormData: FormData) => {
      const response = await productService.createProduct(productFormData);
      return response.data;
    },
  });
};

export const useToggleProductAvailabilityMutation = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await productService.toggleProductAvailability(id);
      return response.data;
    },
  });
};
