import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

interface LuxuryButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  loading?: boolean;
}

export default function LuxuryButton({
  title,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...props
}: LuxuryButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'secondary' && styles.textSecondary,
    variant === 'ghost' && styles.textGhost,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'secondary' ? colors.ivory : colors.charcoal}
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.buttonPaddingH,
    paddingVertical: spacing.buttonPaddingV,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  primary: {
    backgroundColor: colors.ivory,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.ivory,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  gold: {
    backgroundColor: colors.mutedGold,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...textStyles.button,
    color: colors.charcoal,
    textTransform: 'uppercase',
  },
  textSecondary: {
    color: colors.ivory,
  },
  textGhost: {
    color: colors.ivory,
  },
});
