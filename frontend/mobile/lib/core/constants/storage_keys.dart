/// Storage Keys - Local storage key constants
///
/// Tập trung quản lý tất cả storage keys để:
/// - Tránh conflicts
/// - Dễ debug
/// - Type-safe access
class StorageKeys {
  StorageKeys._();

  // Auth related
  static const String accessToken = 'access_token';
  static const String refreshToken = 'refresh_token';
  static const String tokenExpiry = 'token_expiry';

  // User related
  static const String userId = 'user_id';
  static const String userData = 'user_data';
  static const String userEmail = 'user_email';

  // App settings
  static const String themeMode = 'theme_mode';
  static const String language = 'language';
  static const String isFirstLaunch = 'is_first_launch';
  static const String lastSyncTime = 'last_sync_time';

  // Cart
  static const String cartItems = 'cart_items';
  static const String cartCount = 'cart_count';

  // Search history
  static const String searchHistory = 'search_history';
  static const String recentProducts = 'recent_products';

  // Notification
  static const String fcmToken = 'fcm_token';
  static const String notificationEnabled = 'notification_enabled';
}
