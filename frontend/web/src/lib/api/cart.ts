import apiClient from './client';

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

export const cartApi = {
  getCart: async (): Promise<CartItem[]> => {
    const response = await apiClient.get('/cart');
    return response.data.data;
  },

  addToCart: async (data: {
    productId: string;
    quantity?: number;
    size?: string;
    color?: string;
  }): Promise<CartItem> => {
    const response = await apiClient.post('/cart/items', data);
    return response.data.data;
  },

  updateCartItem: async (id: string, quantity: number): Promise<CartItem> => {
    const response = await apiClient.put(`/cart/items/${id}`, { quantity });
    return response.data.data;
  },

  removeFromCart: async (id: string): Promise<void> => {
    await apiClient.delete(`/cart/items/${id}`);
  },

  clearCart: async (): Promise<void> => {
    await apiClient.delete('/cart');
  },
};
