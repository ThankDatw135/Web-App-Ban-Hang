/// String Extensions
///
/// Extension methods cho String để xử lý text
library;

extension StringExtension on String {
  // Capitalize first letter
  String get capitalize {
    if (isEmpty) return this;
    return '${this[0].toUpperCase()}${substring(1)}';
  }

  // Capitalize each word
  String get capitalizeWords {
    if (isEmpty) return this;
    return split(' ').map((word) => word.capitalize).join(' ');
  }

  // Check if email is valid
  bool get isValidEmail {
    final emailRegex = RegExp(
      r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+',
    );
    return emailRegex.hasMatch(this);
  }

  // Check if phone is valid (Vietnam)
  bool get isValidPhone {
    final phoneRegex = RegExp(r'^(0[3|5|7|8|9])+([0-9]{8})$');
    return phoneRegex.hasMatch(this);
  }

  // Check if password is strong
  bool get isStrongPassword {
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
    final passwordRegex = RegExp(
      r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$',
    );
    return passwordRegex.hasMatch(this);
  }

  // Mask email
  String get maskedEmail {
    if (!contains('@')) return this;
    final parts = split('@');
    final name = parts[0];
    final domain = parts[1];
    if (name.length <= 2) return this;
    return '${name.substring(0, 2)}***@$domain';
  }

  // Mask phone
  String get maskedPhone {
    if (length < 10) return this;
    return '${substring(0, 3)}****${substring(length - 3)}';
  }

  // Remove all whitespace
  String get removeWhitespace => replaceAll(RegExp(r'\s+'), '');

  // Truncate with ellipsis
  String truncate(int maxLength) {
    if (length <= maxLength) return this;
    return '${substring(0, maxLength)}...';
  }

  // Parse to int safely
  int? get toIntOrNull => int.tryParse(this);

  // Parse to double safely
  double? get toDoubleOrNull => double.tryParse(this);

  // Check if numeric
  bool get isNumeric => double.tryParse(this) != null;

  // Convert to slug
  String get toSlug {
    return toLowerCase()
        .replaceAll(RegExp(r'[àáạảãâầấậẩẫăằắặẳẵ]'), 'a')
        .replaceAll(RegExp(r'[èéẹẻẽêềếệểễ]'), 'e')
        .replaceAll(RegExp(r'[ìíịỉĩ]'), 'i')
        .replaceAll(RegExp(r'[òóọỏõôồốộổỗơờớợởỡ]'), 'o')
        .replaceAll(RegExp(r'[ùúụủũưừứựửữ]'), 'u')
        .replaceAll(RegExp(r'[ỳýỵỷỹ]'), 'y')
        .replaceAll(RegExp(r'[đ]'), 'd')
        .replaceAll(RegExp(r'[^a-z0-9\s-]'), '')
        .replaceAll(RegExp(r'[\s_]+'), '-')
        .replaceAll(RegExp(r'-+'), '-')
        .replaceAll(RegExp(r'^-|-$'), '');
  }
}

extension NullableStringExtension on String? {
  bool get isNullOrEmpty => this == null || this!.isEmpty;
  bool get isNotNullOrEmpty => !isNullOrEmpty;
  String get orEmpty => this ?? '';
}
