// Shared TypeScript types for the entire platform

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  avatarUrl?: string;
  firebaseUid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: string;
  subcategory?: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  sizes?: ProductSize[];
  stock: number;
  featured: boolean;
  active: boolean;
  sku?: string;
  material?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSize {
  size: string;
  stock: number;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  quantity: number;
  size?: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingAddress: ShippingAddress;
  customerInfo?: any;
  discountCodeId?: string;
  notes?: string;
  platform: 'web' | 'mobile';
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productSnapshot: any;
  quantity: number;
  size?: string;
  price: number;
  subtotal: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  postalCode?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed';

export interface DiscountCode {
  id: string;
  code: string;
  description?: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  maxUses?: number;
  maxUsesPerUser: number;
  usedCount: number;
  validFrom?: Date;
  validUntil?: Date;
  active: boolean;
  createdAt: Date;
}

export interface Banner {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  link?: string;
  position: number;
  active: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
}

export interface AITryOnHistory {
  id: string;
  userId: string;
  userImageUrl: string;
  productImages: any;
  resultImageUrl?: string;
  status: 'processing' | 'completed' | 'failed';
  processingTime?: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
