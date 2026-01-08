import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary - Quiet Luxury Palette
        charcoal: '#0E0E0E',
        ivory: '#F7F5F2',
        
        // Secondary
        'soft-gray': '#8B8B8B',
        'muted-gold': '#C9B37E',
        
        // Dark Mode
        'dark-bg': '#121212',
        'dark-surface': '#1E1E1E',
        'warm-white': '#F5F1E8',
        
        // Functional
        success: '#4A7C59',
        error: '#8B3A3A',
        warning: '#B8860B',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography
        'display-1': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.3' }],
        'heading-3': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      transitionDuration: {
        'slow': '600ms',
        'medium': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-luxury': 'linear-gradient(135deg, #0E0E0E 0%, #1a1a1a 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
