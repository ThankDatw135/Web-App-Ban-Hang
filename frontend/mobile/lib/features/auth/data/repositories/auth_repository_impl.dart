import 'package:firebase_auth/firebase_auth.dart';

import '../../../../core/errors/failures.dart';
import '../../domain/auth_repository.dart';
import '../../domain/entities/user_entity.dart';

/// Auth Repository Implementation - Data layer
///
/// Implementation của AuthRepository interface sử dụng Firebase Auth
class AuthRepositoryImpl implements AuthRepository {
  final FirebaseAuth _firebaseAuth;

  AuthRepositoryImpl(this._firebaseAuth);

  @override
  bool get isAuthenticated => _firebaseAuth.currentUser != null;

  @override
  Stream<UserEntity?> get authStateChanges {
    return _firebaseAuth.authStateChanges().map((user) {
      if (user == null) return null;
      return UserEntity(
        id: user.uid,
        email: user.email ?? '',
        name: user.displayName,
        avatarUrl: user.photoURL,
      );
    });
  }

  @override
  Future<UserEntity?> getCurrentUser() async {
    final user = _firebaseAuth.currentUser;
    if (user == null) return null;
    return UserEntity(
      id: user.uid,
      email: user.email ?? '',
      name: user.displayName,
      avatarUrl: user.photoURL,
    );
  }

  @override
  Future<({UserEntity? user, Failure? failure})> signIn({
    required String email,
    required String password,
  }) async {
    try {
      final credential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      final user = credential.user;
      if (user == null) {
        return (
          user: null,
          failure: const AuthFailure(message: 'Đăng nhập thất bại')
        );
      }

      return (
        user: UserEntity(
          id: user.uid,
          email: user.email ?? '',
          name: user.displayName,
          avatarUrl: user.photoURL,
        ),
        failure: null,
      );
    } on FirebaseAuthException catch (e) {
      return (
        user: null,
        failure: AuthFailure(message: _getErrorMessage(e.code))
      );
    } catch (e) {
      return (user: null, failure: const UnknownFailure());
    }
  }

  @override
  Future<({UserEntity? user, Failure? failure})> register({
    required String email,
    required String password,
    required String name,
  }) async {
    try {
      final credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      await credential.user?.updateDisplayName(name);

      final user = credential.user;
      if (user == null) {
        return (
          user: null,
          failure: const AuthFailure(message: 'Đăng ký thất bại')
        );
      }

      return (
        user: UserEntity(
          id: user.uid,
          email: user.email ?? '',
          name: name,
          avatarUrl: user.photoURL,
        ),
        failure: null,
      );
    } on FirebaseAuthException catch (e) {
      return (
        user: null,
        failure: AuthFailure(message: _getErrorMessage(e.code))
      );
    } catch (e) {
      return (user: null, failure: const UnknownFailure());
    }
  }

  @override
  Future<({bool success, Failure? failure})> signOut() async {
    try {
      await _firebaseAuth.signOut();
      return (success: true, failure: null);
    } catch (e) {
      return (success: false, failure: const UnknownFailure());
    }
  }

  @override
  Future<({bool success, Failure? failure})> sendPasswordResetEmail(
      String email) async {
    try {
      await _firebaseAuth.sendPasswordResetEmail(email: email);
      return (success: true, failure: null);
    } on FirebaseAuthException catch (e) {
      return (
        success: false,
        failure: AuthFailure(message: _getErrorMessage(e.code))
      );
    } catch (e) {
      return (success: false, failure: const UnknownFailure());
    }
  }

  @override
  Future<({UserEntity? user, Failure? failure})> updateProfile({
    String? name,
    String? phone,
    String? avatarUrl,
    String? address,
  }) async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user == null) {
        return (
          user: null,
          failure: const AuthFailure(message: 'Chưa đăng nhập')
        );
      }

      if (name != null) {
        await user.updateDisplayName(name);
      }
      if (avatarUrl != null) {
        await user.updatePhotoURL(avatarUrl);
      }

      // Reload user to get updated info
      await user.reload();
      final updatedUser = _firebaseAuth.currentUser;

      return (
        user: UserEntity(
          id: updatedUser!.uid,
          email: updatedUser.email ?? '',
          name: updatedUser.displayName,
          avatarUrl: updatedUser.photoURL,
        ),
        failure: null,
      );
    } on FirebaseAuthException catch (e) {
      return (
        user: null,
        failure: AuthFailure(message: _getErrorMessage(e.code))
      );
    } catch (e) {
      return (user: null, failure: const UnknownFailure());
    }
  }

  @override
  Future<({bool success, Failure? failure})> changePassword({
    required String currentPassword,
    required String newPassword,
  }) async {
    try {
      final user = _firebaseAuth.currentUser;
      if (user == null || user.email == null) {
        return (
          success: false,
          failure: const AuthFailure(message: 'Chưa đăng nhập')
        );
      }

      // Re-authenticate user
      final credential = EmailAuthProvider.credential(
        email: user.email!,
        password: currentPassword,
      );
      await user.reauthenticateWithCredential(credential);

      // Update password
      await user.updatePassword(newPassword);

      return (success: true, failure: null);
    } on FirebaseAuthException catch (e) {
      return (
        success: false,
        failure: AuthFailure(message: _getErrorMessage(e.code))
      );
    } catch (e) {
      return (success: false, failure: const UnknownFailure());
    }
  }

  String _getErrorMessage(String code) {
    switch (code) {
      case 'user-not-found':
        return 'Không tìm thấy tài khoản với email này';
      case 'wrong-password':
        return 'Mật khẩu không chính xác';
      case 'invalid-email':
        return 'Email không hợp lệ';
      case 'user-disabled':
        return 'Tài khoản đã bị vô hiệu hóa';
      case 'email-already-in-use':
        return 'Email đã được sử dụng';
      case 'weak-password':
        return 'Mật khẩu quá yếu';
      case 'requires-recent-login':
        return 'Vui lòng đăng nhập lại để thực hiện thao tác này';
      default:
        return 'Đã xảy ra lỗi. Vui lòng thử lại.';
    }
  }
}
