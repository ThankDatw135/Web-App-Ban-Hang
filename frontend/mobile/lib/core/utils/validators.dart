/// Validators - Input validation utilities
///
/// Reusable validation functions cho forms
library;

class Validators {
  Validators._();

  /// Email validation
  static String? email(String? value) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập email';
    }
    final emailRegex = RegExp(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9]+\.[a-zA-Z]+');
    if (!emailRegex.hasMatch(value)) {
      return 'Email không hợp lệ';
    }
    return null;
  }

  /// Password validation
  static String? password(String? value) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập mật khẩu';
    }
    if (value.length < 6) {
      return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return null;
  }

  /// Strong password validation
  static String? strongPassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập mật khẩu';
    }
    if (value.length < 8) {
      return 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    if (!RegExp(r'[A-Z]').hasMatch(value)) {
      return 'Mật khẩu phải có ít nhất 1 chữ hoa';
    }
    if (!RegExp(r'[a-z]').hasMatch(value)) {
      return 'Mật khẩu phải có ít nhất 1 chữ thường';
    }
    if (!RegExp(r'[0-9]').hasMatch(value)) {
      return 'Mật khẩu phải có ít nhất 1 số';
    }
    return null;
  }

  /// Confirm password validation
  static String? Function(String?) confirmPassword(String password) {
    return (String? value) {
      if (value == null || value.isEmpty) {
        return 'Vui lòng xác nhận mật khẩu';
      }
      if (value != password) {
        return 'Mật khẩu xác nhận không khớp';
      }
      return null;
    };
  }

  /// Required field validation
  static String? required(String? value, [String? fieldName]) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập ${fieldName ?? 'thông tin'}';
    }
    return null;
  }

  /// Phone number validation (Vietnam)
  static String? phone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập số điện thoại';
    }
    final phoneRegex = RegExp(r'^(0[3|5|7|8|9])+([0-9]{8})$');
    if (!phoneRegex.hasMatch(value)) {
      return 'Số điện thoại không hợp lệ';
    }
    return null;
  }

  /// Name validation
  static String? name(String? value) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập họ tên';
    }
    if (value.length < 2) {
      return 'Họ tên phải có ít nhất 2 ký tự';
    }
    if (value.length > 100) {
      return 'Họ tên không được quá 100 ký tự';
    }
    return null;
  }

  /// Number validation
  static String? number(String? value, [String? fieldName]) {
    if (value == null || value.isEmpty) {
      return 'Vui lòng nhập ${fieldName ?? 'số'}';
    }
    if (double.tryParse(value) == null) {
      return '${fieldName ?? 'Giá trị'} phải là số';
    }
    return null;
  }

  /// Min length validation
  static String? Function(String?) minLength(int length, [String? fieldName]) {
    return (String? value) {
      if (value != null && value.length < length) {
        return '${fieldName ?? 'Giá trị'} phải có ít nhất $length ký tự';
      }
      return null;
    };
  }

  /// Max length validation
  static String? Function(String?) maxLength(int length, [String? fieldName]) {
    return (String? value) {
      if (value != null && value.length > length) {
        return '${fieldName ?? 'Giá trị'} không được quá $length ký tự';
      }
      return null;
    };
  }

  /// Combine multiple validators
  static String? Function(String?) combine(
      List<String? Function(String?)> validators) {
    return (String? value) {
      for (final validator in validators) {
        final result = validator(value);
        if (result != null) {
          return result;
        }
      }
      return null;
    };
  }
}
