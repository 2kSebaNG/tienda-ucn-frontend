export interface PaginationQueryParams {
  pageNumber: number;
  pageSize?: number;
  searchTerm?: string;
}

export interface CreateProductRequest {
  title: string;
  description: string;
  price: string;
  stock: string;
  status: string;
  categoryName: string;
  brandName: string;
  images: File[];
}
