import api from './api';
import { Order, CreateOrderDto, UpdateOrderStatusDto } from '@/types/order.types';

export const ordersService = {
  /**
   * Create order from cart
   */
  createOrder: async (data: CreateOrderDto): Promise<Order> => {
    const response = await api.post<Order>('/orders', data);
    return response.data;
  },

  /**
   * Get user's order history
   */
  getOrders: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders');
    return response.data;
  },

  /**
   * Get single order details
   */
  getOrderById: async (id: string): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },

  /**
   * Update order status (admin only)
   */
  updateStatus: async (id: string, data: UpdateOrderStatusDto): Promise<Order> => {
    const response = await api.put<Order>(`/orders/${id}/status`, data);
    return response.data;
  },

  /**
   * Get all orders (admin only)
   */
  getAllOrders: async (params?: { status?: string; page?: number; limit?: number }): Promise<{
    data: Order[];
    total: number;
  }> => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },
};
