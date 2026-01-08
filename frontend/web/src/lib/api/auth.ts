import apiClient from './client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  token: string;
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data.data;
  },

  googleAuth: async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/google', { idToken });
    return response.data.data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post('/auth/reset-password', { token, newPassword });
    return response.data.data;
  },
};
