# Mobile - Android Setup Guide

> Hướng dẫn setup Android Studio cho React Native project

---

## ✅ STEP 2 — Android Studio Integration

### 1. Mở Android Studio

```
File → Open → Chọn thư mục:
e:\Web-App-Ban-Hang\Web-App-Ban-Hang\frontend\mobile\android
```

### 2. Gradle Sync

Khi mở Android Studio, Gradle sẽ tự động sync. Đợi cho đến khi:

- ✅ "Gradle sync finished" xuất hiện
- ✅ Không có lỗi đỏ trong Build output

### 3. Verify Structure

Kiểm tra thư mục trong Android Studio:

```
android/
├── app/
│   ├── src/main/
│   │   ├── kotlin/                    ✅ KOTLIN (không phải java)
│   │   │   └── com/luxuryfashion/
│   │   │       ├── MainActivity.kt    ✅
│   │   │       └── MainApplication.kt ✅
│   │   ├── res/values/
│   │   └── AndroidManifest.xml
│   ├── build.gradle
│   └── proguard-rules.pro
├── gradle/wrapper/
│   └── gradle-wrapper.properties
├── build.gradle
├── settings.gradle
└── gradle.properties
```

### 4. Kiểm tra không có Java files

- ❌ Không được có thư mục `java/`
- ✅ Chỉ có thư mục `kotlin/`

### 5. Firebase Configuration

Để hoàn thành Firebase setup:

1. Download `google-services.json` từ Firebase Console
2. Đặt vào: `android/app/google-services.json`

---

## 🚀 Build & Run

### Development

```bash
# Start Metro
cd frontend/mobile
npm start

# Run on Android (new terminal)
npm run android
```

### Release APK

```bash
npm run android:release
```

APK output: `android/app/build/outputs/apk/release/`
