import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  onPress?: () => void;
}

export default function ProductCard({
  name,
  category,
  price,
  originalPrice,
  imageUrl,
  onPress,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round((1 - price / originalPrice) * 100)
    : 0;

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>
      {/* Image */}
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>-{discount}%</Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.category}>{category.toUpperCase()}</Text>
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(price)}</Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>{formatPrice(originalPrice)}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkSurface,
  },
  imageContainer: {
    aspectRatio: 3 / 4,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.darkBg,
  },
  badge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.mutedGold,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    ...textStyles.caption,
    color: colors.charcoal,
    fontWeight: '600',
  },
  info: {
    padding: spacing.cardPadding,
  },
  category: {
    ...textStyles.caption,
    color: colors.softGray,
    letterSpacing: 1,
  },
  name: {
    ...textStyles.body,
    color: colors.ivory,
    marginTop: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  price: {
    ...textStyles.body,
    color: colors.ivory,
    fontWeight: '600',
  },
  originalPrice: {
    ...textStyles.bodySm,
    color: colors.softGray,
    textDecorationLine: 'line-through',
    marginLeft: spacing.sm,
  },
});
