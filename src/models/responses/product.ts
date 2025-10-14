export interface ProductForCustomerResponse {
  id: number;
  title: string;
  description: string;
  mainImageURL: string;
  price: string;
  discount: number;
}

export interface ProductListForCustomerResponse {
  products: ProductForCustomerResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface ProductDetailForCustomerResponse {
  id: number;
  title: string;
  description: string;
  imagesURL: string[];
  price: string;
  discount: number;
  stock: number;
  stockIndicator: string;
  categoryName: string;
  brandName: string;
  statusName: string;
  isAvailable: boolean;
}

export interface ProductForAdminResponse {
  id: number;
  title: string;
  mainImageURL: string;
  price: string;
  stock: number;
  stockIndicator: string;
  categoryName: string;
  brandName: string;
  statusName: string;
  isAvailable: boolean;
  updatedAt: string;
}

export interface ProductListForAdminResponse {
  products: ProductForAdminResponse[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}
