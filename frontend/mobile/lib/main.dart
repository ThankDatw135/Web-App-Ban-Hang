import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'firebase_options.dart';
import 'app.dart';

/// Entry point của ứng dụng Luxury Fashion Mobile
/// 
/// Khởi tạo các services cần thiết trước khi chạy app:
/// - Flutter bindings
/// - Environment variables (.env)
/// - Firebase (sử dụng FlutterFire, KHÔNG PHẢI Android Firebase SDK)
void main() async {
  // Đảm bảo Flutter bindings đã được khởi tạo
  WidgetsFlutterBinding.ensureInitialized();
  
  // Load environment variables
  await dotenv.load(fileName: '.env');
  
  // Khởi tạo Firebase sử dụng FlutterFire
  // Cấu hình được lấy từ firebase_options.dart (tạo bởi FlutterFire CLI)
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  
  // Chạy app với Riverpod provider scope
  runApp(
    const ProviderScope(
      child: LuxuryFashionApp(),
    ),
  );
}
