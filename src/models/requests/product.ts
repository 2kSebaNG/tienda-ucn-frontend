export interface PaginationQueryParams {
  pageNumber: number;
  pageSize?: number;
  searchTerm?: string;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: number;
  stock: number;
  status: string;
  categoryName: string;
  brandName: string;
  images: File[];
}
