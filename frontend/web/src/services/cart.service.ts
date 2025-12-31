import api from './api';
import { Cart, AddToCartDto, UpdateCartItemDto } from '@/types/cart.types';

export const cartService = {
  /**
   * Get current user's cart
   */
  getCart: async (): Promise<Cart> => {
    const response = await api.get<Cart>('/cart');
    return response.data;
  },

  /**
   * Add item to cart
   */
  addToCart: async (data: AddToCartDto): Promise<Cart> => {
    const response = await api.post<Cart>('/cart/items', data);
    return response.data;
  },

  /**
   * Update cart item quantity
   */
  updateCartItem: async (itemId: string, data: UpdateCartItemDto): Promise<Cart> => {
    const response = await api.put<Cart>(`/cart/items/${itemId}`, data);
    return response.data;
  },

  /**
   * Remove item from cart
   */
  removeCartItem: async (itemId: string): Promise<Cart> => {
    const response = await api.delete<Cart>(`/cart/items/${itemId}`);
    return response.data;
  },

  /**
   * Clear entire cart
   */
  clearCart: async (): Promise<void> => {
    await api.delete('/cart');
  },
};
