import 'package:flutter/material.dart';

import '../../../core/theme/app_colors.dart';

/// Empty State Widget - For empty lists/screens
class EmptyStateWidget extends StatelessWidget {
  final IconData icon;
  final String title;
  final String? description;
  final String? actionText;
  final VoidCallback? onAction;

  const EmptyStateWidget({
    super.key,
    this.icon = Icons.inbox_outlined,
    required this.title,
    this.description,
    this.actionText,
    this.onAction,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              size: 80,
              color: AppColors.textSecondaryLight,
            ),
            const SizedBox(height: 24),
            Text(
              title,
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.center,
            ),
            if (description != null) ...[
              const SizedBox(height: 8),
              Text(
                description!,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondaryLight,
                    ),
                textAlign: TextAlign.center,
              ),
            ],
            if (actionText != null && onAction != null) ...[
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: onAction,
                child: Text(actionText!),
              ),
            ],
          ],
        ),
      ),
    );
  }

  // Predefined empty states
  static EmptyStateWidget cart({VoidCallback? onAction}) {
    return EmptyStateWidget(
      icon: Icons.shopping_cart_outlined,
      title: 'Giỏ hàng trống',
      description: 'Hãy thêm sản phẩm vào giỏ hàng của bạn',
      actionText: 'Mua sắm ngay',
      onAction: onAction,
    );
  }

  static EmptyStateWidget orders({VoidCallback? onAction}) {
    return EmptyStateWidget(
      icon: Icons.receipt_long_outlined,
      title: 'Chưa có đơn hàng',
      description: 'Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm!',
      actionText: 'Mua sắm ngay',
      onAction: onAction,
    );
  }

  static EmptyStateWidget favorites() {
    return const EmptyStateWidget(
      icon: Icons.favorite_border,
      title: 'Chưa có sản phẩm yêu thích',
      description: 'Nhấn vào biểu tượng trái tim để thêm sản phẩm yêu thích',
    );
  }

  static EmptyStateWidget search() {
    return const EmptyStateWidget(
      icon: Icons.search_off,
      title: 'Không tìm thấy kết quả',
      description: 'Thử tìm kiếm với từ khóa khác',
    );
  }
}

/// Error State Widget
class ErrorStateWidget extends StatelessWidget {
  final String? message;
  final String? actionText;
  final VoidCallback? onRetry;

  const ErrorStateWidget({
    super.key,
    this.message,
    this.actionText = 'Thử lại',
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(
              Icons.error_outline,
              size: 64,
              color: AppColors.error,
            ),
            const SizedBox(height: 16),
            Text(
              'Đã xảy ra lỗi',
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.center,
            ),
            if (message != null) ...[
              const SizedBox(height: 8),
              Text(
                message!,
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: AppColors.textSecondaryLight,
                    ),
                textAlign: TextAlign.center,
              ),
            ],
            if (onRetry != null) ...[
              const SizedBox(height: 24),
              ElevatedButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh),
                label: Text(actionText!),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
