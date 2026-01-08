/**
 * Luxury Fashion Mobile - Spacing
 * Consistent spacing scale for padding, margins, gaps
 */

export const spacing = {
  // Base units
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  
  // Screen padding
  screenHorizontal: 20,
  screenVertical: 24,
  
  // Component specific
  cardPadding: 16,
  buttonPaddingH: 24,
  buttonPaddingV: 14,
  inputPaddingH: 16,
  inputPaddingV: 14,
  
  // Section spacing
  sectionGap: 40,
  itemGap: 12,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const iconSize = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const hitSlop = {
  top: 10,
  right: 10,
  bottom: 10,
  left: 10,
};

// Common shadow styles
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};
