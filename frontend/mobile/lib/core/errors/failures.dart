/// App Failures - Failure classes for domain layer
///
/// Failures được sử dụng trong domain layer để represent errors
/// mà không expose implementation details
library;

/// Base failure class
abstract class Failure {
  final String message;
  final String? code;

  const Failure({
    required this.message,
    this.code,
  });

  @override
  String toString() => message;

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is Failure &&
          runtimeType == other.runtimeType &&
          message == other.message &&
          code == other.code;

  @override
  int get hashCode => message.hashCode ^ code.hashCode;
}

/// Server failure
class ServerFailure extends Failure {
  final int? statusCode;

  const ServerFailure({
    required super.message,
    super.code,
    this.statusCode,
  });
}

/// Network failure
class NetworkFailure extends Failure {
  const NetworkFailure({
    super.message = 'Không có kết nối mạng. Vui lòng kiểm tra lại.',
    super.code = 'NETWORK_FAILURE',
  });
}

/// Cache failure
class CacheFailure extends Failure {
  const CacheFailure({
    super.message = 'Không thể đọc dữ liệu cache',
    super.code = 'CACHE_FAILURE',
  });
}

/// Validation failure
class ValidationFailure extends Failure {
  final Map<String, String>? fieldErrors;

  const ValidationFailure({
    super.message = 'Dữ liệu không hợp lệ',
    super.code = 'VALIDATION_FAILURE',
    this.fieldErrors,
  });
}

/// Authentication failure
class AuthFailure extends Failure {
  const AuthFailure({
    required super.message,
    super.code = 'AUTH_FAILURE',
  });

  factory AuthFailure.sessionExpired() => const AuthFailure(
        message: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
        code: 'SESSION_EXPIRED',
      );

  factory AuthFailure.invalidCredentials() => const AuthFailure(
        message: 'Email hoặc mật khẩu không đúng',
        code: 'INVALID_CREDENTIALS',
      );
}

/// Unknown failure
class UnknownFailure extends Failure {
  const UnknownFailure({
    super.message = 'Đã xảy ra lỗi không xác định',
    super.code = 'UNKNOWN_FAILURE',
  });
}
