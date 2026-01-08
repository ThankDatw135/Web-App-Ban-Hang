import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

// Mock data
const mockCartItems: CartItem[] = [];

export default function CartScreen() {
  const isEmpty = mockCartItems.length === 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        {!isEmpty && (
          <Text style={styles.itemCount}>{mockCartItems.length} items</Text>
        )}
      </View>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptyDescription}>
            Explore our collection and add your favorite pieces.
          </Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>EXPLORE COLLECTION</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={mockCartItems}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              <View style={styles.cartItem}>
                <View style={styles.cartItemImage} />
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemDetails}>
                    {item.size} · {item.color}
                  </Text>
                  <Text style={styles.cartItemPrice}>
                    {item.price.toLocaleString('vi-VN')}₫
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContent}
          />

          {/* Checkout Footer */}
          <View style={styles.footer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>0₫</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
  },
  header: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing['2xl'],
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...textStyles.h1,
    color: colors.ivory,
  },
  itemCount: {
    ...textStyles.bodySm,
    color: colors.softGray,
    marginTop: spacing.xs,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.darkSurface,
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    ...textStyles.h2,
    color: colors.ivory,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    ...textStyles.body,
    color: colors.softGray,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  exploreButton: {
    backgroundColor: colors.ivory,
    paddingHorizontal: spacing.buttonPaddingH,
    paddingVertical: spacing.buttonPaddingV,
  },
  exploreButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
  },

  // Cart items
  listContent: {
    paddingVertical: spacing.lg,
  },
  cartItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  cartItemImage: {
    width: 80,
    height: 100,
    backgroundColor: colors.darkSurface,
    marginRight: spacing.md,
  },
  cartItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    ...textStyles.body,
    color: colors.ivory,
  },
  cartItemDetails: {
    ...textStyles.bodySm,
    color: colors.softGray,
    marginTop: spacing.xs,
  },
  cartItemPrice: {
    ...textStyles.body,
    color: colors.ivory,
    marginTop: spacing.sm,
  },

  // Footer
  footer: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.darkSurface,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  totalLabel: {
    ...textStyles.body,
    color: colors.softGray,
  },
  totalPrice: {
    ...textStyles.h2,
    color: colors.ivory,
  },
  checkoutButton: {
    backgroundColor: colors.mutedGold,
    paddingVertical: spacing.buttonPaddingV,
    alignItems: 'center',
  },
  checkoutButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
  },
});
