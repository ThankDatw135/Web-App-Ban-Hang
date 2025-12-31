// User Types
export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'user' | 'admin';
  address?: Address;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UpdateProfileDto {
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  address?: Address;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
