# Hướng Dẫn Khởi Tạo Dự Án - Luxury Fashion Platform

## 📋 Yêu Cầu Hệ Thống

### Phần Mềm Cần Thiết:

- ✅ **Node.js** v18+ ([Download](https://nodejs.org/))
- ✅ **Python** v3.10+ ([Download](https://www.python.org/))
- ✅ **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop/))
- ✅ **Git** ([Download](https://git-scm.com/))
- ✅ **Android Studio** (cho mobile) ([Download](https://developer.android.com/studio))
- ✅ **Xcode** (cho iOS, chỉ trên macOS) ([Download](https://developer.apple.com/xcode/))

### Kiểm Tra Cài Đặt:

```bash
node --version    # v18.0.0 trở lên
npm --version     # 9.0.0 trở lên
python --version  # 3.10.0 trở lên
docker --version  # 20.0.0 trở lên
git --version     # 2.0.0 trở lên
```

---

## 🚀 Các Bước Khởi Tạo

### Option A: Khởi Tạo Toàn Bộ (Đề Xuất)

Tạo cấu trúc + file configs, KHÔNG chạy install (nhanh, tránh lỗi)

### Option B: Khởi Tạo Từng Phần

1. Backend (NestJS)
2. Frontend Web (Next.js)
3. Mobile App (React Native)
4. AI Service (FastAPI)
5. Docker & Deployment

### Option C: Khởi Tạo Đầy Đủ

Tạo tất cả + chạy npm/pip install (mất 10-15 phút)

---

## 📁 Cấu Trúc Dự Án Sẽ Tạo

```
Web-App-Ban-Hang/
├── backend/                    # NestJS Backend API
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── admin/
│   │   └── main.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── Dockerfile
│
├── frontend/
│   ├── web/                    # Next.js Web App
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── styles/
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── .env.example
│   │   └── Dockerfile
│   │
│   └── mobile/                 # React Native Mobile App
│       ├── android/
│       ├── ios/
│       ├── src/
│       │   ├── screens/
│       │   ├── components/
│       │   ├── navigation/
│       │   └── services/
│       ├── package.json
│       └── app.json
│
├── ai-service/                 # FastAPI AI Service
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   ├── requirements.txt
│   ├── .env.example
│   └── Dockerfile
│
├── database/                   # Database
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
│
├── deployment/                 # Docker & Deployment
│   ├── docker/
│   │   ├── backend.Dockerfile
│   │   ├── web.Dockerfile
│   │   ├── ai.Dockerfile
│   │   └── nginx.conf
│   └── docker-compose.yml
│
├── shared/                     # Shared Code
│   ├── types/
│   └── constants/
│
├── docs/                       # Documentation
│   ├── api/
│   ├── setup/
│   └── deployment/
│
├── .gitignore
├── .env.example
├── README.md
└── package.json                # Root package.json (monorepo)
```

---

## 🔧 Các Lệnh Khởi Tạo

### 1. Backend (NestJS)

```bash
cd backend
npm init -y
npm install @nestjs/cli
npx nest new . --skip-git
npm install @nestjs/config @nestjs/typeorm typeorm pg
npm install firebase-admin
npm install class-validator class-transformer
```

### 2. Frontend Web (Next.js)

```bash
cd frontend/web
npx create-next-app@latest . --typescript --tailwind --app --src-dir
npm install axios
npm install firebase
npm install @reduxjs/toolkit react-redux
```

### 3. Mobile App (React Native)

```bash
cd frontend/mobile
npx react-native@latest init LuxuryFashion --template react-native-template-typescript
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-firebase/app @react-native-firebase/auth
npm install axios
```

### 4. AI Service (FastAPI)

```bash
cd ai-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install fastapi uvicorn
pip install python-multipart
pip install pillow
pip install torch torchvision  # Cho AI model
```

### 5. Docker Setup

```bash
# Tạo docker-compose.yml
cd deployment
# File sẽ được tạo tự động
```

---

## 🔑 Cấu Hình Firebase

### Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới: "Luxury Fashion"
3. Enable Authentication (Email/Password + Google)
4. Enable Firestore Database
5. Enable Cloud Storage

### Bước 2: Lấy Config

1. Project Settings → General
2. Scroll xuống "Your apps"
3. Chọn Web app → Copy config
4. Download `google-services.json` (Android)
5. Download `GoogleService-Info.plist` (iOS)

### Bước 3: Cấu Hình

```bash
# Backend (.env)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Frontend Web (.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Mobile
# Copy google-services.json → android/app/
# Copy GoogleService-Info.plist → ios/
```

---

## 🗄️ Cấu Hình Database

### PostgreSQL Local

```bash
# Sử dụng Docker
docker run --name luxury-fashion-db \
  -e POSTGRES_PASSWORD=your-password \
  -e POSTGRES_DB=luxury_fashion \
  -p 5432:5432 \
  -d postgres:15

# Hoặc cài đặt PostgreSQL local
# Download: https://www.postgresql.org/download/
```

### Connection String

```bash
DATABASE_URL=postgresql://postgres:your-password@localhost:5432/luxury_fashion
```

---

## 🐳 Chạy Với Docker

### Build & Run

```bash
# Build tất cả services
docker-compose build

# Chạy tất cả services
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### Services URLs

- Backend API: http://localhost:3000
- Web App: http://localhost:3001
- AI Service: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

---

## 🧪 Kiểm Tra Setup

### Backend

```bash
cd backend
npm run start:dev
# Truy cập: http://localhost:3000/api/health
```

### Frontend Web

```bash
cd frontend/web
npm run dev
# Truy cập: http://localhost:3001
```

### Mobile

```bash
cd frontend/mobile
# Android
npm run android

# iOS (chỉ macOS)
npm run ios
```

### AI Service

```bash
cd ai-service
source venv/bin/activate
uvicorn app.main:app --reload
# Truy cập: http://localhost:8000/docs
```

---

## 📝 Các File Quan Trọng

### .gitignore

```
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
venv/
__pycache__/
*.pyc
.idea/
.vscode/
```

### .env.example

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/luxury_fashion

# Redis
REDIS_URL=redis://localhost:6379

# Firebase
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=

# API
API_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000

# AI Service
AI_SERVICE_URL=http://localhost:8000

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

---

## ⚠️ Lưu Ý Quan Trọng

1. **Không commit file .env** - Chỉ commit .env.example
2. **Firebase credentials** - Giữ bí mật, không share
3. **Database migrations** - Chạy migrations trước khi start
4. **Mobile setup** - Cần Android Studio/Xcode đã cài đặt
5. **AI Service** - Cần GPU cho production (CPU cho dev)

---

## 🆘 Xử Lý Lỗi Thường Gặp

### Lỗi: "Cannot find module"

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "Port already in use"

```bash
# Tìm process đang dùng port
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Lỗi: Database connection

```bash
# Kiểm tra PostgreSQL đang chạy
docker ps
# Hoặc
pg_isready
```

---

## 📚 Tài Liệu Tham Khảo

- [NestJS Docs](https://docs.nestjs.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Docker Docs](https://docs.docker.com/)

---

## ✅ Checklist Setup

- [ ] Cài đặt Node.js, Python, Docker
- [ ] Clone repository
- [ ] Tạo Firebase project
- [ ] Cấu hình Firebase credentials
- [ ] Setup PostgreSQL
- [ ] Tạo file .env cho từng service
- [ ] Khởi tạo Backend
- [ ] Khởi tạo Frontend Web
- [ ] Khởi tạo Mobile App
- [ ] Khởi tạo AI Service
- [ ] Test từng service
- [ ] Setup Docker
- [ ] Chạy docker-compose
- [ ] Kiểm tra tất cả services hoạt động

---

**Sẵn sàng bắt đầu? Hãy cho tôi biết bạn muốn khởi tạo theo Option nào!**
