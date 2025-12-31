// Order Types
import { CartItem } from './cart.types';
import { Address } from './user.types';

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: 'credit_card' | 'paypal' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export interface CreateOrderDto {
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: 'credit_card' | 'paypal' | 'cod';
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  notes?: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
}
