import { create } from 'zustand';
import { CartItem, Cart } from '@/types/cart.types';
import { cartService } from '@/services/cart.service';

interface CartState {
  // State
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: () => Promise<void>;
  addItem: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  // Initial state
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
  isLoading: false,
  error: null,

  // Fetch cart from API
  fetchCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.getCart();
      set({
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        itemCount: cart.itemCount,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to fetch cart' });
    }
  },

  // Add item to cart
  addItem: async (productId, quantity, size, color) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.addToCart({ productId, quantity, size, color });
      set({
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        itemCount: cart.itemCount,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to add item to cart' });
    }
  },

  // Update item quantity
  updateItemQuantity: async (itemId, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.updateCartItem(itemId, { quantity });
      set({
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        itemCount: cart.itemCount,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to update cart' });
    }
  },

  // Remove item from cart
  removeItem: async (itemId) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await cartService.removeCartItem(itemId);
      set({
        items: cart.items,
        subtotal: cart.subtotal,
        shipping: cart.shipping,
        tax: cart.tax,
        total: cart.total,
        itemCount: cart.itemCount,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to remove item' });
    }
  },

  // Clear entire cart
  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      await cartService.clearCart();
      set({
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
        itemCount: 0,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, error: 'Failed to clear cart' });
    }
  },

  // Set error
  setError: (error) => set({ error }),
}));
