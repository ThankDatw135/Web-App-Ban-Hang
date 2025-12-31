/// Asset Paths - Centralized asset path constants
///
/// Quản lý đường dẫn tới assets để:
/// - Tránh typo
/// - Dễ refactor khi đổi cấu trúc assets
class AssetPaths {
  AssetPaths._();

  // Base paths
  static const String _images = 'assets/images';
  static const String _icons = 'assets/icons';

  // Logo
  static const String logo = '$_images/logo.png';
  static const String logoLight = '$_images/logo_light.png';
  static const String logoDark = '$_images/logo_dark.png';

  // Placeholders
  static const String placeholder = '$_images/placeholder.png';
  static const String avatarPlaceholder = '$_images/avatar_placeholder.png';
  static const String productPlaceholder = '$_images/product_placeholder.png';

  // Icons
  static const String iconHome = '$_icons/home.svg';
  static const String iconCart = '$_icons/cart.svg';
  static const String iconProfile = '$_icons/profile.svg';
  static const String iconSearch = '$_icons/search.svg';
  static const String iconFavorite = '$_icons/favorite.svg';
  static const String iconNotification = '$_icons/notification.svg';

  // Illustrations
  static const String emptyCart = '$_images/empty_cart.png';
  static const String emptyOrders = '$_images/empty_orders.png';
  static const String noResults = '$_images/no_results.png';
  static const String error = '$_images/error.png';
}
