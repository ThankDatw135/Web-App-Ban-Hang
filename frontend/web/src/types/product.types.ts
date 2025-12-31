// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  categoryId: string;
  stock: number;
  sku: string;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  productCount: number;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'featured';
  minPrice?: number;
  maxPrice?: number;
}

export interface ProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
