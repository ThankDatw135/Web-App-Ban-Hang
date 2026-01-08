import apiClient from './client';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
}

export interface ProductFilter {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface PaginatedProducts {
  items: Product[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export const productsApi = {
  getAll: async (filter?: ProductFilter): Promise<PaginatedProducts> => {
    const response = await apiClient.get('/products', { params: filter });
    return response.data.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data.data;
  },

  getFeatured: async (): Promise<Product[]> => {
    const response = await apiClient.get('/products/featured');
    return response.data.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get('/products/categories');
    return response.data.data;
  },
};
