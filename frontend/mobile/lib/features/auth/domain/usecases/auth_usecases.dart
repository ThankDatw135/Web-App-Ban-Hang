import '../auth_repository.dart';
import '../entities/user_entity.dart';
import '../../../../core/errors/failures.dart';

/// Login Use Case - Business logic for login
class LoginUseCase {
  final AuthRepository _repository;

  LoginUseCase(this._repository);

  /// Execute login
  Future<({UserEntity? user, Failure? failure})> call({
    required String email,
    required String password,
  }) async {
    // Validate inputs
    if (email.isEmpty) {
      return (
        user: null,
        failure: const ValidationFailure(message: 'Email không được để trống')
      );
    }
    if (password.isEmpty) {
      return (
        user: null,
        failure:
            const ValidationFailure(message: 'Mật khẩu không được để trống')
      );
    }
    if (!_isValidEmail(email)) {
      return (
        user: null,
        failure: const ValidationFailure(message: 'Email không hợp lệ')
      );
    }

    // Call repository
    return _repository.signIn(email: email, password: password);
  }

  bool _isValidEmail(String email) {
    final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    return emailRegex.hasMatch(email);
  }
}

/// Register Use Case - Business logic for registration
class RegisterUseCase {
  final AuthRepository _repository;

  RegisterUseCase(this._repository);

  /// Execute registration
  Future<({UserEntity? user, Failure? failure})> call({
    required String email,
    required String password,
    required String confirmPassword,
    required String name,
  }) async {
    // Validate inputs
    if (name.isEmpty) {
      return (
        user: null,
        failure: const ValidationFailure(message: 'Họ tên không được để trống')
      );
    }
    if (name.length < 2) {
      return (
        user: null,
        failure:
            const ValidationFailure(message: 'Họ tên phải có ít nhất 2 ký tự')
      );
    }
    if (email.isEmpty) {
      return (
        user: null,
        failure: const ValidationFailure(message: 'Email không được để trống')
      );
    }
    if (!_isValidEmail(email)) {
      return (
        user: null,
        failure: const ValidationFailure(message: 'Email không hợp lệ')
      );
    }
    if (password.isEmpty) {
      return (
        user: null,
        failure:
            const ValidationFailure(message: 'Mật khẩu không được để trống')
      );
    }
    if (password.length < 6) {
      return (
        user: null,
        failure:
            const ValidationFailure(message: 'Mật khẩu phải có ít nhất 6 ký tự')
      );
    }
    if (password != confirmPassword) {
      return (
        user: null,
        failure:
            const ValidationFailure(message: 'Mật khẩu xác nhận không khớp')
      );
    }

    // Call repository
    return _repository.register(email: email, password: password, name: name);
  }

  bool _isValidEmail(String email) {
    final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    return emailRegex.hasMatch(email);
  }
}

/// Logout Use Case
class LogoutUseCase {
  final AuthRepository _repository;

  LogoutUseCase(this._repository);

  Future<({bool success, Failure? failure})> call() {
    return _repository.signOut();
  }
}

/// Reset Password Use Case
class ResetPasswordUseCase {
  final AuthRepository _repository;

  ResetPasswordUseCase(this._repository);

  Future<({bool success, Failure? failure})> call(String email) async {
    if (email.isEmpty) {
      return (
        success: false,
        failure: const ValidationFailure(message: 'Email không được để trống')
      );
    }
    if (!_isValidEmail(email)) {
      return (
        success: false,
        failure: const ValidationFailure(message: 'Email không hợp lệ')
      );
    }

    return _repository.sendPasswordResetEmail(email);
  }

  bool _isValidEmail(String email) {
    final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    return emailRegex.hasMatch(email);
  }
}
