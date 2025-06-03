// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  rating?: number;
  image?: string;
  isFavorite?: boolean;
  originalPrice?: number;
}
export interface ProductFilters {
  searchTerm: string;
  selectedCategory: string;
  sortBy: string;
}

export interface PaginationConfig {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}