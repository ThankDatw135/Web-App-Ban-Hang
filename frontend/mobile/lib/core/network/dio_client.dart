import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../config/app_config.dart';
import '../utils/logger.dart';

/// Dio HTTP Client Provider
final dioClientProvider = Provider<Dio>((ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: AppConfig.apiBaseUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    ),
  );

  // Add interceptors
  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) {
        // Log request in debug mode
        if (AppConfig.isDebug) {
          AppLogger.request(
            options.method,
            options.path,
            options.data is Map<String, dynamic>
                ? options.data as Map<String, dynamic>
                : null,
          );
        }
        return handler.next(options);
      },
      onResponse: (response, handler) {
        // Log response in debug mode
        if (AppConfig.isDebug) {
          AppLogger.response(
            response.statusCode ?? 0,
            response.requestOptions.path,
            response.data,
          );
        }
        return handler.next(response);
      },
      onError: (error, handler) {
        // Log error in debug mode
        if (AppConfig.isDebug) {
          AppLogger.error(
            'API Error [${error.response?.statusCode}] => ${error.requestOptions.path}',
            error.message,
          );
        }
        return handler.next(error);
      },
    ),
  );

  return dio;
});

/// API Client wrapper
class DioClient {
  final Dio _dio;

  DioClient(this._dio);

  /// GET request
  Future<Response<T>> get<T>(
    String path, {
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    return _dio.get<T>(
      path,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// POST request
  Future<Response<T>> post<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    return _dio.post<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// PUT request
  Future<Response<T>> put<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    return _dio.put<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// DELETE request
  Future<Response<T>> delete<T>(
    String path, {
    dynamic data,
    Map<String, dynamic>? queryParameters,
    Options? options,
  }) async {
    return _dio.delete<T>(
      path,
      data: data,
      queryParameters: queryParameters,
      options: options,
    );
  }

  /// Set auth token
  void setAuthToken(String token) {
    _dio.options.headers['Authorization'] = 'Bearer $token';
  }

  /// Clear auth token
  void clearAuthToken() {
    _dio.options.headers.remove('Authorization');
  }
}

/// DioClient Provider
final dioClientServiceProvider = Provider<DioClient>((ref) {
  final dio = ref.watch(dioClientProvider);
  return DioClient(dio);
});
