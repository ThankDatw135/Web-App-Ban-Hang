/// API Response - Standard API response wrapper
class ApiResponse<T> {
  final bool success;
  final String? message;
  final T? data;
  final Map<String, dynamic>? errors;
  final PaginationMeta? pagination;

  const ApiResponse({
    required this.success,
    this.message,
    this.data,
    this.errors,
    this.pagination,
  });

  /// Create from JSON with data parser
  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic)? dataParser,
  ) {
    return ApiResponse(
      success: json['success'] ?? true,
      message: json['message'],
      data: dataParser != null && json['data'] != null
          ? dataParser(json['data'])
          : json['data'],
      errors: json['errors'],
      pagination: json['pagination'] != null
          ? PaginationMeta.fromJson(json['pagination'])
          : null,
    );
  }

  /// Success response
  factory ApiResponse.success(T data, {String? message}) {
    return ApiResponse(
      success: true,
      message: message,
      data: data,
    );
  }

  /// Error response
  factory ApiResponse.error(String message, {Map<String, dynamic>? errors}) {
    return ApiResponse(
      success: false,
      message: message,
      errors: errors,
    );
  }

  /// Check if has data
  bool get hasData => data != null;

  /// Check if has errors
  bool get hasErrors => errors != null && errors!.isNotEmpty;

  /// Check if has pagination
  bool get hasPagination => pagination != null;
}

/// Pagination Meta
class PaginationMeta {
  final int currentPage;
  final int totalPages;
  final int totalItems;
  final int itemsPerPage;
  final bool hasNextPage;
  final bool hasPreviousPage;

  const PaginationMeta({
    required this.currentPage,
    required this.totalPages,
    required this.totalItems,
    required this.itemsPerPage,
    required this.hasNextPage,
    required this.hasPreviousPage,
  });

  factory PaginationMeta.fromJson(Map<String, dynamic> json) {
    final current = json['current_page'] ?? json['page'] ?? 1;
    final total = json['total_pages'] ?? json['totalPages'] ?? 1;

    return PaginationMeta(
      currentPage: current,
      totalPages: total,
      totalItems: json['total_items'] ?? json['total'] ?? 0,
      itemsPerPage: json['items_per_page'] ?? json['limit'] ?? 20,
      hasNextPage: json['has_next_page'] ?? current < total,
      hasPreviousPage: json['has_previous_page'] ?? current > 1,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'current_page': currentPage,
      'total_pages': totalPages,
      'total_items': totalItems,
      'items_per_page': itemsPerPage,
      'has_next_page': hasNextPage,
      'has_previous_page': hasPreviousPage,
    };
  }
}

/// Paginated List
class PaginatedList<T> {
  final List<T> items;
  final PaginationMeta pagination;

  const PaginatedList({
    required this.items,
    required this.pagination,
  });

  /// Check if list is empty
  bool get isEmpty => items.isEmpty;
  bool get isNotEmpty => items.isNotEmpty;

  /// Item count
  int get length => items.length;

  /// Has more items to load
  bool get hasMore => pagination.hasNextPage;
}
