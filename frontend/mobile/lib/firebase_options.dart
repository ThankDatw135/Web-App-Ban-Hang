// File được tạo dựa trên google-services.json
// QUAN TRỌNG: Trong production, nên sử dụng FlutterFire CLI để tạo file này:
// dart pub global activate flutterfire_cli
// flutterfire configure
//
// File này định nghĩa cấu hình Firebase cho FlutterFire
// KHÔNG sử dụng Android Firebase SDK trực tiếp

import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Cấu hình này được lấy từ google-services.json
/// Project: luxury-fashion-platform
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError(
        'DefaultFirebaseOptions have not been configured for web - '
        'you can reconfigure this by running the FlutterFire CLI again.',
      );
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for iOS - '
          'iOS support is not enabled for this project.',
        );
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macOS.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for Windows.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for Linux.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  /// Firebase options cho Android
  /// Thông tin lấy từ google-services.json
  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAr96vUDJsVRJL0NbUxBKZHXNY-RWOUGoU',
    appId: '1:27502583132:android:2711e9f1a4f95453757599',
    messagingSenderId: '27502583132',
    projectId: 'luxury-fashion-platform',
    storageBucket: 'luxury-fashion-platform.firebasestorage.app',
  );
}
