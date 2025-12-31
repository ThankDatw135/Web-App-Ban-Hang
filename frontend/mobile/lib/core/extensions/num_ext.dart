import 'package:intl/intl.dart';

/// Number Extensions
///
/// Extension methods cho num, int, double để format và xử lý số

extension NumExtension on num {
  // Currency formatting (VND)
  String get toCurrency {
    final formatter = NumberFormat.currency(
      locale: 'vi_VN',
      symbol: '₫',
      decimalDigits: 0,
    );
    return formatter.format(this);
  }

  // Compact currency (e.g., 1.5M, 2K)
  String get toCompactCurrency {
    if (this >= 1000000000) {
      return '${(this / 1000000000).toStringAsFixed(1)}B₫';
    } else if (this >= 1000000) {
      return '${(this / 1000000).toStringAsFixed(1)}M₫';
    } else if (this >= 1000) {
      return '${(this / 1000).toStringAsFixed(1)}K₫';
    }
    return toCurrency;
  }

  // Percentage
  String get toPercentage => '${toStringAsFixed(1)}%';

  // Duration helpers
  Duration get seconds => Duration(seconds: toInt());
  Duration get minutes => Duration(minutes: toInt());
  Duration get hours => Duration(hours: toInt());
  Duration get days => Duration(days: toInt());
  Duration get milliseconds => Duration(milliseconds: toInt());

  // File size formatting
  String get toFileSize {
    if (this >= 1073741824) {
      return '${(this / 1073741824).toStringAsFixed(2)} GB';
    } else if (this >= 1048576) {
      return '${(this / 1048576).toStringAsFixed(2)} MB';
    } else if (this >= 1024) {
      return '${(this / 1024).toStringAsFixed(2)} KB';
    }
    return '${toInt()} bytes';
  }

  // Clamping
  num clampMin(num min) => this < min ? min : this;
  num clampMax(num max) => this > max ? max : this;
}

extension IntExtension on int {
  // Ordinal (1st, 2nd, 3rd, etc.)
  String get ordinal {
    if (this >= 11 && this <= 13) {
      return '${this}th';
    }
    switch (this % 10) {
      case 1:
        return '${this}st';
      case 2:
        return '${this}nd';
      case 3:
        return '${this}rd';
      default:
        return '${this}th';
    }
  }

  // Repeat
  List<T> times<T>(T Function(int index) callback) {
    return List.generate(this, callback);
  }
}

extension DoubleExtension on double {
  // Round to decimal places
  double roundToDecimals(int places) {
    final mod = 10.0 * places;
    return ((this * mod).round().toDouble() / mod);
  }
}
