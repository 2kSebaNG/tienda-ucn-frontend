import { ApiResponse } from "@/models/generics";
import { CartItemRequest } from "@/models/requests";
import { GetCartResponse } from "@/models/responses";

import { BaseApiService } from "./base-api-service";

export class CartService extends BaseApiService {
  constructor() {
    super("/cart");
  }

  getCart() {
    return this.httpClient.get<ApiResponse<GetCartResponse>>(`${this.baseURL}`);
  }

  addItemToCart(item: CartItemRequest) {
    return this.httpClient.post<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/items`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  removeItemFromCart(productId: string) {
    return this.httpClient.delete<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/items/${productId}`
    );
  }

  updateItemQuantity(item: CartItemRequest) {
    return this.httpClient.patch<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/items`,
      item,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  }

  clearCart() {
    return this.httpClient.post<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/clear`
    );
  }

  checkout() {
    return this.httpClient.post<ApiResponse<GetCartResponse>>(
      `${this.baseURL}/checkout`
    );
  }
}

export const cartService = new CartService();
