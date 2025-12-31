import '../../../core/errors/failures.dart';
import 'entities/user_entity.dart';

/// Auth Repository Interface - Domain layer contract
///
/// Định nghĩa interface cho auth repository.
/// Implementation sẽ nằm trong data layer.
abstract class AuthRepository {
  /// Sign in with email and password
  /// Returns [UserEntity] on success or [Failure] on error
  Future<({UserEntity? user, Failure? failure})> signIn({
    required String email,
    required String password,
  });

  /// Register with email and password
  Future<({UserEntity? user, Failure? failure})> register({
    required String email,
    required String password,
    required String name,
  });

  /// Sign out
  Future<({bool success, Failure? failure})> signOut();

  /// Get current user
  Future<UserEntity?> getCurrentUser();

  /// Send password reset email
  Future<({bool success, Failure? failure})> sendPasswordResetEmail(
      String email);

  /// Update user profile
  Future<({UserEntity? user, Failure? failure})> updateProfile({
    String? name,
    String? phone,
    String? avatarUrl,
    String? address,
  });

  /// Change password
  Future<({bool success, Failure? failure})> changePassword({
    required String currentPassword,
    required String newPassword,
  });

  /// Check if user is authenticated
  bool get isAuthenticated;

  /// Stream of auth state changes
  Stream<UserEntity?> get authStateChanges;
}
