// Application constants
export const APP_CONSTANTS = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
  },
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },
  PAYMENT_METHOD: {
    COD: 'cod',
    BANK_TRANSFER: 'bank_transfer',
    MOMO: 'momo',
    VNPAY: 'vnpay',
  },
  USER_ROLE: {
    USER: 'user',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin',
  },
  PRODUCT_CATEGORY: {
    CLOTHING: 'clothing',
    ACCESSORIES: 'accessories',
    FOOTWEAR: 'footwear',
  },
  DISCOUNT_TYPE: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
  },
} as const;

export type OrderStatus = (typeof APP_CONSTANTS.ORDER_STATUS)[keyof typeof APP_CONSTANTS.ORDER_STATUS];
export type PaymentStatus = (typeof APP_CONSTANTS.PAYMENT_STATUS)[keyof typeof APP_CONSTANTS.PAYMENT_STATUS];
export type PaymentMethod = (typeof APP_CONSTANTS.PAYMENT_METHOD)[keyof typeof APP_CONSTANTS.PAYMENT_METHOD];
export type UserRole = (typeof APP_CONSTANTS.USER_ROLE)[keyof typeof APP_CONSTANTS.USER_ROLE];
export type ProductCategory = (typeof APP_CONSTANTS.PRODUCT_CATEGORY)[keyof typeof APP_CONSTANTS.PRODUCT_CATEGORY];
export type DiscountType = (typeof APP_CONSTANTS.DISCOUNT_TYPE)[keyof typeof APP_CONSTANTS.DISCOUNT_TYPE];
