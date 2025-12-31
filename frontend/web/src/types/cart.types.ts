// Cart Types
import { Product } from './product.types';

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface AddToCartDto {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
}

export interface UpdateCartItemDto {
  quantity: number;
}
