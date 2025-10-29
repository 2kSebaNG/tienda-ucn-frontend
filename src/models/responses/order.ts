export interface OrderItem {
  productTitle: string;
  productDescription: string;
  mainImageURL: string;
  priceAtMoment: string;
  quantity: number;
}

export interface Order {
  code: string;
  total: string;
  subTotal: string;
  purchasedAt: string;
  items: OrderItem[];
}

export interface GetOrdersResponse {
  orders: Order[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
