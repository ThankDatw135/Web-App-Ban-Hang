/**
 * Luxury Fashion Mobile - Typography
 * Fonts: Playfair Display (headings), Inter (body)
 */

import {Platform} from 'react-native';

export const fontFamily = {
  serif: Platform.select({
    ios: 'PlayfairDisplay-Regular',
    android: 'PlayfairDisplay-Regular',
    default: 'serif',
  }),
  serifMedium: Platform.select({
    ios: 'PlayfairDisplay-Medium',
    android: 'PlayfairDisplay-Medium',
    default: 'serif',
  }),
  serifBold: Platform.select({
    ios: 'PlayfairDisplay-Bold',
    android: 'PlayfairDisplay-Bold',
    default: 'serif',
  }),
  sans: Platform.select({
    ios: 'Inter-Regular',
    android: 'Inter-Regular',
    default: 'System',
  }),
  sansMedium: Platform.select({
    ios: 'Inter-Medium',
    android: 'Inter-Medium',
    default: 'System',
  }),
  sansBold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
    default: 'System',
  }),
};

export const fontSize = {
  // Display
  display1: 48,
  display2: 36,
  
  // Headings
  h1: 28,
  h2: 24,
  h3: 20,
  
  // Body
  bodyLg: 18,
  body: 16,
  bodySm: 14,
  
  // Small
  caption: 12,
  tiny: 10,
};

export const lineHeight = {
  tight: 1.1,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.7,
};

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
};

// Pre-built text styles
export const textStyles = {
  display1: {
    fontFamily: fontFamily.serifBold,
    fontSize: fontSize.display1,
    lineHeight: fontSize.display1 * lineHeight.tight,
  },
  display2: {
    fontFamily: fontFamily.serifMedium,
    fontSize: fontSize.display2,
    lineHeight: fontSize.display2 * lineHeight.tight,
  },
  h1: {
    fontFamily: fontFamily.serifMedium,
    fontSize: fontSize.h1,
    lineHeight: fontSize.h1 * lineHeight.snug,
  },
  h2: {
    fontFamily: fontFamily.serifMedium,
    fontSize: fontSize.h2,
    lineHeight: fontSize.h2 * lineHeight.snug,
  },
  h3: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.h3,
    lineHeight: fontSize.h3 * lineHeight.normal,
  },
  bodyLg: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.bodyLg,
    lineHeight: fontSize.bodyLg * lineHeight.relaxed,
  },
  body: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.body,
    lineHeight: fontSize.body * lineHeight.relaxed,
  },
  bodySm: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.bodySm,
    lineHeight: fontSize.bodySm * lineHeight.normal,
  },
  caption: {
    fontFamily: fontFamily.sans,
    fontSize: fontSize.caption,
    lineHeight: fontSize.caption * lineHeight.normal,
  },
  button: {
    fontFamily: fontFamily.sansMedium,
    fontSize: fontSize.bodySm,
    letterSpacing: letterSpacing.wide,
  },
};
