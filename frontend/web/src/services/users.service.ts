import api from './api';
import { User, UpdateProfileDto, ChangePasswordDto } from '@/types/user.types';

export const usersService = {
  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  /**
   * Update user profile
   */
  updateProfile: async (data: UpdateProfileDto): Promise<User> => {
    const response = await api.put<User>('/users/me', data);
    return response.data;
  },

  /**
   * Change password
   */
  changePassword: async (data: ChangePasswordDto): Promise<{ message: string }> => {
    const response = await api.put('/users/me/password', data);
    return response.data;
  },

  /**
   * Get user order history
   */
  getOrderHistory: async (): Promise<any[]> => {
    const response = await api.get('/users/me/orders');
    return response.data;
  },
};
