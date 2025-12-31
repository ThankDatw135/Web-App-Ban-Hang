/// API Endpoints - Centralized API path constants
///
/// Tập trung quản lý tất cả các API endpoints để:
/// - Dễ maintain và update
/// - Tránh typo trong URLs
/// - Tái sử dụng across app
class ApiEndpoints {
  ApiEndpoints._();

  // Base paths
  static const String _v1 = '/api/v1';

  // Auth endpoints
  static const String auth = '$_v1/auth';
  static const String login = '$auth/login';
  static const String register = '$auth/register';
  static const String logout = '$auth/logout';
  static const String refreshToken = '$auth/refresh';
  static const String forgotPassword = '$auth/forgot-password';
  static const String resetPassword = '$auth/reset-password';

  // User endpoints
  static const String users = '$_v1/users';
  static const String profile = '$users/profile';
  static const String updateProfile = '$users/profile';
  static const String changePassword = '$users/change-password';

  // Product endpoints
  static const String products = '$_v1/products';
  static String productDetail(String id) => '$products/$id';
  static const String categories = '$_v1/categories';
  static const String searchProducts = '$products/search';

  // Cart endpoints
  static const String cart = '$_v1/cart';
  static const String addToCart = '$cart/add';
  static const String updateCart = '$cart/update';
  static const String removeFromCart = '$cart/remove';
  static const String clearCart = '$cart/clear';

  // Order endpoints
  static const String orders = '$_v1/orders';
  static String orderDetail(String id) => '$orders/$id';
  static const String orderHistory = '$orders/history';

  // Favorites endpoints
  static const String favorites = '$_v1/favorites';
  static String toggleFavorite(String productId) => '$favorites/$productId';
}
