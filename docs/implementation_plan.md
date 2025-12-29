# Luxury Fashion E-Commerce Platform - Implementation Plan

A high-end luxury fashion platform with AI Try-On capabilities, designed for timeless elegance and scalability.

---

## User Review Required

> [!IMPORTANT] > **Technology Stack Confirmation**
>
> - Backend: NestJS (Node.js + TypeScript)
> - Web: Next.js 14+ (App Router, TypeScript)
> - Mobile: React Native (TypeScript)
> - AI Service: FastAPI (Python)
> - Database: PostgreSQL
> - Auth: Firebase (Google OAuth + Email OTP)
> - Deployment: Full Docker containerization

> [!IMPORTANT] > **Design Philosophy**
> This platform prioritizes **Quiet Luxury** and **Editorial Fashion** aesthetics. The design will be:
>
> - Calm, refined, emotionally pleasing
> - Timeless (5+ year usability)
> - Minimal but never boring
> - 90% neutral colors, 10% subtle gold accents
> - Large white space, editorial layouts
> - Slow, elegant motion design

> [!WARNING] > **Project Scope**
> This is a comprehensive full-stack project including:
>
> - Complete backend API
> - Responsive web application
> - Mobile app (iOS/Android)
> - AI Try-On service
> - Admin dashboard
> - Full Docker deployment
>
> Estimated development time: 4-6 weeks for MVP. Please confirm if you want to proceed with full implementation or start with specific modules.

---

## Proposed Changes

### Phase 1: Project Structure & Setup

#### [NEW] [Project Root Structure](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang)

```
root/
├── backend/              # NestJS API
├── frontend/
│   ├── web/             # Next.js web app
│   └── mobile/          # React Native app
├── ai-service/          # FastAPI AI Try-On
├── database/            # Schema & migrations
├── deployment/
│   ├── docker/          # Individual Dockerfiles
│   └── docker-compose.yml
├── shared/              # Shared types & constants
└── docs/                # Documentation
```

**Setup Actions:**

- Initialize monorepo structure
- Setup TypeScript configurations
- Configure ESLint & Prettier
- Setup Git workflows

---

### Phase 2: Design System

#### [NEW] [Design System Documentation](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/docs/design-system.md)

**Color System:**

```css
/* Primary */
--color-charcoal: #0e0e0e;
--color-ivory: #f7f5f2;

/* Secondary */
--color-soft-gray: #8b8b8b;
--color-muted-gold: #c9b37e;

/* Dark Mode (Default) */
--bg-dark: #121212;
--text-warm-white: #f5f1e8;
```

**Typography:**

- Headings: Playfair Display (Serif)
- Body/UI: Inter (Sans-Serif)
- Fluid typography with clamp()
- Editorial line heights (1.6-1.8)

**Component Library:**

- Button variants (primary, secondary, ghost)
- Card components (product, editorial)
- Form inputs (elegant, minimal)
- Modal/Dialog (fullscreen for AI Try-On)
- Navigation (sticky, minimal)

**Motion System:**

```css
/* Timing Functions */
--ease-elegant: cubic-bezier(0.4, 0.0, 0.2, 1);
--duration-slow: 600ms;
--duration-medium: 400ms;

/* Allowed Animations */
- Fade (opacity)
- Slide (transform)
- Subtle parallax
- Gentle hover effects
```

---

### Phase 3: Database Architecture

#### [NEW] [Database Schema](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/database/schema.sql)

**Core Tables:**

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  full_name VARCHAR,
  phone VARCHAR,
  date_of_birth DATE,
  gender VARCHAR,
  address TEXT,
  avatar_url VARCHAR,
  firebase_uid VARCHAR UNIQUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Products
products (
  id UUID PRIMARY KEY,
  name VARCHAR,
  description TEXT,
  category VARCHAR, -- 'clothing' | 'accessories'
  subcategory VARCHAR, -- 'shirts' | 'pants' | 'outfits'
  price DECIMAL,
  images JSONB, -- Array of image URLs
  sizes JSONB, -- Available sizes
  stock INTEGER,
  featured BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Cart
cart_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER,
  size VARCHAR,
  created_at TIMESTAMP,
  UNIQUE(user_id, product_id, size)
)

-- Orders
orders (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  order_number VARCHAR UNIQUE,
  total_amount DECIMAL,
  status VARCHAR, -- 'pending' | 'confirmed' | 'shipped' | 'delivered'
  payment_method VARCHAR, -- 'cod' | 'bank_transfer'
  shipping_address JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER,
  size VARCHAR,
  price DECIMAL
)

-- Discount Codes
discount_codes (
  id UUID PRIMARY KEY,
  code VARCHAR UNIQUE,
  discount_type VARCHAR, -- 'percentage' | 'fixed'
  discount_value DECIMAL,
  min_purchase DECIMAL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  active BOOLEAN
)

-- Banners/Posters
banners (
  id UUID PRIMARY KEY,
  title VARCHAR,
  image_url VARCHAR,
  mobile_image_url VARCHAR,
  link VARCHAR,
  position INTEGER,
  active BOOLEAN,
  created_at TIMESTAMP
)

-- AI Try-On History
ai_tryon_history (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  user_image_url VARCHAR,
  product_images JSONB,
  result_image_url VARCHAR,
  created_at TIMESTAMP
)

-- Admin Users
admin_users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  password_hash VARCHAR,
  role VARCHAR, -- 'super_admin' | 'admin'
  created_at TIMESTAMP
)
```

**Indexes:**

- User email, firebase_uid
- Product category, featured
- Order user_id, status
- Cart user_id

---

### Phase 4: Backend API (NestJS)

#### [NEW] [Backend Structure](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/backend)

```
backend/
├── src/
│   ├── auth/              # Firebase auth integration
│   ├── users/             # User management
│   ├── products/          # Product CRUD
│   ├── cart/              # Cart operations
│   ├── orders/            # Order management
│   ├── admin/             # Admin endpoints
│   ├── discounts/         # Discount codes
│   ├── banners/           # Banner management
│   ├── ai-tryon/          # AI Try-On proxy
│   ├── common/            # Shared utilities
│   └── main.ts
├── Dockerfile
└── package.json
```

**Key API Endpoints:**

**Authentication:**

- `POST /auth/register` - Email/password registration
- `POST /auth/login` - Email/password login
- `POST /auth/google` - Google OAuth
- `POST /auth/forgot-password` - Send OTP
- `POST /auth/verify-otp` - Verify OTP
- `POST /auth/reset-password` - Reset password

**Users:**

- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `PUT /users/me/password` - Change password
- `GET /users/me/orders` - Order history

**Products:**

- `GET /products` - List products (pagination, filters)
- `GET /products/:id` - Product details
- `GET /products/featured` - Featured products
- `GET /products/categories` - List categories

**Cart:**

- `GET /cart` - Get user cart
- `POST /cart/items` - Add to cart
- `PUT /cart/items/:id` - Update quantity
- `DELETE /cart/items/:id` - Remove item

**Orders:**

- `POST /orders` - Create order
- `GET /orders/:id` - Order details
- `GET /orders` - User order history

**Admin:**

- `POST /admin/login` - Admin login
- `GET /admin/dashboard` - Dashboard stats
- `GET /admin/products` - Manage products
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product
- `GET /admin/orders` - All orders
- `POST /admin/discounts` - Create discount
- `GET /admin/discounts` - List discounts
- `POST /admin/banners` - Upload banner
- `GET /admin/banners` - List banners

**AI Try-On:**

- `POST /ai-tryon/generate` - Generate try-on image
- `GET /ai-tryon/history` - User try-on history

---

### Phase 5: Web Frontend (Next.js)

#### [NEW] [Web App Structure](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/frontend/web)

```
web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── forgot-password/
│   │   ├── (shop)/
│   │   │   ├── page.tsx          # Home
│   │   │   ├── products/
│   │   │   │   └── [id]/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   └── ai-tryon/
│   │   ├── (user)/
│   │   │   ├── profile/
│   │   │   └── orders/
│   │   └── (admin)/
│   │       └── dashboard/
│   ├── components/
│   │   ├── ui/              # Design system components
│   │   ├── layout/          # Header, Footer
│   │   ├── product/         # Product cards, grids
│   │   └── ai-tryon/        # AI Try-On UI
│   ├── lib/
│   │   ├── firebase.ts      # Firebase config
│   │   ├── api.ts           # API client
│   │   └── hooks/           # Custom hooks
│   └── styles/
│       ├── globals.css      # Design system
│       └── variables.css    # CSS variables
├── Dockerfile
└── package.json
```

**Key Pages:**

**Home (`/`):**

- Hero banner (editorial, large imagery)
- Featured products (bento grid)
- Category sections
- Editorial content blocks

**Product Detail (`/products/[id]`):**

- Large product images (gallery)
- Size selector
- Quantity selector
- Add to cart
- Size guide modal
- Product details (minimal, refined copy)

**Cart (`/cart`):**

- Cart items list
- Quantity controls
- Remove items
- Subtotal
- Checkout button

**Checkout (`/checkout`):**

- Auto-filled shipping info
- Editable fields
- Payment method selection
- Order summary
- Place order

**AI Try-On (`/ai-tryon`):**

- Fullscreen modal experience
- Step 1: Upload personal photo
- Step 2: Select product images
- Step 3: Generate & preview
- Save to history

**Profile (`/profile`):**

- Personal information form
- Avatar upload
- Change password
- Bank/wallet info

**Order History (`/orders`):**

- Order list (cards)
- Order details
- Order status

---

### Phase 6: Mobile App (React Native)

#### [NEW] [Mobile App Structure](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/frontend/mobile)

```
mobile/
├── src/
│   ├── screens/
│   │   ├── Home/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   ├── TryOutfit/
│   │   ├── Notifications/
│   │   ├── Account/
│   │   └── Auth/
│   ├── components/
│   │   ├── ui/              # Design system
│   │   └── product/
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── firebase.ts
│   ├── hooks/
│   └── theme/
│       └── index.ts         # Design tokens
├── Dockerfile
└── package.json
```

**Navigation:**

- Bottom tab navigation
- Stack navigation for details
- Modal for AI Try-On

**Screens:**

- Home (featured products, categories)
- Cart (cart management)
- Try Outfit (AI Try-On)
- Notifications (order updates)
- Account (profile, orders, settings)

---

### Phase 7: AI Service (FastAPI)

#### [NEW] [AI Service Structure](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/ai-service)

```
ai-service/
├── app/
│   ├── main.py              # FastAPI app
│   ├── models/
│   │   └── tryon_model.py   # AI model wrapper
│   ├── routes/
│   │   └── tryon.py         # API endpoints
│   ├── services/
│   │   ├── image_processor.py
│   │   └── model_service.py
│   └── utils/
│       └── storage.py       # S3/Cloud storage
├── requirements.txt
└── Dockerfile
```

**AI Try-On Flow:**

1. Receive user photo + product images
2. Preprocess images (resize, normalize)
3. Run AI model (virtual try-on)
4. Post-process result
5. Upload to storage
6. Return result URL

**API Endpoints:**

- `POST /api/v1/tryon/generate` - Generate try-on
- `GET /api/v1/tryon/status/:id` - Check status
- `GET /api/v1/health` - Health check

**Technology Options:**

- Virtual Try-On models (e.g., VITON-HD, HR-VITON)
- Image generation APIs (Stable Diffusion, custom models)
- Cloud GPU for inference

---

### Phase 8: Admin Dashboard

#### [NEW] [Admin Dashboard Pages](<file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/frontend/web/src/app/(admin)>)

**Dashboard (`/admin`):**

- Total revenue (chart)
- Product count
- User count
- Recent orders (web + app)
- Analytics graphs

**Product Management (`/admin/products`):**

- Product list (table/grid)
- Add product form
- Edit product
- Delete product
- Bulk actions

**Discount Codes (`/admin/discounts`):**

- Create discount code
- List active/expired codes
- Edit/deactivate codes
- Usage statistics

**Banner Management (`/admin/banners`):**

- Upload banner
- Auto-resize for web/mobile
- Position ordering
- Activate/deactivate
- Link management

**Order Management (`/admin/orders`):**

- All orders (web + app)
- Filter by status
- Order details
- Update status

---

### Phase 9: Deployment

#### [NEW] [Docker Configuration](file:///e:/Web-App-Ban-Hang/Web-App-Ban-Hang/deployment/docker-compose.yml)

**Services:**

```yaml
services:
  postgres:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: luxury_fashion
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      FIREBASE_CONFIG: ${FIREBASE_CONFIG}

  web:
    build: ./frontend/web
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
      NEXT_PUBLIC_FIREBASE_CONFIG: ${FIREBASE_CONFIG}

  ai-service:
    build: ./ai-service
    environment:
      MODEL_PATH: ${MODEL_PATH}
      STORAGE_BUCKET: ${STORAGE_BUCKET}
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./deployment/nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - backend
      - web
```

#### [NEW] Individual Dockerfiles

**Backend Dockerfile:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
```

**Web Dockerfile:**

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
CMD ["npm", "start"]
```

**AI Service Dockerfile:**

```dockerfile
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

---

## Verification Plan

### Automated Tests

**Backend:**

```bash
cd backend
npm run test          # Unit tests
npm run test:e2e      # E2E tests
```

**Web Frontend:**

```bash
cd frontend/web
npm run test          # Component tests
npm run test:e2e      # Playwright E2E
```

**AI Service:**

```bash
cd ai-service
pytest tests/         # Unit tests
```

### Manual Verification

**Design System:**

- [ ] Verify color system matches specifications
- [ ] Test typography on different screen sizes
- [ ] Validate motion/animation timing
- [ ] Check dark mode consistency

**User Flows:**

- [ ] Complete registration → login → browse → add to cart → checkout
- [ ] Test forgot password flow (OTP)
- [ ] Test Google OAuth login
- [ ] Test AI Try-On full flow
- [ ] Verify order appears in history

**Admin Flows:**

- [ ] Add/edit/delete products
- [ ] Create discount codes
- [ ] Upload banners (verify auto-resize)
- [ ] View dashboard analytics

**Responsive Design:**

- [ ] Test on desktop (1920px, 1440px, 1024px)
- [ ] Test on tablet (768px)
- [ ] Test on mobile (375px, 414px)
- [ ] Test zoom in/out (50%-200%)

**Performance:**

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Image optimization verified

**Cross-Platform:**

- [ ] Web on Chrome, Firefox, Safari
- [ ] Mobile app on iOS simulator
- [ ] Mobile app on Android emulator

### Docker Deployment

```bash
# Build all services
docker-compose build

# Start services
docker-compose up -d

# Run migrations
docker-compose exec backend npm run migration:run

# Verify services
docker-compose ps
curl http://localhost/api/health
curl http://localhost:8000/api/v1/health
```

---

## Implementation Timeline

**Week 1-2: Foundation**

- Project setup
- Design system
- Database schema
- Backend core (auth, users)

**Week 3-4: Core Features**

- Product management
- Cart & checkout
- Web frontend (main pages)
- Mobile app (main screens)

**Week 5: AI & Admin**

- AI Try-On service
- Admin dashboard
- Banner management

**Week 6: Polish & Deploy**

- Testing
- Performance optimization
- Docker deployment
- Documentation

---

## Next Steps

1. **Review this plan** - Confirm approach and scope
2. **Prioritize modules** - Which to build first?
3. **Confirm AI model** - Which virtual try-on solution?
4. **Environment setup** - Firebase project, cloud storage, etc.
