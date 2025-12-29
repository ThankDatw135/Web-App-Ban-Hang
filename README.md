# Luxury Fashion E-Commerce Platform

Nền tảng thương mại điện tử thời trang cao cấp với AI Try-On, được thiết kế cho sự thanh lịch vượt thời gian.

## 🏗️ Kiến Trúc Hệ Thống

- **Backend**: NestJS (Node.js + TypeScript)
- **Frontend Web**: Next.js 14+ (App Router, TypeScript)
- **Mobile App**: React Native (TypeScript)
- **AI Service**: FastAPI (Python)
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: Firebase (Google OAuth + Email OTP)
- **Storage**: Cloud Storage (S3/GCS)
- **Deployment**: Docker + Docker Compose

## 📁 Cấu Trúc Dự Án

```
├── backend/              # NestJS API Backend
├── frontend/
│   ├── web/             # Next.js Web Application
│   └── mobile/          # React Native Mobile App
├── ai-service/          # FastAPI AI Try-On Service
├── database/            # Database schemas & migrations
├── deployment/          # Docker & deployment configs
├── shared/              # Shared types & constants
└── docs/                # Documentation
```

## 🚀 Bắt Đầu

### Yêu Cầu Hệ Thống

- Node.js v18+
- Python v3.10+
- Docker Desktop
- PostgreSQL 15+
- Redis 7+

### Cài Đặt

#### 1. Backend (NestJS)

```bash
cd backend
npm install
cp .env.example .env
# Cấu hình .env với thông tin database và Firebase
npm run start:dev
```

#### 2. Frontend Web (Next.js)

```bash
cd frontend/web
npm install
cp .env.example .env.local
# Cấu hình .env.local với Firebase config
npm run dev
```

#### 3. Mobile App (React Native)

```bash
cd frontend/mobile
npm install
# Copy google-services.json vào android/app/
# Copy GoogleService-Info.plist vào ios/
npx react-native run-android  # hoặc run-ios
```

#### 4. AI Service (FastAPI)

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

### Chạy Với Docker

```bash
# Build tất cả services
docker-compose build

# Khởi động tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

## 🔗 URLs

- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **Web App**: http://localhost:3001
- **AI Service**: http://localhost:8000
- **AI Service Docs**: http://localhost:8000/docs

## 📚 Tài Liệu

- [Implementation Plan](./docs/implementation_plan.md)
- [Design System](./docs/design-system.md)
- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/api-documentation.md)
- [UML Diagrams](./docs/uml-diagrams.md)
- [Setup Guide](./docs/project-setup-guide.md)

## 🧪 Testing

```bash
# Backend
cd backend
npm run test
npm run test:e2e

# Frontend Web
cd frontend/web
npm run test
npm run test:e2e

# AI Service
cd ai-service
pytest
```

## 📦 Scripts

```bash
# Development
npm run dev          # Chạy tất cả services (dev mode)

# Build
npm run build        # Build tất cả services

# Lint
npm run lint         # Lint tất cả code

# Format
npm run format       # Format code với Prettier
```

## 🔐 Environment Variables

Mỗi service cần file `.env` riêng. Xem `.env.example` trong từng thư mục để biết các biến cần thiết.

### Backend (.env)

- `DATABASE_URL`
- `REDIS_URL`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_CLIENT_EMAIL`
- `JWT_SECRET`

### Frontend Web (.env.local)

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`

### AI Service (.env)

- `MODEL_PATH`
- `STORAGE_BUCKET`
- `API_URL`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary and confidential.

## 👥 Team

- **Backend**: NestJS Team
- **Frontend**: Next.js & React Native Team
- **AI**: Machine Learning Team
- **DevOps**: Infrastructure Team

## 📞 Support

For support, email support@luxuryfashion.com or join our Slack channel.

---

**Built with ❤️ by Luxury Fashion Team**
