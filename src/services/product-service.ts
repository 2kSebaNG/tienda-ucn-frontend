import { AxiosRequestConfig } from "axios";

import { ApiResponse } from "@/models/generics";
import { PaginationQueryParams } from "@/models/requests";
import {
  ProductDetailForCustomerResponse,
  ProductListForAdminResponse,
  ProductListForCustomerResponse,
} from "@/models/responses";

import { BaseApiService } from "./base-api-service";

export class ProductService extends BaseApiService {
  constructor() {
    super("/product");
  }

  getProductsForCustomer(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<ProductListForCustomerResponse>>(
      `${this.baseURL}/customer/products`,
      { params } as AxiosRequestConfig
    );
  }

  getProductDetail(id: string) {
    return this.httpClient.get<ApiResponse<ProductDetailForCustomerResponse>>(
      `${this.baseURL}/${id}`
    );
  }

  getProductsForAdmin(params?: PaginationQueryParams) {
    return this.httpClient.get<ApiResponse<ProductListForAdminResponse>>(
      `${this.baseURL}/admin/products`,
      { params } as AxiosRequestConfig
    );
  }

  createProduct(productFormData: FormData) {
    return this.httpClient.post<ApiResponse<string>>(
      `${this.baseURL}`,
      productFormData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  toggleProductAvailability(id: string) {
    return this.httpClient.patch<ApiResponse<string>>(
      `${this.baseURL}/${id}/toggle-active`
    );
  }
}

export const productService = new ProductService();
