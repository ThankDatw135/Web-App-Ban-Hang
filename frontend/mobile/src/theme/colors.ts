/**
 * Luxury Fashion Mobile - Color Palette
 * Design Philosophy: Quiet Luxury · Dark Mode Default
 */

export const colors = {
  // Primary - Quiet Luxury
  charcoal: '#0E0E0E',
  ivory: '#F7F5F2',
  
  // Secondary
  softGray: '#8B8B8B',
  mutedGold: '#C9B37E',
  
  // Dark Mode (Default)
  darkBg: '#121212',
  darkSurface: '#1E1E1E',
  warmWhite: '#F5F1E8',
  
  // Functional
  success: '#4A7C59',
  error: '#8B3A3A',
  warning: '#B8860B',
  
  // Opacity variants
  overlay: 'rgba(14, 14, 14, 0.8)',
  border: 'rgba(247, 245, 242, 0.1)',
  borderLight: 'rgba(247, 245, 242, 0.2)',
  
  // Transparent
  transparent: 'transparent',
} as const;

export type ColorName = keyof typeof colors;
