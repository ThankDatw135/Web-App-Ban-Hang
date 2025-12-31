import '../../../../shared/models/user_model.dart';

/// User Entity - Domain layer entity
///
/// Business object representing a user in the domain layer.
/// This is separate from UserModel (data layer) to maintain clean architecture.
class UserEntity {
  final String id;
  final String email;
  final String? name;
  final String? phone;
  final String? avatarUrl;
  final String? address;

  const UserEntity({
    required this.id,
    required this.email,
    this.name,
    this.phone,
    this.avatarUrl,
    this.address,
  });

  /// Create from UserModel
  factory UserEntity.fromModel(UserModel model) {
    return UserEntity(
      id: model.id,
      email: model.email,
      name: model.name,
      phone: model.phone,
      avatarUrl: model.avatarUrl,
      address: model.address,
    );
  }

  /// Convert to UserModel
  UserModel toModel() {
    return UserModel(
      id: id,
      email: email,
      name: name,
      phone: phone,
      avatarUrl: avatarUrl,
      address: address,
    );
  }

  /// Display name (falls back to email)
  String get displayName => name ?? email.split('@').first;

  /// Check if has avatar
  bool get hasAvatar => avatarUrl != null && avatarUrl!.isNotEmpty;

  /// Copy with
  UserEntity copyWith({
    String? id,
    String? email,
    String? name,
    String? phone,
    String? avatarUrl,
    String? address,
  }) {
    return UserEntity(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      phone: phone ?? this.phone,
      avatarUrl: avatarUrl ?? this.avatarUrl,
      address: address ?? this.address,
    );
  }

  @override
  bool operator ==(Object other) =>
      identical(this, other) ||
      other is UserEntity && runtimeType == other.runtimeType && id == other.id;

  @override
  int get hashCode => id.hashCode;
}
