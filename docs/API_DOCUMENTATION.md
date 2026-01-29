# API Documentation

> REST API endpoints for Luxury Fashion Platform

---

## 🔐 Authentication

### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe"
    },
    "token": "jwt_token"
  }
}
```

### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Google Sign-In

```http
POST /api/v1/auth/google
Content-Type: application/json

{
  "idToken": "firebase_id_token"
}
```

---

## 🛍️ Products

### Get All Products

```http
GET /api/v1/products?category=clothing&page=1&limit=20
```

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| category | string | Filter by category |
| search | string | Search keyword |
| minPrice | number | Min price filter |
| maxPrice | number | Max price filter |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

### Get Product by ID

```http
GET /api/v1/products/:id
```

### Get Featured Products

```http
GET /api/v1/products/featured
```

---

## 🛒 Cart (Authenticated)

### Get Cart

```http
GET /api/v1/cart
Authorization: Bearer {token}
```

### Add to Cart

```http
POST /api/v1/cart/items
Authorization: Bearer {token}
Content-Type: application/json

{
  "productId": "uuid",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}
```

### Update Cart Item

```http
PUT /api/v1/cart/items/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "quantity": 2
}
```

### Remove from Cart

```http
DELETE /api/v1/cart/items/:id
Authorization: Bearer {token}
```

---

## 📋 Orders (Authenticated)

### Create Order

```http
POST /api/v1/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "0123456789",
    "address": "123 Street",
    "city": "Ho Chi Minh",
    "district": "District 1"
  },
  "paymentMethod": "cod",
  "discountCode": "LUXURY20"
}
```

### Get User Orders

```http
GET /api/v1/orders
Authorization: Bearer {token}
```

### Get Order by ID

```http
GET /api/v1/orders/:id
Authorization: Bearer {token}
```

---

## 🏷️ Discounts

### Validate Discount Code

```http
POST /api/v1/discounts/validate
Authorization: Bearer {token}
Content-Type: application/json

{
  "code": "LUXURY20",
  "orderTotal": 5000000
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "discountType": "percentage",
    "discountValue": 20,
    "discountAmount": 1000000
  }
}
```

---

## 🤖 AI Try-On

### Generate Try-On (Async)

```http
POST /api/v1/tryon/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "userImageUrl": "https://s3.../user.jpg",
  "productImageUrls": ["https://s3.../product.jpg"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "status": "processing"
  }
}
```

### Check Try-On Status

```http
GET /api/v1/tryon/status/:jobId
Authorization: Bearer {token}
```

**Response (completed):**

```json
{
  "success": true,
  "data": {
    "jobId": "uuid",
    "status": "completed",
    "resultImageUrl": "https://s3.../result.jpg"
  }
}
```

---

## 👤 User Profile (Authenticated)

### Get Profile

```http
GET /api/v1/users/profile
Authorization: Bearer {token}
```

### Update Profile

```http
PUT /api/v1/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "John Doe",
  "phone": "0123456789",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Street"
}
```

---

## 🔒 Error Responses

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid token"
  }
}
```

| Status | Code           | Description           |
| ------ | -------------- | --------------------- |
| 400    | BAD_REQUEST    | Invalid input         |
| 401    | UNAUTHORIZED   | Missing/invalid token |
| 403    | FORBIDDEN      | No permission         |
| 404    | NOT_FOUND      | Resource not found    |
| 500    | INTERNAL_ERROR | Server error          |
