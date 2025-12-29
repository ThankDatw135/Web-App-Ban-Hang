# API Documentation - Luxury Fashion Platform

**Base URL**: `https://api.luxuryfashion.com/v1`  
**Protocol**: HTTPS only  
**Format**: JSON

---

## Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Products](#products)
4. [Cart](#cart)
5. [Orders](#orders)
6. [Admin](#admin)
7. [Discount Codes](#discount-codes)
8. [Banners](#banners)
9. [AI Try-On](#ai-try-on)
10. [Error Handling](#error-handling)
11. [Rate Limiting](#rate-limiting)

---

## Authentication

### Firebase Authentication

All user endpoints require Firebase ID token in the Authorization header:

```
Authorization: Bearer <firebase_id_token>
```

Admin endpoints require JWT token from admin login:

```
Authorization: Bearer <admin_jwt_token>
```

---

### POST /auth/register

Register new user with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "full_name": "Nguyen Van A"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "full_name": "Nguyen Van A",
      "firebase_uid": "firebase-uid-here",
      "created_at": "2025-12-29T10:00:00Z"
    },
    "token": "firebase-id-token-here"
  }
}
```

---

### POST /auth/login

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@example.com",
      "full_name": "Nguyen Van A",
      "avatar_url": "https://storage.example.com/avatars/user.jpg"
    },
    "token": "firebase-id-token-here"
  }
}
```

---

### POST /auth/google

Login with Google OAuth.

**Request:**

```json
{
  "id_token": "google-id-token-here"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-here",
      "email": "user@gmail.com",
      "full_name": "User Name",
      "avatar_url": "https://lh3.googleusercontent.com/..."
    },
    "token": "firebase-id-token-here",
    "is_new_user": false
  }
}
```

---

### POST /auth/forgot-password

Send OTP to email for password reset.

**Request:**

```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "OTP sent to your email",
  "data": {
    "email": "user@example.com",
    "expires_in": 300
  }
}
```

---

### POST /auth/verify-otp

Verify OTP code.

**Request:**

```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "OTP verified successfully",
  "data": {
    "reset_token": "temporary-reset-token-here"
  }
}
```

---

### POST /auth/reset-password

Reset password with verified token.

**Request:**

```json
{
  "reset_token": "temporary-reset-token-here",
  "new_password": "NewSecurePassword123!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## Users

**Authentication Required**: Yes (Firebase token)

---

### GET /users/me

Get current user profile.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "email": "user@example.com",
    "full_name": "Nguyen Van A",
    "phone": "0901234567",
    "date_of_birth": "1990-01-01",
    "gender": "male",
    "address": "123 Nguyen Hue, District 1, HCMC",
    "avatar_url": "https://storage.example.com/avatars/user.jpg",
    "bank_account": {
      "bank_name": "Vietcombank",
      "account_number": "****7890",
      "account_holder": "Nguyen Van A"
    },
    "wallet_info": {
      "momo": "0901234567"
    },
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### PUT /users/me

Update user profile.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "full_name": "Nguyen Van B",
  "phone": "0909876543",
  "date_of_birth": "1990-01-01",
  "gender": "male",
  "address": "456 Le Loi, District 1, HCMC",
  "bank_account": {
    "bank_name": "Vietcombank",
    "account_number": "1234567890",
    "account_holder": "Nguyen Van B"
  },
  "wallet_info": {
    "momo": "0909876543",
    "zalopay": "0909876543"
  }
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": "uuid-here",
    "full_name": "Nguyen Van B",
    "phone": "0909876543",
    "updated_at": "2025-12-29T10:30:00Z"
  }
}
```

---

### PUT /users/me/avatar

Upload user avatar.

**Headers:**

```
Authorization: Bearer <firebase_token>
Content-Type: multipart/form-data
```

**Request:**

```
FormData:
  avatar: <file>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "data": {
    "avatar_url": "https://storage.example.com/avatars/uuid-here.jpg"
  }
}
```

---

### PUT /users/me/password

Change password.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

### GET /users/me/orders

Get user order history.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10, max: 50)
- `status` (optional): Filter by status

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "uuid-here",
        "order_number": "ORD-20251229-001",
        "total_amount": 2400000,
        "discount_amount": 240000,
        "final_amount": 2160000,
        "status": "delivered",
        "payment_method": "cod",
        "created_at": "2025-12-20T10:00:00Z",
        "items_count": 2
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "total_pages": 2
    }
  }
}
```

---

## Products

**Authentication Required**: No (public endpoints)

---

### GET /products

Get products list with filters and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 12, max: 50)
- `category` (optional): Filter by category (clothing/accessories)
- `subcategory` (optional): Filter by subcategory
- `min_price` (optional): Minimum price
- `max_price` (optional): Maximum price
- `sort` (optional): Sort by (newest/price_asc/price_desc/featured)
- `search` (optional): Search query

**Example Request:**

```
GET /products?category=clothing&sort=price_asc&page=1&limit=12
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-here",
        "name": "Elegant Silk Shirt",
        "slug": "elegant-silk-shirt",
        "description": "Crafted with intention. Pure silk, timeless design.",
        "category": "clothing",
        "subcategory": "shirts",
        "price": 1200000,
        "compare_at_price": null,
        "images": [
          "https://storage.example.com/products/shirt-1-front.webp",
          "https://storage.example.com/products/shirt-1-back.webp"
        ],
        "sizes": [
          { "size": "S", "stock": 10 },
          { "size": "M", "stock": 15 },
          { "size": "L", "stock": 8 }
        ],
        "stock": 33,
        "featured": true,
        "sku": "SHIRT-001"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 48,
      "total_pages": 4
    },
    "filters": {
      "categories": ["clothing", "accessories"],
      "price_range": {
        "min": 200000,
        "max": 5000000
      }
    }
  }
}
```

---

### GET /products/:id

Get product details by ID.

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "name": "Elegant Silk Shirt",
    "slug": "elegant-silk-shirt",
    "description": "Crafted with intention. Pure silk, timeless design.",
    "category": "clothing",
    "subcategory": "shirts",
    "price": 1200000,
    "compare_at_price": null,
    "images": [
      "https://storage.example.com/products/shirt-1-front.webp",
      "https://storage.example.com/products/shirt-1-back.webp",
      "https://storage.example.com/products/shirt-1-detail.webp"
    ],
    "sizes": [
      { "size": "S", "stock": 10 },
      { "size": "M", "stock": 15 },
      { "size": "L", "stock": 8 },
      { "size": "XL", "stock": 5 }
    ],
    "stock": 38,
    "featured": true,
    "sku": "SHIRT-001",
    "material": "100% Silk",
    "care_instructions": "Dry clean only. Do not bleach.",
    "created_at": "2025-01-01T00:00:00Z"
  }
}
```

---

### GET /products/slug/:slug

Get product details by slug.

**Example:**

```
GET /products/slug/elegant-silk-shirt
```

**Response:** Same as GET /products/:id

---

### GET /products/featured

Get featured products.

**Query Parameters:**

- `limit` (optional): Number of products (default: 8, max: 20)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-here",
        "name": "Elegant Silk Shirt",
        "slug": "elegant-silk-shirt",
        "price": 1200000,
        "images": ["https://storage.example.com/products/shirt-1.webp"],
        "category": "clothing"
      }
    ]
  }
}
```

---

### GET /products/categories

Get all categories with product counts.

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "name": "clothing",
        "count": 45,
        "subcategories": [
          { "name": "shirts", "count": 15 },
          { "name": "pants", "count": 20 },
          { "name": "outfits", "count": 10 }
        ]
      },
      {
        "name": "accessories",
        "count": 12,
        "subcategories": []
      }
    ]
  }
}
```

---

## Cart

**Authentication Required**: Yes (Firebase token)

---

### GET /cart

Get user's cart.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid-here",
        "product": {
          "id": "product-uuid",
          "name": "Elegant Silk Shirt",
          "slug": "elegant-silk-shirt",
          "price": 1200000,
          "image": "https://storage.example.com/products/shirt-1.webp"
        },
        "quantity": 2,
        "size": "M",
        "subtotal": 2400000
      }
    ],
    "summary": {
      "items_count": 2,
      "subtotal": 2400000,
      "discount": 0,
      "total": 2400000
    }
  }
}
```

---

### POST /cart/items

Add item to cart.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "product_id": "product-uuid-here",
  "quantity": 2,
  "size": "M"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "id": "cart-item-uuid",
    "product_id": "product-uuid",
    "quantity": 2,
    "size": "M"
  }
}
```

---

### PUT /cart/items/:id

Update cart item quantity.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "quantity": 3
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Cart item updated",
  "data": {
    "id": "cart-item-uuid",
    "quantity": 3
  }
}
```

---

### DELETE /cart/items/:id

Remove item from cart.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

### DELETE /cart

Clear entire cart.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## Orders

**Authentication Required**: Yes (Firebase token)

---

### POST /orders

Create new order from cart.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "shipping_address": {
    "full_name": "Nguyen Van A",
    "phone": "0901234567",
    "address": "123 Nguyen Hue, District 1",
    "city": "Ho Chi Minh City",
    "district": "District 1",
    "ward": "Ben Nghe Ward",
    "postal_code": "700000"
  },
  "payment_method": "cod",
  "discount_code": "WELCOME10",
  "notes": "Please call before delivery"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "order": {
      "id": "order-uuid",
      "order_number": "ORD-20251229-001",
      "total_amount": 2400000,
      "discount_amount": 240000,
      "final_amount": 2160000,
      "status": "pending",
      "payment_method": "cod",
      "created_at": "2025-12-29T10:00:00Z"
    }
  }
}
```

---

### GET /orders/:id

Get order details.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "order-uuid",
    "order_number": "ORD-20251229-001",
    "total_amount": 2400000,
    "discount_amount": 240000,
    "final_amount": 2160000,
    "status": "shipped",
    "payment_method": "cod",
    "payment_status": "unpaid",
    "shipping_address": {
      "full_name": "Nguyen Van A",
      "phone": "0901234567",
      "address": "123 Nguyen Hue, District 1",
      "city": "Ho Chi Minh City"
    },
    "items": [
      {
        "id": "item-uuid",
        "product_name": "Elegant Silk Shirt",
        "product_image": "https://storage.example.com/products/shirt-1.webp",
        "quantity": 2,
        "size": "M",
        "price": 1200000,
        "subtotal": 2400000
      }
    ],
    "timeline": [
      {
        "status": "pending",
        "timestamp": "2025-12-29T10:00:00Z"
      },
      {
        "status": "confirmed",
        "timestamp": "2025-12-29T11:00:00Z"
      },
      {
        "status": "shipped",
        "timestamp": "2025-12-29T15:00:00Z"
      }
    ],
    "created_at": "2025-12-29T10:00:00Z"
  }
}
```

---

### POST /orders/:id/cancel

Cancel order (only if status is pending or confirmed).

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Request:**

```json
{
  "reason": "Changed my mind"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "id": "order-uuid",
    "status": "cancelled"
  }
}
```

---

## Admin

**Authentication Required**: Yes (Admin JWT token)

---

### POST /admin/login

Admin login.

**Request:**

```json
{
  "email": "admin@luxuryfashion.com",
  "password": "AdminPassword123!"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "admin-uuid",
      "email": "admin@luxuryfashion.com",
      "full_name": "System Administrator",
      "role": "super_admin"
    },
    "token": "admin-jwt-token-here"
  }
}
```

---

### GET /admin/dashboard

Get dashboard statistics.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "stats": {
      "total_revenue": 125000000,
      "total_orders": 342,
      "total_products": 57,
      "total_users": 1250,
      "pending_orders": 12
    },
    "revenue_chart": {
      "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      "data": [15000000, 18000000, 22000000, 20000000, 25000000, 25000000]
    },
    "recent_orders": [
      {
        "id": "order-uuid",
        "order_number": "ORD-20251229-001",
        "customer_name": "Nguyen Van A",
        "total": 2160000,
        "status": "pending",
        "created_at": "2025-12-29T10:00:00Z"
      }
    ],
    "top_products": [
      {
        "id": "product-uuid",
        "name": "Elegant Silk Shirt",
        "sales_count": 45,
        "revenue": 54000000
      }
    ]
  }
}
```

---

### GET /admin/products

Get all products (admin view).

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Query Parameters:**

- `page`, `limit`, `category`, `search` (same as public products endpoint)
- `active` (optional): Filter by active status

**Response:** Similar to GET /products with additional admin fields

---

### POST /admin/products

Create new product.

**Headers:**

```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request:**

```
FormData:
  name: "New Elegant Shirt"
  description: "Crafted with intention."
  category: "clothing"
  subcategory: "shirts"
  price: 1500000
  sizes: [{"size":"S","stock":10},{"size":"M","stock":15}]
  sku: "SHIRT-002"
  material: "100% Cotton"
  images: <file1>, <file2>, <file3>
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": "new-product-uuid",
    "name": "New Elegant Shirt",
    "slug": "new-elegant-shirt",
    "sku": "SHIRT-002"
  }
}
```

---

### PUT /admin/products/:id

Update product.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request:**

```json
{
  "name": "Updated Product Name",
  "price": 1600000,
  "stock": 50,
  "featured": true
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Product updated successfully"
}
```

---

### DELETE /admin/products/:id

Delete product.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

### GET /admin/orders

Get all orders (admin view).

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Query Parameters:**

- `page`, `limit`
- `status` (optional): Filter by status
- `platform` (optional): Filter by platform (web/mobile)
- `date_from`, `date_to` (optional): Date range

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order-uuid",
        "order_number": "ORD-20251229-001",
        "customer": {
          "name": "Nguyen Van A",
          "email": "user@example.com",
          "phone": "0901234567"
        },
        "total_amount": 2400000,
        "final_amount": 2160000,
        "status": "pending",
        "platform": "web",
        "created_at": "2025-12-29T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 342,
      "total_pages": 18
    }
  }
}
```

---

### PUT /admin/orders/:id/status

Update order status.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request:**

```json
{
  "status": "shipped",
  "note": "Shipped via VNPost"
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Order status updated",
  "data": {
    "id": "order-uuid",
    "status": "shipped"
  }
}
```

---

## Discount Codes

---

### POST /admin/discounts

Create discount code.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Request:**

```json
{
  "code": "NEWYEAR2025",
  "description": "New Year 2025 promotion",
  "discount_type": "percentage",
  "discount_value": 20,
  "min_purchase": 1000000,
  "max_discount": 500000,
  "max_uses": 100,
  "max_uses_per_user": 1,
  "valid_from": "2025-01-01T00:00:00Z",
  "valid_until": "2025-01-31T23:59:59Z"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Discount code created",
  "data": {
    "id": "discount-uuid",
    "code": "NEWYEAR2025"
  }
}
```

---

### GET /admin/discounts

Get all discount codes.

**Headers:**

```
Authorization: Bearer <admin_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "discounts": [
      {
        "id": "discount-uuid",
        "code": "NEWYEAR2025",
        "discount_type": "percentage",
        "discount_value": 20,
        "used_count": 45,
        "max_uses": 100,
        "valid_until": "2025-01-31T23:59:59Z",
        "active": true
      }
    ]
  }
}
```

---

### POST /discounts/validate

Validate discount code (public endpoint).

**Request:**

```json
{
  "code": "WELCOME10",
  "cart_total": 1500000
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "valid": true,
    "discount_amount": 150000,
    "final_amount": 1350000,
    "code": "WELCOME10"
  }
}
```

---

## Banners

---

### POST /admin/banners

Upload banner.

**Headers:**

```
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data
```

**Request:**

```
FormData:
  title: "Summer Collection 2025"
  subtitle: "Designed to last."
  link: "/products?category=clothing"
  position: 1
  image: <file>
```

**Response:** `201 Created`

```json
{
  "success": true,
  "message": "Banner uploaded successfully",
  "data": {
    "id": "banner-uuid",
    "title": "Summer Collection 2025",
    "image_url": "https://storage.example.com/banners/banner-1.webp",
    "mobile_image_url": "https://storage.example.com/banners/banner-1-mobile.webp"
  }
}
```

---

### GET /banners

Get active banners (public endpoint).

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "banners": [
      {
        "id": "banner-uuid",
        "title": "Summer Collection 2025",
        "subtitle": "Designed to last.",
        "image_url": "https://storage.example.com/banners/banner-1.webp",
        "mobile_image_url": "https://storage.example.com/banners/banner-1-mobile.webp",
        "link": "/products?category=clothing",
        "position": 1
      }
    ]
  }
}
```

---

## AI Try-On

**Authentication Required**: Yes (Firebase token)

---

### POST /ai-tryon/generate

Generate AI try-on image.

**Headers:**

```
Authorization: Bearer <firebase_token>
Content-Type: multipart/form-data
```

**Request:**

```
FormData:
  user_image: <file>
  product_ids: ["product-uuid-1", "product-uuid-2"]
```

**Response:** `202 Accepted`

```json
{
  "success": true,
  "message": "AI try-on generation started",
  "data": {
    "job_id": "job-uuid",
    "status": "processing",
    "estimated_time": 30
  }
}
```

---

### GET /ai-tryon/status/:job_id

Check AI try-on generation status.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "job_id": "job-uuid",
    "status": "completed",
    "result_url": "https://storage.example.com/ai-tryon/result-uuid.webp",
    "processing_time": 28
  }
}
```

---

### GET /ai-tryon/history

Get user's AI try-on history.

**Headers:**

```
Authorization: Bearer <firebase_token>
```

**Query Parameters:**

- `page`, `limit`

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "history": [
      {
        "id": "history-uuid",
        "user_image_url": "https://storage.example.com/uploads/user-photo.jpg",
        "result_image_url": "https://storage.example.com/ai-tryon/result.webp",
        "products": [
          {
            "product_id": "product-uuid",
            "product_name": "Elegant Silk Shirt",
            "image_url": "https://storage.example.com/products/shirt-1.webp"
          }
        ],
        "created_at": "2025-12-29T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5
    }
  }
}
```

---

## Error Handling

### Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {}
  }
}
```

### Common Error Codes

| Code                    | HTTP Status | Description                             |
| ----------------------- | ----------- | --------------------------------------- |
| `UNAUTHORIZED`          | 401         | Missing or invalid authentication token |
| `FORBIDDEN`             | 403         | Insufficient permissions                |
| `NOT_FOUND`             | 404         | Resource not found                      |
| `VALIDATION_ERROR`      | 400         | Request validation failed               |
| `DUPLICATE_ENTRY`       | 409         | Resource already exists                 |
| `OUT_OF_STOCK`          | 400         | Product out of stock                    |
| `INVALID_DISCOUNT_CODE` | 400         | Discount code invalid or expired        |
| `INTERNAL_ERROR`        | 500         | Internal server error                   |

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "fields": {
        "email": "Invalid email format",
        "password": "Password must be at least 8 characters"
      }
    }
  }
}
```

---

## Rate Limiting

**Limits:**

- Public endpoints: 100 requests/minute
- Authenticated endpoints: 200 requests/minute
- Admin endpoints: 500 requests/minute

**Headers:**

```
X-RateLimit-Limit: 200
X-RateLimit-Remaining: 195
X-RateLimit-Reset: 1640000000
```

**Rate Limit Exceeded Response:**

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retry_after": 60
    }
  }
}
```

---

## Pagination

All list endpoints support pagination with consistent format:

**Query Parameters:**

- `page`: Page number (default: 1)
- `limit`: Items per page (default: varies by endpoint)

**Response Format:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## Webhooks (Future)

For order status updates, payment confirmations, etc.

**Endpoint:** Configured in admin panel  
**Method:** POST  
**Signature:** HMAC-SHA256 in `X-Webhook-Signature` header

---

## API Versioning

Current version: `v1`

Breaking changes will be released as new versions (v2, v3, etc.)

Old versions supported for 6 months after new version release.
