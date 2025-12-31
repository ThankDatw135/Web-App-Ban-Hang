/// Core Barrel File - Export all core modules
///
/// Import this file to access all core functionality
library;

// Config
export 'config/app_config.dart';

// Constants
export 'constants/api_endpoints.dart';
export 'constants/app_constants.dart';
export 'constants/asset_paths.dart';
export 'constants/storage_keys.dart';

// Errors
export 'errors/exceptions.dart';
export 'errors/failures.dart';

// Extensions
export 'extensions/context_ext.dart';
export 'extensions/date_ext.dart';
export 'extensions/num_ext.dart';
export 'extensions/string_ext.dart';

// Network
export 'network/dio_client.dart';

// Router
export 'router/app_router.dart';

// Theme
export 'theme/app_colors.dart';
export 'theme/app_theme.dart';

// Utils
export 'utils/formatters.dart';
export 'utils/logger.dart';
export 'utils/validators.dart';
