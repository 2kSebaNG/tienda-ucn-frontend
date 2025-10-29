import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/generics";
import { PaginationQueryParams } from "@/models/requests";
import { GetOrdersResponse, Order } from "@/models/responses";

import { BaseApiService } from "./base-api-service";

export class OrderService extends BaseApiService {
  constructor() {
    super("/order");
  }

  createOrder() {
    return this.httpClient.post<ApiResponse<string>>(`${this.baseURL}/create`);
  }

  getOrderDetails(orderCode: string) {
    return this.httpClient.get<ApiResponse<Order>>(
      `${this.baseURL}/detail/${orderCode}`
    );
  }

  getOrdersList(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<GetOrdersResponse>>(
      `${this.baseURL}/user-orders`,
      {
        params,
      } as AxiosRequestConfig
    );
  }
}

export const orderService = new OrderService();
