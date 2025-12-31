import 'package:intl/intl.dart';

/// DateTime Extensions
///
/// Extension methods cho DateTime để format và xử lý ngày tháng

extension DateTimeExtension on DateTime {
  // Format shortcuts
  String get toDateString => DateFormat('dd/MM/yyyy').format(this);
  String get toTimeString => DateFormat('HH:mm').format(this);
  String get toDateTimeString => DateFormat('dd/MM/yyyy HH:mm').format(this);
  String get toIso8601 => toIso8601String();

  // Vietnamese format
  String get toVietnameseDate =>
      DateFormat('dd tháng MM, yyyy', 'vi').format(this);
  String get toVietnameseDateTime =>
      DateFormat('dd tháng MM, yyyy lúc HH:mm', 'vi').format(this);

  // Relative time
  String get timeAgo {
    final now = DateTime.now();
    final difference = now.difference(this);

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

  // Check helpers
  bool get isToday {
    final now = DateTime.now();
    return year == now.year && month == now.month && day == now.day;
  }

  bool get isYesterday {
    final yesterday = DateTime.now().subtract(const Duration(days: 1));
    return year == yesterday.year &&
        month == yesterday.month &&
        day == yesterday.day;
  }

  bool get isTomorrow {
    final tomorrow = DateTime.now().add(const Duration(days: 1));
    return year == tomorrow.year &&
        month == tomorrow.month &&
        day == tomorrow.day;
  }

  bool get isThisWeek {
    final now = DateTime.now();
    final startOfWeek = now.subtract(Duration(days: now.weekday - 1));
    final endOfWeek = startOfWeek.add(const Duration(days: 6));
    return isAfter(startOfWeek.subtract(const Duration(days: 1))) &&
        isBefore(endOfWeek.add(const Duration(days: 1)));
  }

  bool get isThisMonth {
    final now = DateTime.now();
    return year == now.year && month == now.month;
  }

  bool get isThisYear {
    return year == DateTime.now().year;
  }

  // Date manipulation
  DateTime get startOfDay => DateTime(year, month, day);
  DateTime get endOfDay => DateTime(year, month, day, 23, 59, 59, 999);

  DateTime get startOfMonth => DateTime(year, month, 1);
  DateTime get endOfMonth => DateTime(year, month + 1, 0, 23, 59, 59, 999);

  DateTime get startOfYear => DateTime(year, 1, 1);
  DateTime get endOfYear => DateTime(year, 12, 31, 23, 59, 59, 999);

  // Add/subtract helpers
  DateTime addDays(int days) => add(Duration(days: days));
  DateTime subtractDays(int days) => subtract(Duration(days: days));
  DateTime addMonths(int months) => DateTime(year, month + months, day);
  DateTime addYears(int years) => DateTime(year + years, month, day);
}
