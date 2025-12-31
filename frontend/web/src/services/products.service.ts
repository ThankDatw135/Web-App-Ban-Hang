import api from './api';
import {
  Product,
  Category,
  ProductQuery,
  ProductsResponse,
} from '@/types/product.types';

export const productsService = {
  /**
   * Get all products with pagination and filters
   */
  getAll: async (query?: ProductQuery): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>('/products', { params: query });
    return response.data;
  },

  /**
   * Get featured products for homepage
   */
  getFeatured: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/featured');
    return response.data;
  },

  /**
   * Get all product categories
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/products/categories');
    return response.data;
  },

  /**
   * Get single product by ID
   */
  getById: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  /**
   * Create new product (admin only)
   */
  create: async (data: Partial<Product>): Promise<Product> => {
    const response = await api.post<Product>('/products', data);
    return response.data;
  },

  /**
   * Update product (admin only)
   */
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  /**
   * Delete product (admin only)
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
