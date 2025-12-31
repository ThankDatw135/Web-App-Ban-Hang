package com.luxuryfashion.app

import io.flutter.embedding.android.FlutterActivity

/**
 * MainActivity - Android native wrapper cho Flutter app
 * 
 * Sử dụng Kotlin (KHÔNG phải Java) theo yêu cầu.
 * FlutterActivity là base class từ Flutter engine, xử lý tất cả
 * việc khởi tạo và quản lý Flutter view.
 * 
 * Firebase được tích hợp qua FlutterFire (KHÔNG phải Android Firebase SDK trực tiếp).
 * Không cần khởi tạo Firebase ở đây vì FlutterFire xử lý trong Dart code.
 */
class MainActivity: FlutterActivity()
