# Luxury Fashion Mobile - Android Only

React Native application for Android platform.

## Tech Stack
- React Native (TypeScript)
- Android Studio (Kotlin wrapper)
- Firebase Authentication
- REST API (NestJS backend)

## Project Structure

```
frontend/mobile/
├── App.tsx                     # Entry point với dark theme
├── package.json                # Dependencies (Android only)
├── tsconfig.json               # TypeScript config với path aliases
├── babel.config.js             # Babel config
├── metro.config.js             # Metro bundler config
├── index.js                    # RN entry
├── app.json                    # App config
│
├── src/
│   ├── screens/                # 5 màn hình chính
│   │   ├── HomeScreen.tsx
│   │   ├── CartScreen.tsx
│   │   ├── TryOnScreen.tsx
│   │   ├── NotificationScreen.tsx
│   │   └── AccountScreen.tsx
│   │
│   ├── components/             # UI Components
│   │   ├── LuxuryButton.tsx
│   │   └── ProductCard.tsx
│   │
│   ├── navigation/             # Navigation
│   │   └── RootNavigator.tsx   # Bottom Tab Navigator
│   │
│   ├── services/               # API Services
│   │   ├── api.ts              # Axios client
│   │   ├── auth.service.ts     # Firebase Auth
│   │   └── product.service.ts  # Product API
│   │
│   ├── theme/                  # Design System
│   │   ├── colors.ts           # Color palette
│   │   ├── typography.ts       # Fonts & text styles
│   │   └── spacing.ts          # Spacing & shadows
│   │
│   ├── store/                  # State management
│   ├── hooks/                  # Custom hooks
│   └── utils/                  # Utilities
│
└── android/                    # Android Native (Kotlin)
    ├── build.gradle
    ├── settings.gradle
    ├── gradle.properties
    └── app/
        ├── build.gradle
        └── src/main/
            ├── kotlin/                         # ✅ KOTLIN (không phải java)
            │   └── com/luxuryfashion/
            │       ├── MainActivity.kt
            │       └── MainApplication.kt
            ├── res/values/
            │   ├── strings.xml
            │   └── styles.xml
            └── AndroidManifest.xml
```

## Setup

### Prerequisites
- Node.js 18+
- Android Studio (latest)
- JDK 17
- Android SDK 34

### Installation

```bash
cd frontend/mobile
npm install
```

### Run on Android

```bash
# Start Metro bundler
npm start

# In another terminal, run Android app
npm run android
```

### Build Release APK

```bash
npm run android:release
```

APK file located at: `android/app/build/outputs/apk/release/`

## Design System

### Colors (Dark Mode Default)
| Color | Hex | Usage |
|-------|-----|-------|
| Charcoal | #0E0E0E | Primary dark |
| Ivory | #F7F5F2 | Primary light |
| Muted Gold | #C9B37E | Accent |
| Dark BG | #121212 | Background |
| Dark Surface | #1E1E1E | Cards/surfaces |

### Typography
- **Headings**: Playfair Display
- **Body**: Inter

## Navigation (Bottom Tabs)
1. **Home** - Trang chủ, featured products
2. **Cart** - Giỏ hàng
3. **Try Outfit** - AI Virtual Try-On
4. **Notifications** - Thông báo
5. **Account** - Tài khoản
