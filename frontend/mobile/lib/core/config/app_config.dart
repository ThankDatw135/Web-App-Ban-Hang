import 'package:flutter_dotenv/flutter_dotenv.dart';

/// App Configuration
/// Quản lý các cấu hình từ environment variables
class AppConfig {
  AppConfig._();

  /// API Base URL
  static String get apiBaseUrl => 
      dotenv.env['API_BASE_URL'] ?? 'http://10.0.2.2:3000/api/v1';
  
  /// App Name
  static String get appName => 
      dotenv.env['APP_NAME'] ?? 'Luxury Fashion';
  
  /// App Version
  static String get appVersion => 
      dotenv.env['APP_VERSION'] ?? '1.0.0';
  
  /// Firebase Project ID
  static String get firebaseProjectId => 
      dotenv.env['FIREBASE_PROJECT_ID'] ?? 'luxury-fashion-platform';
  
  /// Google Web Client ID (for OAuth)
  static String get googleWebClientId => 
      dotenv.env['GOOGLE_WEB_CLIENT_ID'] ?? '';
  
  /// Is Production
  static bool get isProduction => 
      dotenv.env['ENVIRONMENT'] == 'production';
  
  /// Is Debug Mode
  static bool get isDebug => !isProduction;
}
