# Luxury Fashion E-Commerce Platform - Project Setup Guide

**Last Updated:** 2025-12-30  
**Version:** 2.0  
**Architecture:** Refactored with Clean Architecture Principles

---

## 📁 Project Structure

```
Web-App-Ban-Hang/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── config/            # ✨ Centralized configuration
│   │   │   └── index.ts       # Environment variables & settings
│   │   ├── constants/         # ✨ Application constants
│   │   │   └── index.ts       # Status codes, messages, enums
│   │   ├── middlewares/       # ✨ Global middlewares
│   │   │   ├── logger.middleware.ts
│   │   │   ├── exception.filter.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── utils/             # ✨ Utility functions
│   │   │   └── helpers.ts     # Reusable helper functions
│   │   ├── auth/              # Authentication module
│   │   ├── users/             # User management module
│   │   ├── products/          # Product management module
│   │   ├── cart/              # Shopping cart module
│   │   ├── orders/            # Order management module
│   │   ├── admin/             # Admin module (placeholder)
│   │   ├── discounts/         # Discount codes (placeholder)
│   │   ├── banners/           # Banners (placeholder)
│   │   ├── ai-tryon/          # AI Try-On (placeholder)
│   │   ├── notifications/     # Notifications (placeholder)
│   │   ├── app.module.ts      # Root module
│   │   └── main.ts            # Application entry point
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── web/                   # Next.js 14 Web Application
│   │   ├── src/app/           # App Router
│   │   ├── package.json
│   │   ├── next.config.js
│   │   └── Dockerfile
│   │
│   └── mobile/                # React Native Mobile App
│       ├── src/
│       ├── android/
│       ├── package.json
│       └── app.json
│
├── ai-service/                # FastAPI AI Try-On Service
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
│
├── database/                  # Database schemas
│   └── schema.sql
│
├── deployment/                # Docker configs
│   ├── docker-compose.yml
│   └── .env.example
│
├── shared/                    # Shared TypeScript types
│   └── types/index.ts
│
└── docs/                      # Documentation
    ├── api-documentation.md
    ├── design-system.md
    ├── backend-final-review.md
    └── project-setup-guide.md
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run start:dev
```

### 2. Frontend Web Setup

```bash
cd frontend/web
npm install
cp .env.example .env.local
npm run dev
```

### 3. Docker Setup (All Services)

```bash
cd deployment
cp .env.example .env
docker-compose up -d
```

---

## 📚 Full Documentation

See individual documentation files in `docs/` folder for detailed information.

**Happy Coding! 🚀**
