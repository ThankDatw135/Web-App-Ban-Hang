// Auth Types
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  fullName: string;
  email: string;
  password: string;
}

export interface GoogleLoginDto {
  idToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface VerifyOtpDto {
  email: string;
  otp: string;
}

export interface ResetPasswordDto {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
  };
}
