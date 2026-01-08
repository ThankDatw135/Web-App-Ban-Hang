import api from './api';

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

class ProductService {
  /**
   * Get all products with filters
   */
  async getProducts(filter?: ProductFilter): Promise<PaginatedProducts> {
    const response = await api.get('/products', {params: filter});
    return response.data.data;
  }

  /**
   * Get product by ID
   */
  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<Product[]> {
    const response = await api.get('/products/featured');
    return response.data.data;
  }

  /**
   * Get product categories
   */
  async getCategories(): Promise<string[]> {
    const response = await api.get('/products/categories');
    return response.data.data;
  }
}

export default new ProductService();
