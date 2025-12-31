/// App Constants - General app-wide constants
class AppConstants {
  AppConstants._();

  // Pagination
  static const int defaultPageSize = 20;
  static const int maxPageSize = 100;

  // Timeouts (in seconds)
  static const int connectionTimeout = 30;
  static const int receiveTimeout = 30;
  static const int sendTimeout = 30;

  // Cache durations (in minutes)
  static const int cacheProductsDuration = 30;
  static const int cacheUserDuration = 60;
  static const int cacheCartDuration = 5;

  // Validation
  static const int minPasswordLength = 6;
  static const int maxPasswordLength = 50;
  static const int minNameLength = 2;
  static const int maxNameLength = 100;
  static const int phoneLength = 10;

  // UI
  static const double defaultPadding = 16.0;
  static const double defaultRadius = 12.0;
  static const double defaultElevation = 2.0;
  static const int animationDuration = 300; // milliseconds

  // Search
  static const int searchDebounceMs = 500;
  static const int maxSearchHistory = 10;
  static const int maxRecentProducts = 20;
}
