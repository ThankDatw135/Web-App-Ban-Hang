import 'package:flutter/material.dart';

/// App Color Palette
/// Màu sắc luxury fashion phong cách premium
class AppColors {
  AppColors._();

  // Primary Colors
  static const Color primary = Color(0xFF1A1A2E);       // Deep Navy
  static const Color primaryDark = Color(0xFFE8B86D);   // Gold
  
  // Secondary Colors
  static const Color secondary = Color(0xFFE8B86D);     // Gold
  static const Color secondaryDark = Color(0xFFF5D89A); // Light Gold
  
  // Background Colors
  static const Color backgroundLight = Color(0xFFFAFAFA);
  static const Color backgroundDark = Color(0xFF121212);
  
  // Surface Colors
  static const Color surfaceLight = Color(0xFFF5F5F5);
  static const Color surfaceDark = Color(0xFF1E1E1E);
  
  // Text Colors - Light Mode
  static const Color textPrimaryLight = Color(0xFF1A1A2E);
  static const Color textSecondaryLight = Color(0xFF666666);
  
  // Text Colors - Dark Mode
  static const Color textPrimaryDark = Color(0xFFFFFFFF);
  static const Color textSecondaryDark = Color(0xFFB3B3B3);
  
  // Status Colors
  static const Color success = Color(0xFF4CAF50);
  static const Color warning = Color(0xFFFF9800);
  static const Color error = Color(0xFFE53935);
  static const Color info = Color(0xFF2196F3);
  
  // Gradient Colors
  static const List<Color> primaryGradient = [
    Color(0xFF1A1A2E),
    Color(0xFF16213E),
  ];
  
  static const List<Color> goldGradient = [
    Color(0xFFE8B86D),
    Color(0xFFD4A05D),
  ];
  
  // Neutral Colors
  static const Color divider = Color(0xFFE0E0E0);
  static const Color disabled = Color(0xFFBDBDBD);
  static const Color border = Color(0xFFE0E0E0);
}
