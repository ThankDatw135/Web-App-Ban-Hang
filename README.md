# Luxury Fashion Platform

> Quiet Luxury · Timeless Elegance

A commercial-grade luxury fashion e-commerce platform with web, mobile, and AI virtual try-on capabilities.

## 🏗️ Project Structure

```
├── backend/          # NestJS Backend API
├── frontend/
│   ├── web/         # Next.js Web Application
│   └── mobile/      # React Native Mobile App
├── ai-service/       # FastAPI AI Try-On Service
├── database/         # SQL Migrations & Seeds
├── deployment/       # Docker & Deployment Configs
└── docs/            # Project Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.10+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Using Docker (Recommended)

```bash
# Clone the repository
git clone <repo-url>
cd luxury-fashion-platform

# Copy environment files
cp deployment/.env.example deployment/.env

# Start all services
cd deployment
docker-compose up -d

# Access the application
# Web: http://localhost:3001
# API: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
# AI Service: http://localhost:8000
```

### Manual Setup

#### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

#### Frontend Web

```bash
cd frontend/web
cp .env.local.example .env.local
npm install
npm run dev
```

#### AI Service

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## 🎨 Design Philosophy

- **Quiet Luxury**: Understated elegance over loud branding
- **Editorial Fashion**: High-fashion magazine aesthetic
- **Minimal but Emotional**: Every element has purpose
- **Timeless**: Designs that transcend trends

### Color Palette

| Color      | Hex       | Usage          |
| ---------- | --------- | -------------- |
| Charcoal   | `#0E0E0E` | Primary dark   |
| Ivory      | `#F7F5F2` | Primary light  |
| Muted Gold | `#C9B37E` | Accent         |
| Soft Gray  | `#8B8B8B` | Secondary text |

### Typography

- **Headings**: Playfair Display
- **Body**: Inter

## 🛠️ Tech Stack

| Layer        | Technology                              |
| ------------ | --------------------------------------- |
| Backend      | NestJS, TypeORM, PostgreSQL             |
| Frontend Web | Next.js 14, Tailwind CSS, Framer Motion |
| Mobile       | React Native                            |
| AI Service   | FastAPI, Python, Pillow                 |
| Cache        | Redis                                   |
| Queue        | RabbitMQ                                |
| Auth         | Firebase                                |

## 📚 Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Implementation Plan](docs/implementation_plan.md)
- [API Documentation](http://localhost:3000/api/docs)

## 🔐 Environment Variables

See `.env.example` files in each service directory:

- `backend/.env.example`
- `frontend/web/.env.local.example`
- `ai-service/.env.example`
- `deployment/.env.example`

## 📦 Services

| Service      | Port | Description     |
| ------------ | ---- | --------------- |
| Backend API  | 3000 | NestJS REST API |
| Web Frontend | 3001 | Next.js Web App |
| AI Service   | 8000 | FastAPI Try-On  |
| PostgreSQL   | 5432 | Database        |
| Redis        | 6379 | Cache           |
| RabbitMQ     | 5672 | Message Queue   |

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend/web
npm run test
```

## 📄 License

© 2026 Luxury Fashion. All rights reserved.
