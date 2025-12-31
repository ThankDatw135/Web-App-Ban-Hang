import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../shared/models/user_model.dart';

/// Auth State - Immutable auth state class
class AuthState {
  final bool isLoading;
  final bool isAuthenticated;
  final UserModel? user;
  final String? error;

  const AuthState({
    this.isLoading = false,
    this.isAuthenticated = false,
    this.user,
    this.error,
  });

  AuthState copyWith({
    bool? isLoading,
    bool? isAuthenticated,
    UserModel? user,
    String? error,
  }) {
    return AuthState(
      isLoading: isLoading ?? this.isLoading,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      user: user ?? this.user,
      error: error,
    );
  }

  /// Initial state
  factory AuthState.initial() => const AuthState();

  /// Loading state
  factory AuthState.loading() => const AuthState(isLoading: true);

  /// Authenticated state
  factory AuthState.authenticated(UserModel user) => AuthState(
        isAuthenticated: true,
        user: user,
      );

  /// Unauthenticated state
  factory AuthState.unauthenticated() => const AuthState();

  /// Error state
  factory AuthState.error(String message) => AuthState(error: message);
}

/// Auth State Notifier - Manages auth state
class AuthStateNotifier extends StateNotifier<AuthState> {
  final FirebaseAuth _firebaseAuth;

  AuthStateNotifier(this._firebaseAuth) : super(AuthState.initial()) {
    // Listen to auth state changes
    _firebaseAuth.authStateChanges().listen(_onAuthStateChanged);
  }

  void _onAuthStateChanged(User? firebaseUser) {
    if (firebaseUser != null) {
      final user = UserModel(
        id: firebaseUser.uid,
        email: firebaseUser.email ?? '',
        name: firebaseUser.displayName,
        avatarUrl: firebaseUser.photoURL,
      );
      state = AuthState.authenticated(user);
    } else {
      state = AuthState.unauthenticated();
    }
  }

  /// Sign in with email and password
  Future<void> signIn(String email, String password) async {
    state = AuthState.loading();
    try {
      await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      state = AuthState.error(_getErrorMessage(e.code));
    } catch (e) {
      state = AuthState.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }

  /// Register with email and password
  Future<void> register(String email, String password, String name) async {
    state = AuthState.loading();
    try {
      final credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      await credential.user?.updateDisplayName(name);
    } on FirebaseAuthException catch (e) {
      state = AuthState.error(_getErrorMessage(e.code));
    } catch (e) {
      state = AuthState.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }

  /// Sign out
  Future<void> signOut() async {
    await _firebaseAuth.signOut();
    state = AuthState.unauthenticated();
  }

  /// Reset password
  Future<void> resetPassword(String email) async {
    state = AuthState.loading();
    try {
      await _firebaseAuth.sendPasswordResetEmail(email: email);
      state = state.copyWith(isLoading: false);
    } on FirebaseAuthException catch (e) {
      state = AuthState.error(_getErrorMessage(e.code));
    } catch (e) {
      state = AuthState.error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }

  /// Clear error
  void clearError() {
    state = state.copyWith(error: null);
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
      default:
        return 'Đã xảy ra lỗi. Vui lòng thử lại.';
    }
  }
}

/// Providers
final firebaseAuthProvider = Provider<FirebaseAuth>((ref) {
  return FirebaseAuth.instance;
});

final authStateProvider =
    StateNotifierProvider<AuthStateNotifier, AuthState>((ref) {
  final firebaseAuth = ref.watch(firebaseAuthProvider);
  return AuthStateNotifier(firebaseAuth);
});

/// Convenience providers
final isAuthenticatedProvider = Provider<bool>((ref) {
  return ref.watch(authStateProvider).isAuthenticated;
});

final currentUserProvider = Provider<UserModel?>((ref) {
  return ref.watch(authStateProvider).user;
});
