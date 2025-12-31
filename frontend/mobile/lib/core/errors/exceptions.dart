/// App Exceptions - Custom exception classes for error handling
///
/// Sử dụng exceptions để xử lý lỗi trong data layer
library;

/// Base exception class
abstract class AppException implements Exception {
  final String message;
  final String? code;
  final dynamic originalError;

  const AppException({
    required this.message,
    this.code,
    this.originalError,
  });

  @override
  String toString() => 'AppException: $message (code: $code)';
}

/// Server/API exceptions
class ServerException extends AppException {
  final int? statusCode;

  const ServerException({
    required super.message,
    super.code,
    super.originalError,
    this.statusCode,
  });

  factory ServerException.fromStatusCode(int statusCode, [String? message]) {
    switch (statusCode) {
      case 400:
        return ServerException(
          message: message ?? 'Bad Request',
          code: 'BAD_REQUEST',
          statusCode: statusCode,
        );
      case 401:
        return ServerException(
          message: message ?? 'Unauthorized',
          code: 'UNAUTHORIZED',
          statusCode: statusCode,
        );
      case 403:
        return ServerException(
          message: message ?? 'Forbidden',
          code: 'FORBIDDEN',
          statusCode: statusCode,
        );
      case 404:
        return ServerException(
          message: message ?? 'Not Found',
          code: 'NOT_FOUND',
          statusCode: statusCode,
        );
      case 500:
        return ServerException(
          message: message ?? 'Internal Server Error',
          code: 'SERVER_ERROR',
          statusCode: statusCode,
        );
      default:
        return ServerException(
          message: message ?? 'Unknown Error',
          code: 'UNKNOWN',
          statusCode: statusCode,
        );
    }
  }
}

/// Network exceptions
class NetworkException extends AppException {
  const NetworkException({
    super.message = 'Không có kết nối mạng',
    super.code = 'NETWORK_ERROR',
    super.originalError,
  });
}

/// Cache exceptions
class CacheException extends AppException {
  const CacheException({
    super.message = 'Lỗi cache',
    super.code = 'CACHE_ERROR',
    super.originalError,
  });
}

/// Validation exceptions
class ValidationException extends AppException {
  final Map<String, String>? fieldErrors;

  const ValidationException({
    super.message = 'Dữ liệu không hợp lệ',
    super.code = 'VALIDATION_ERROR',
    super.originalError,
    this.fieldErrors,
  });
}

/// Authentication exceptions
class AuthException extends AppException {
  const AuthException({
    super.message = 'Lỗi xác thực',
    super.code = 'AUTH_ERROR',
    super.originalError,
  });

  factory AuthException.sessionExpired() => const AuthException(
        message: 'Phiên đăng nhập đã hết hạn',
        code: 'SESSION_EXPIRED',
      );

  factory AuthException.invalidCredentials() => const AuthException(
        message: 'Email hoặc mật khẩu không đúng',
        code: 'INVALID_CREDENTIALS',
      );
}
