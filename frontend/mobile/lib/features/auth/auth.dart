/// Auth Feature Barrel File - Export all auth modules
///
/// Import this file to access all auth functionality
library;

// Data Layer
export 'data/repositories/auth_repository_impl.dart';

// Domain Layer
export 'domain/auth_repository.dart';
export 'domain/entities/user_entity.dart';
export 'domain/usecases/auth_usecases.dart';

// Presentation Layer
export 'presentation/screens/login_screen.dart';
export 'presentation/screens/register_screen.dart';
