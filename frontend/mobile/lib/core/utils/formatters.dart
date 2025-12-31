import 'package:intl/intl.dart';

/// Formatters - Text and number formatting utilities
///
/// Reusable formatting functions

class Formatters {
  Formatters._();

  // Currency formatters
  static final _currencyFormat = NumberFormat.currency(
    locale: 'vi_VN',
    symbol: '₫',
    decimalDigits: 0,
  );

  static final _compactFormat = NumberFormat.compact(locale: 'vi_VN');

  /// Format as Vietnamese currency
  static String currency(num value) {
    return _currencyFormat.format(value);
  }

  /// Format as compact number (1K, 1M, etc.)
  static String compact(num value) {
    return _compactFormat.format(value);
  }

  /// Format phone number with dashes
  static String phone(String phone) {
    if (phone.length != 10) return phone;
    return '${phone.substring(0, 4)}-${phone.substring(4, 7)}-${phone.substring(7)}';
  }

  /// Format date
  static String date(DateTime date, [String pattern = 'dd/MM/yyyy']) {
    return DateFormat(pattern).format(date);
  }

  /// Format datetime
  static String dateTime(DateTime date, [String pattern = 'dd/MM/yyyy HH:mm']) {
    return DateFormat(pattern).format(date);
  }

  /// Format relative time (e.g., "2 hours ago")
  static String timeAgo(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays > 365) {
      return '${(difference.inDays / 365).floor()} năm trước';
    } else if (difference.inDays > 30) {
      return '${(difference.inDays / 30).floor()} tháng trước';
    } else if (difference.inDays > 7) {
      return '${(difference.inDays / 7).floor()} tuần trước';
    } else if (difference.inDays > 0) {
      return '${difference.inDays} ngày trước';
    } else if (difference.inHours > 0) {
      return '${difference.inHours} giờ trước';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes} phút trước';
    } else {
      return 'Vừa xong';
    }
  }

  /// Format file size
  static String fileSize(int bytes) {
    if (bytes >= 1073741824) {
      return '${(bytes / 1073741824).toStringAsFixed(2)} GB';
    } else if (bytes >= 1048576) {
      return '${(bytes / 1048576).toStringAsFixed(2)} MB';
    } else if (bytes >= 1024) {
      return '${(bytes / 1024).toStringAsFixed(2)} KB';
    }
    return '$bytes bytes';
  }

  /// Format card number (hide middle digits)
  static String cardNumber(String number) {
    if (number.length < 8) return number;
    return '${number.substring(0, 4)} **** **** ${number.substring(number.length - 4)}';
  }

  /// Truncate text with ellipsis
  static String truncate(String text, int maxLength) {
    if (text.length <= maxLength) return text;
    return '${text.substring(0, maxLength)}...';
  }

  /// Format order ID
  static String orderId(String id) {
    return '#${id.toUpperCase()}';
  }

  /// Format percentage
  static String percentage(double value) {
    return '${value.toStringAsFixed(1)}%';
  }

  /// Format discount
  static String discount(double percentage) {
    return '-${percentage.toStringAsFixed(0)}%';
  }
}
