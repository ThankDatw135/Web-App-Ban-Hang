/**
 * Luxury Fashion Mobile App - Theme
 * Design System Colors, Typography, Spacing
 */

export const theme = {
  colors: {
    // Primary Colors
    charcoal: '#0E0E0E',
    ivory: '#F7F5F2',
    
    // Secondary Colors
    softGray: '#8B8B8B',
    softGrayLight: '#B8B8B8',
    softGrayDark: '#5A5A5A',
    mutedGold: '#C9B37E',
    mutedGoldLight: '#D4C59A',
    mutedGoldDark: '#B39F6A',
    
    // Background (Dark Mode Default)
    background: {
      primary: '#121212',
      secondary: '#1A1A1A',
      elevated: '#242424',
    },
    
    // Text
    text: {
      warmWhite: '#F5F1E8',
      warmGray: '#C4C0B8',
      muted: '#8B8B8B',
    },
    
    // Borders
    border: {
      subtle: 'rgba(247, 245, 242, 0.08)',
      medium: 'rgba(247, 245, 242, 0.12)',
    },
    
    // Status
    status: {
      success: '#4CAF50',
      error: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    },
  },
  
  typography: {
    fontFamily: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
    },
    fontWeight: {
      light: '300',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.7,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
};

export type Theme = typeof theme;
