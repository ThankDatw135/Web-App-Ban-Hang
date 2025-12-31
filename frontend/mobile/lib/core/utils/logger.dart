import 'package:flutter/foundation.dart';

/// Logger - Simple logging utility
///
/// Wrapper cho debug logging với formatted output

class AppLogger {
  AppLogger._();

  static const String _tag = 'LuxuryFashion';

  /// Log info message
  static void info(String message, [String? tag]) {
    if (kDebugMode) {
      debugPrint('[$_tag${tag != null ? ':$tag' : ''}] ℹ️ $message');
    }
  }

  /// Log warning message
  static void warning(String message, [String? tag]) {
    if (kDebugMode) {
      debugPrint('[$_tag${tag != null ? ':$tag' : ''}] ⚠️ $message');
    }
  }

  /// Log error message
  static void error(String message, [dynamic error, StackTrace? stackTrace]) {
    if (kDebugMode) {
      debugPrint('[$_tag] ❌ $message');
      if (error != null) {
        debugPrint('Error: $error');
      }
      if (stackTrace != null) {
        debugPrint('StackTrace: $stackTrace');
      }
    }
  }

  /// Log success message
  static void success(String message, [String? tag]) {
    if (kDebugMode) {
      debugPrint('[$_tag${tag != null ? ':$tag' : ''}] ✅ $message');
    }
  }

  /// Log API request
  static void request(String method, String path,
      [Map<String, dynamic>? params]) {
    if (kDebugMode) {
      debugPrint('[$_tag:API] ➡️ $method $path');
      if (params != null && params.isNotEmpty) {
        debugPrint('Params: $params');
      }
    }
  }

  /// Log API response
  static void response(int statusCode, String path, [dynamic data]) {
    if (kDebugMode) {
      final emoji = statusCode >= 200 && statusCode < 300 ? '✅' : '❌';
      debugPrint('[$_tag:API] $emoji [$statusCode] $path');
    }
  }

  /// Log navigation
  static void navigation(String route) {
    if (kDebugMode) {
      debugPrint('[$_tag:Nav] 🔀 $route');
    }
  }
}
