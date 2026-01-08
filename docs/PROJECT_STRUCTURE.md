# 📁 Luxury Fashion Platform - Project Structure

> **MASTER DOCUMENT** - Complete project architecture and folder structure  
> Last Updated: 2026-01-08

---

## 🎯 Overview

This document defines the **complete project structure** for the Luxury Fashion E-Commerce Platform. All developers must follow this structure exactly.

---

## 📐 Technology Stack

| Layer            | Technology                    | Version |
| ---------------- | ----------------------------- | ------- |
| **Backend**      | NestJS (Node.js + TypeScript) | 10.x    |
| **Web Frontend** | Next.js (App Router)          | 14.x    |
| **Mobile**       | React Native (TypeScript)     | 0.73+   |
| **AI Service**   | FastAPI (Python)              | 3.10+   |
| **Database**     | PostgreSQL                    | 15.x    |
| **Cache**        | Redis                         | 7.x     |
| **Queue**        | RabbitMQ                      | 3.12+   |
| **Auth**         | Firebase Authentication       | Latest  |
| **Storage**      | S3-compatible                 | -       |
| **Deployment**   | Docker + docker-compose       | Latest  |

---

## 🗂️ Root Structure

```
fashion-platform/
│
├── 📁 backend/                 # NestJS API Server
├── 📁 frontend/
│   ├── 📁 web/                # Next.js Web Application
│   └── 📁 mobile/             # React Native Mobile App
├── 📁 ai-service/             # FastAPI AI Try-On Service
├── 📁 database/               # Database Scripts & Migrations
├── 📁 deployment/             # Docker & Deployment Configs
├── 📁 docs/                   # Documentation (THIS FOLDER)
└── 📄 README.md               # Project Overview
```

---

## 🔧 Backend Structure (NestJS)

> ⚠️ **MANDATORY STRUCTURE** - Do NOT modify

```
backend/
├── src/
│   ├── main.ts                        # Application entry point
│   ├── app.module.ts                  # Root module
│   │
│   ├── config/                        # ⚙️ Configuration
│   │   ├── app.config.ts              # App settings
│   │   ├── database.config.ts         # PostgreSQL config
│   │   ├── redis.config.ts            # Redis config
│   │   ├── firebase.config.ts         # Firebase Admin SDK
│   │   ├── rabbitmq.config.ts         # RabbitMQ config
│   │   └── index.ts                   # Config exports
│   │
│   ├── common/                        # 🛠️ Shared Utilities
│   │   ├── constants/                 # App constants
│   │   │   ├── app.constants.ts
│   │   │   └── index.ts
│   │   ├── decorators/                # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   ├── roles.decorator.ts
│   │   │   └── index.ts
│   │   ├── guards/                    # Auth & Role guards
│   │   │   ├── firebase-auth.guard.ts
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── index.ts
│   │   ├── interceptors/              # Response interceptors
│   │   │   ├── transform.interceptor.ts
│   │   │   ├── logging.interceptor.ts
│   │   │   └── index.ts
│   │   ├── middlewares/               # HTTP middlewares
│   │   │   ├── logger.middleware.ts
│   │   │   └── index.ts
│   │   ├── pipes/                     # Validation pipes
│   │   │   ├── validation.pipe.ts
│   │   │   └── index.ts
│   │   ├── utils/                     # Helper functions
│   │   │   ├── hash.util.ts
│   │   │   ├── date.util.ts
│   │   │   └── index.ts
│   │   └── types/                     # TypeScript types
│   │       ├── common.types.ts
│   │       ├── response.types.ts
│   │       └── index.ts
│   │
│   ├── integrations/                  # 🔌 External Services
│   │   ├── redis/                     # Redis Cache
│   │   │   ├── redis.module.ts
│   │   │   ├── redis.service.ts
│   │   │   └── index.ts
│   │   ├── rabbitmq/                  # Message Queue
│   │   │   ├── rabbitmq.module.ts
│   │   │   ├── rabbitmq.service.ts
│   │   │   └── index.ts
│   │   ├── storage/                   # S3 Storage
│   │   │   ├── storage.module.ts
│   │   │   ├── storage.service.ts
│   │   │   └── index.ts
│   │   └── ai/                        # AI Service Client
│   │       ├── ai.module.ts
│   │       ├── ai.service.ts
│   │       └── index.ts
│   │
│   ├── modules/                       # 📦 Domain Modules
│   │   │
│   │   ├── auth/                      # 🔐 Authentication
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── strategies/
│   │   │   │   ├── firebase.strategy.ts
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── users/                     # 👤 User Management
│   │   │   ├── users.module.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── products/                  # 🛍️ Product Catalog
│   │   │   ├── products.module.ts
│   │   │   ├── products.controller.ts
│   │   │   ├── products.service.ts
│   │   │   ├── products.repository.ts
│   │   │   ├── entities/
│   │   │   │   ├── product.entity.ts
│   │   │   │   └── category.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-product.dto.ts
│   │   │   │   ├── update-product.dto.ts
│   │   │   │   ├── product-filter.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── cart/                      # 🛒 Shopping Cart
│   │   │   ├── cart.module.ts
│   │   │   ├── cart.controller.ts
│   │   │   ├── cart.service.ts
│   │   │   ├── cart.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── cart-item.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── add-to-cart.dto.ts
│   │   │   │   ├── update-cart.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── orders/                    # 📋 Order Management
│   │   │   ├── orders.module.ts
│   │   │   ├── orders.controller.ts
│   │   │   ├── orders.service.ts
│   │   │   ├── orders.repository.ts
│   │   │   ├── entities/
│   │   │   │   ├── order.entity.ts
│   │   │   │   └── order-item.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-order.dto.ts
│   │   │   │   ├── update-order-status.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── payments/                  # 💳 Payment Processing
│   │   │   ├── payments.module.ts
│   │   │   ├── payments.controller.ts
│   │   │   ├── payments.service.ts
│   │   │   ├── entities/
│   │   │   │   └── payment.entity.ts
│   │   │   ├── dto/
│   │   │   │   └── process-payment.dto.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── discounts/                 # 🏷️ Discount Codes
│   │   │   ├── discounts.module.ts
│   │   │   ├── discounts.controller.ts
│   │   │   ├── discounts.service.ts
│   │   │   ├── discounts.repository.ts
│   │   │   ├── entities/
│   │   │   │   └── discount.entity.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-discount.dto.ts
│   │   │   │   ├── validate-discount.dto.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── activity/                  # 📊 User Activity & Analytics
│   │   │   ├── activity.module.ts
│   │   │   ├── activity.controller.ts
│   │   │   ├── activity.service.ts
│   │   │   ├── entities/
│   │   │   │   └── activity.entity.ts
│   │   │   └── index.ts
│   │   │
│   │   └── admin/                     # 👨‍💼 Admin Panel
│   │       ├── admin.module.ts
│   │       ├── admin.controller.ts
│   │       ├── admin.service.ts
│   │       ├── entities/
│   │       │   └── admin-user.entity.ts
│   │       ├── dto/
│   │       │   ├── admin-login.dto.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   └── database/                      # 🗄️ Database Layer
│       ├── database.module.ts         # TypeORM module
│       ├── migrations/                # Database migrations
│       │   └── .gitkeep
│       └── seeders/                   # Initial data seeders
│           └── .gitkeep
│
├── test/                              # 🧪 Tests
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example                       # Environment template
├── .eslintrc.js                       # ESLint config
├── .prettierrc                        # Prettier config
├── Dockerfile                         # Docker image
├── nest-cli.json                      # NestJS CLI config
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
└── tsconfig.build.json               # Build config
```

### Backend Rules

| ✅ DO                         | ❌ DON'T                         |
| ----------------------------- | -------------------------------- |
| 1 module = 1 domain           | No global `services/` folder     |
| Repository inside module only | No `routes/` folder              |
| Controller = HTTP layer only  | No `iot/` folder                 |
| Service = business logic      | No business logic in controllers |

---

## 🌐 Frontend Web Structure (Next.js)

```
frontend/web/
├── src/
│   ├── app/                           # 📱 App Router Pages
│   │   ├── (auth)/                    # Auth Route Group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (shop)/                    # Shop Route Group
│   │   │   ├── page.tsx               # Home page
│   │   │   ├── products/
│   │   │   │   ├── page.tsx           # Product listing
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   ├── ai-tryon/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (user)/                    # User Route Group
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx           # Order list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx       # Order detail
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (admin)/                   # Admin Route Group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── orders/
│   │   │   │   └── page.tsx
│   │   │   ├── discounts/
│   │   │   │   └── page.tsx
│   │   │   ├── banners/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   ├── globals.css                # Global styles
│   │   └── providers.tsx              # Context providers
│   │
│   ├── components/                    # 🧩 React Components
│   │   ├── ui/                        # Design System Components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Skeleton/
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                    # Layout Components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── index.ts
│   │   │
│   │   ├── product/                   # Product Components
│   │   │   ├── ProductCard/
│   │   │   ├── ProductGrid/
│   │   │   ├── ProductGallery/
│   │   │   └── index.ts
│   │   │
│   │   └── ai-tryon/                  # AI Try-On Components
│   │       ├── TryOnModal/
│   │       ├── ImageUploader/
│   │       ├── ResultViewer/
│   │       └── index.ts
│   │
│   ├── lib/                           # 📚 Utilities & Services
│   │   ├── api/                       # API Client
│   │   │   ├── client.ts              # Axios instance
│   │   │   ├── auth.ts                # Auth endpoints
│   │   │   ├── products.ts            # Products endpoints
│   │   │   ├── cart.ts                # Cart endpoints
│   │   │   ├── orders.ts              # Orders endpoints
│   │   │   └── index.ts
│   │   │
│   │   ├── firebase/                  # Firebase Config
│   │   │   ├── config.ts
│   │   │   ├── auth.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                     # Custom Hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useProducts.ts
│   │   │   └── index.ts
│   │   │
│   │   └── utils/                     # Helper Functions
│   │       ├── format.ts
│   │       ├── validation.ts
│   │       └── index.ts
│   │
│   └── styles/                        # 🎨 Styling
│       ├── variables.css              # CSS Custom Properties
│       ├── typography.css             # Font styles
│       ├── animations.css             # Motion design
│       └── components.css             # Component styles
│
├── public/                            # Static Assets
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── .env.local.example                 # Environment template
├── Dockerfile                         # Docker image
├── next.config.js                     # Next.js config
├── package.json                       # Dependencies
├── postcss.config.js                  # PostCSS config
├── tailwind.config.ts                 # Tailwind config
└── tsconfig.json                      # TypeScript config
```

---

## 📱 Mobile Structure (React Native - Android Only)

> ⚠️ **ANDROID ONLY** - Không có iOS

```
frontend/mobile/
├── App.tsx                        # Entry point với dark theme
├── index.js                       # RN entry
├── app.json                       # App config
├── package.json                   # Dependencies (Android only)
├── tsconfig.json                  # TypeScript config với path aliases
├── babel.config.js                # Babel config
├── metro.config.js                # Metro bundler
├── README.md                      # Hướng dẫn Android
│
├── src/
│   ├── screens/                   # 📱 App Screens
│   │   ├── HomeScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── TryOnScreen.tsx
│   │   ├── NotificationScreen.tsx
│   │   ├── AccountScreen.tsx
│   │   └── index.ts
│   │
│   ├── components/                # 🧩 Shared Components
│   │   ├── LuxuryButton.tsx
│   │   ├── ProductCard.tsx
│   │   └── index.ts
│   │
│   ├── navigation/                # 🧭 Navigation
│   │   └── RootNavigator.tsx      # Bottom Tab Navigator (5 tabs)
│   │
│   ├── services/                  # 🔌 API Services
│   │   ├── api.ts                 # Axios client
│   │   ├── auth.service.ts        # Firebase Auth
│   │   ├── product.service.ts     # Product API
│   │   └── index.ts
│   │
│   ├── theme/                     # 🎨 Design System
│   │   ├── colors.ts              # Color palette (dark mode)
│   │   ├── typography.ts          # Fonts & text styles
│   │   ├── spacing.ts             # Spacing & shadows
│   │   └── index.ts
│   │
│   ├── store/                     # 📦 State Management
│   ├── hooks/                     # 🪝 Custom Hooks
│   └── utils/                     # 🛠️ Utilities
│
└── android/                       # 🤖 Android Native (KOTLIN - không phải Java)
    ├── build.gradle               # Root gradle config
    ├── settings.gradle
    ├── gradle.properties
    └── app/
        ├── build.gradle           # App gradle config
        └── src/main/
            ├── kotlin/                        # ✅ KOTLIN folder
            │   └── com/luxuryfashion/
            │       ├── MainActivity.kt
            │       └── MainApplication.kt
            ├── res/values/
            │   ├── strings.xml
            │   └── styles.xml
            └── AndroidManifest.xml
```

### Mobile Rules (Android Only)

| ✅ DO                         | ❌ DON'T                      |
| ----------------------------- | ----------------------------- |
| TypeScript cho business logic | Không viết logic trong Kotlin |
| Kotlin cho native wrapper     | Không dùng Java               |
| Dark mode làm mặc định        | Không build cho iOS           |
| Bottom tabs navigation        | Không dùng Expo               |

---

## 🤖 AI Service Structure (FastAPI)

```
ai-service/
├── app/
│   ├── main.py                        # FastAPI entry point
│   │
│   ├── api/                           # 🔌 API Routes
│   │   ├── __init__.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── tryon.py               # Try-On endpoints
│   │   │   └── health.py              # Health check
│   │   └── deps.py                    # Dependencies
│   │
│   ├── core/                          # ⚙️ Core Config
│   │   ├── __init__.py
│   │   ├── config.py                  # Settings
│   │   └── security.py                # Auth utils
│   │
│   ├── models/                        # 🧠 AI Models
│   │   ├── __init__.py
│   │   └── tryon_model.py             # Virtual Try-On model
│   │
│   ├── services/                      # 💼 Business Logic
│   │   ├── __init__.py
│   │   ├── image_processor.py         # Image processing
│   │   ├── model_service.py           # Model inference
│   │   └── storage_service.py         # S3 storage
│   │
│   ├── schemas/                       # 📋 Pydantic Schemas
│   │   ├── __init__.py
│   │   ├── tryon.py                   # Try-On schemas
│   │   └── common.py                  # Common schemas
│   │
│   └── utils/                         # 🛠️ Utilities
│       ├── __init__.py
│       └── helpers.py
│
├── tests/                             # 🧪 Tests
│   ├── __init__.py
│   └── test_tryon.py
│
├── models/                            # 📦 Pre-trained Models
│   └── .gitkeep
│
├── .env.example                       # Environment template
├── Dockerfile                         # Docker image
├── requirements.txt                   # Python dependencies
└── pyproject.toml                     # Project config
```

---

## 🗄️ Database Structure

```
database/
├── migrations/                        # 📊 Migration Files
│   ├── 001_initial_schema.sql
│   ├── 002_add_indexes.sql
│   └── ...
│
├── seeders/                           # 🌱 Seed Data
│   ├── 001_admin_users.sql
│   ├── 002_categories.sql
│   ├── 003_sample_products.sql
│   └── ...
│
└── schema.sql                         # 📋 Complete Schema
```

---

## 🐳 Deployment Structure

```
deployment/
├── docker/                            # 🐳 Dockerfiles
│   ├── backend.Dockerfile
│   ├── web.Dockerfile
│   ├── ai-service.Dockerfile
│   └── nginx.Dockerfile
│
├── nginx/                             # 🌐 Nginx Config
│   ├── nginx.conf
│   └── ssl/
│
├── scripts/                           # 📜 Utility Scripts
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
│
├── docker-compose.yml                 # Development
├── docker-compose.prod.yml            # Production
├── .env.example                       # Environment template
└── README.md                          # Deployment guide
```

---

## 🎨 Design System Reference

### Color Palette

| Name           | Hex       | Usage                           |
| -------------- | --------- | ------------------------------- |
| **Charcoal**   | `#0E0E0E` | Primary text, dark backgrounds  |
| **Ivory**      | `#F7F5F2` | Primary background, light text  |
| **Soft Gray**  | `#8B8B8B` | Secondary text, borders         |
| **Muted Gold** | `#C9B37E` | Accents (10% max), interactions |
| **Dark BG**    | `#121212` | Dark mode background            |
| **Warm White** | `#F5F1E8` | Dark mode text                  |

### Typography

| Category     | Font             | Weights            |
| ------------ | ---------------- | ------------------ |
| **Headings** | Playfair Display | 400, 500, 600, 700 |
| **Body/UI**  | Inter            | 300, 400, 500, 600 |

### Motion

```css
--ease-elegant: cubic-bezier(0.4, 0, 0.2, 1);
--duration-slow: 600ms;
--duration-medium: 400ms;
--duration-fast: 200ms;
```

---

## 📝 File Naming Conventions

| Type            | Convention           | Example              |
| --------------- | -------------------- | -------------------- |
| **Components**  | PascalCase           | `ProductCard.tsx`    |
| **Pages**       | lowercase            | `page.tsx`           |
| **Hooks**       | camelCase + use      | `useAuth.ts`         |
| **Services**    | kebab-case           | `auth.service.ts`    |
| **Types**       | kebab-case           | `common.types.ts`    |
| **CSS Modules** | Component.module.css | `Button.module.css`  |
| **Entities**    | singular.entity.ts   | `user.entity.ts`     |
| **DTOs**        | action.dto.ts        | `create-user.dto.ts` |

---

## 🚀 Quick Start

```bash
# Clone repository
git clone <repo-url>
cd fashion-platform

# Start all services with Docker
docker-compose up -d

# Or run individually:

# Backend
cd backend && npm install && npm run start:dev

# Web Frontend
cd frontend/web && npm install && npm run dev

# Mobile
cd frontend/mobile && npm install && npx react-native run-android

# AI Service
cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --reload
```

---

## 📚 Related Documentation

- [Implementation Plan](./implementation_plan.md)
- [Design System](./design-system.md)
- [Database Schema](./database-schema.md)
- [API Documentation](./api-documentation.md)
- [UML Diagrams](./uml-diagrams.md)
- [Project Setup Guide](./project-setup-guide.md)
- [Mobile Structure](./mobile-structure.md)

---

**Last Updated:** 2026-01-08  
**Version:** 1.0.0
