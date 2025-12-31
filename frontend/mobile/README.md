# Luxury Fashion Mobile App

Ứng dụng mobile Flutter cho nền tảng Luxury Fashion e-commerce.

## Công nghệ sử dụng

- **Framework**: Flutter
- **Ngôn ngữ**: Dart
- **Android Wrapper**: Kotlin (KHÔNG sử dụng Java)
- **Firebase**: FlutterFire (KHÔNG sử dụng Android Firebase SDK trực tiếp)

## Yêu cầu

- Flutter SDK >= 3.0.0
- Dart SDK >= 3.0.0
- Android Studio / VS Code với Flutter extension
- JDK 17

## Cài đặt

### 1. Cài đặt Flutter SDK

```bash
# Windows - sử dụng Chocolatey
choco install flutter

# Hoặc tải từ flutter.dev
# https://docs.flutter.dev/get-started/install/windows

# Kiểm tra cài đặt
flutter doctor -v
```

### 2. Cài đặt FlutterFire CLI (tùy chọn)

```bash
# Cài đặt FlutterFire CLI
dart pub global activate flutterfire_cli

# Cấu hình Firebase (nếu cần tạo lại firebase_options.dart)
flutterfire configure
```

### 3. Cài đặt dependencies

```bash
cd frontend/mobile
flutter pub get
```

### 4. Chạy ứng dụng

```bash
# Debug mode
flutter run

# Release mode
flutter run --release

# Build APK
flutter build apk

# Build App Bundle
flutter build appbundle
```

## Cấu trúc dự án

```
frontend/mobile/
├── android/                    # Android native (Kotlin)
│   ├── app/
│   │   ├── src/main/kotlin/    # Kotlin source code
│   │   ├── google-services.json # Firebase config
│   │   └── build.gradle
│   └── build.gradle
├── lib/                        # Dart source code
│   ├── core/
│   │   ├── config/            # App configuration
│   │   ├── network/           # HTTP client
│   │   ├── router/            # Navigation
│   │   └── theme/             # App theme
│   ├── features/              # Feature modules
│   │   ├── auth/              # Authentication
│   │   ├── cart/              # Shopping cart
│   │   ├── home/              # Home screen
│   │   ├── products/          # Product catalog
│   │   ├── profile/           # User profile
│   │   └── splash/            # Splash screen
│   ├── app.dart               # Root widget
│   ├── firebase_options.dart  # Firebase configuration
│   └── main.dart              # Entry point
├── assets/                    # Static assets
├── pubspec.yaml              # Flutter dependencies
└── .env                      # Environment variables
```

## Firebase Integration

Firebase được tích hợp thông qua **FlutterFire** packages:

- `firebase_core`: Core Firebase functionality
- `firebase_auth`: Authentication
- `firebase_storage`: Cloud Storage

**QUAN TRỌNG**:

- KHÔNG sử dụng Android Firebase SDK trực tiếp
- KHÔNG import Firebase packages trong Kotlin code
- Tất cả Firebase operations được thực hiện trong Dart code

### Khởi tạo Firebase

```dart
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}
```

## Android Configuration

| Setting           | Value  |
| ----------------- | ------ |
| compileSdkVersion | 34     |
| minSdkVersion     | 23     |
| targetSdkVersion  | 34     |
| Kotlin Version    | 1.9.22 |
| Gradle Plugin     | 8.1.0  |

## State Management

Ứng dụng sử dụng **Riverpod** cho state management:

```dart
final appRouterProvider = Provider<GoRouter>((ref) {
  // Router configuration
});
```

## Architecture

Ứng dụng theo kiến trúc **Feature-based** với Clean Architecture principles:

```
feature/
├── data/
│   └── repositories/
├── domain/
│   └── models/
└── presentation/
    ├── providers/
    ├── screens/
    └── widgets/
```

## License

Proprietary - All rights reserved
