import { useMutation, useQuery } from "@tanstack/react-query";

import { PaginationQueryParams } from "@/models/requests";
import { orderService } from "@/services";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await orderService.createOrder();
      return response.data;
    },
  });
};

export const useGetOrderDetail = (orderCode: string) => {
  return useQuery({
    queryKey: ["orderDetail", orderCode],
    queryFn: async () => {
      const response = await orderService.getOrderDetails(orderCode);
      return response.data;
    },
  });
};

export const useGetOrdersList = (
  params: PaginationQueryParams = { pageNumber: 1 }
) => {
  return useQuery({
    queryKey: ["ordersList", params],
    queryFn: async () => {
      const response = await orderService.getOrdersList(params);
      return response.data;
    },
  });
};
