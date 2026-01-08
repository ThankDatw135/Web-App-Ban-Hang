import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

export default function HomeScreen() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroLabel}>New Collection 2026</Text>
        <Text style={styles.heroTitle}>Quiet Luxury.</Text>
        <Text style={styles.heroTitleAccent}>Timeless Elegance.</Text>
        <Text style={styles.heroDescription}>
          Discover our curated collection of refined pieces designed for the discerning individual.
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>EXPLORE COLLECTION</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>CURATED SELECTION</Text>
          <Text style={styles.sectionTitle}>Featured Pieces</Text>
        </View>

        {/* Product Grid Placeholder */}
        <View style={styles.productGrid}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.productCard}>
              <View style={styles.productImage} />
              <Text style={styles.productCategory}>Clothing</Text>
              <Text style={styles.productName}>Premium Product</Text>
              <Text style={styles.productPrice}>2.500.000₫</Text>
            </View>
          ))}
        </View>
      </View>

      {/* AI Try-On CTA */}
      <View style={styles.tryOnSection}>
        <Text style={styles.sectionLabel}>EXPERIENCE INNOVATION</Text>
        <Text style={styles.sectionTitle}>Virtual Try-On</Text>
        <Text style={styles.tryOnDescription}>
          Use our AI-powered virtual try-on to see how our pieces look on you.
        </Text>
        <TouchableOpacity style={styles.goldButton}>
          <Text style={styles.goldButtonText}>TRY NOW</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBg,
  },
  content: {
    paddingBottom: spacing['2xl'],
  },
  
  // Hero
  hero: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['2xl'],
  },
  heroLabel: {
    color: colors.mutedGold,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  heroTitle: {
    ...textStyles.display2,
    color: colors.ivory,
  },
  heroTitleAccent: {
    ...textStyles.display2,
    color: colors.mutedGold,
    marginBottom: spacing.lg,
  },
  heroDescription: {
    ...textStyles.body,
    color: colors.warmWhite,
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  ctaButton: {
    backgroundColor: colors.ivory,
    paddingHorizontal: spacing.buttonPaddingH,
    paddingVertical: spacing.buttonPaddingV,
    alignSelf: 'flex-start',
  },
  ctaButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
    textTransform: 'uppercase',
  },

  // Section
  section: {
    paddingHorizontal: spacing.screenHorizontal,
    marginTop: spacing.sectionGap,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    color: colors.mutedGold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    ...textStyles.h1,
    color: colors.ivory,
    marginTop: spacing.xs,
  },

  // Product Grid
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  productCard: {
    width: '50%',
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.lg,
  },
  productImage: {
    aspectRatio: 3 / 4,
    backgroundColor: colors.darkSurface,
    marginBottom: spacing.sm,
  },
  productCategory: {
    ...textStyles.caption,
    color: colors.softGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  productName: {
    ...textStyles.body,
    color: colors.ivory,
    marginTop: spacing.xs,
  },
  productPrice: {
    ...textStyles.body,
    color: colors.ivory,
    marginTop: spacing.xs,
  },

  // Try-On Section
  tryOnSection: {
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing['2xl'],
    marginTop: spacing.sectionGap,
    backgroundColor: colors.darkSurface,
    alignItems: 'center',
  },
  tryOnDescription: {
    ...textStyles.body,
    color: colors.warmWhite,
    opacity: 0.7,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  goldButton: {
    backgroundColor: colors.mutedGold,
    paddingHorizontal: spacing.buttonPaddingH,
    paddingVertical: spacing.buttonPaddingV,
  },
  goldButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
    textTransform: 'uppercase',
  },
});
