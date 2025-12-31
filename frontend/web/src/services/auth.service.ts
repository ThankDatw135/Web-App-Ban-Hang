import api from './api';
import {
  LoginDto,
  RegisterDto,
  GoogleLoginDto,
  ForgotPasswordDto,
  VerifyOtpDto,
  ResetPasswordDto,
  AuthResponse,
} from '@/types/auth.types';

export const authService = {
  /**
   * Register a new user
   */
  register: async (data: RegisterDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  /**
   * Login with email and password
   */
  login: async (data: LoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  /**
   * Login with Google OAuth
   */
  googleLogin: async (data: GoogleLoginDto): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/google', data);
    return response.data;
  },

  /**
   * Send password reset OTP to email
   */
  forgotPassword: async (data: ForgotPasswordDto): Promise<{ message: string }> => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  /**
   * Verify OTP code
   */
  verifyOtp: async (data: VerifyOtpDto): Promise<{ message: string; valid: boolean }> => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
  },

  /**
   * Reset password with OTP
   */
  resetPassword: async (data: ResetPasswordDto): Promise<{ message: string }> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};
