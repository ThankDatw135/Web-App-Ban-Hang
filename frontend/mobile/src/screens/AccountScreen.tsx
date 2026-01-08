import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

export default function AccountScreen() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        <View style={styles.guestContainer}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.guestTitle}>Welcome to Luxury Fashion</Text>
          <Text style={styles.guestDescription}>
            Sign in to access your orders, wishlist, and personalized recommendations.
          </Text>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar} />
        <Text style={styles.userName}>John Doe</Text>
        <Text style={styles.userEmail}>john@example.com</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {[
          {label: 'My Orders', icon: '📦'},
          {label: 'Wishlist', icon: '❤️'},
          {label: 'Addresses', icon: '📍'},
          {label: 'Payment Methods', icon: '💳'},
          {label: 'Settings', icon: '⚙️'},
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
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
  },
  headerTitle: {
    ...textStyles.h1,
    color: colors.ivory,
  },

  // Guest state
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.darkSurface,
    marginBottom: spacing.xl,
  },
  guestTitle: {
    ...textStyles.h2,
    color: colors.ivory,
    textAlign: 'center',
  },
  guestDescription: {
    ...textStyles.body,
    color: colors.softGray,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  signInButton: {
    backgroundColor: colors.ivory,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.buttonPaddingV,
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  signInButtonText: {
    ...textStyles.button,
    color: colors.charcoal,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: colors.ivory,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.buttonPaddingV,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    ...textStyles.button,
    color: colors.ivory,
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.darkSurface,
    marginBottom: spacing.md,
  },
  userName: {
    ...textStyles.h2,
    color: colors.ivory,
  },
  userEmail: {
    ...textStyles.bodySm,
    color: colors.softGray,
    marginTop: spacing.xs,
  },

  // Menu
  menuSection: {
    paddingVertical: spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: spacing.md,
  },
  menuLabel: {
    ...textStyles.body,
    color: colors.ivory,
    flex: 1,
  },
  menuArrow: {
    fontSize: 20,
    color: colors.softGray,
  },

  // Sign out
  signOutButton: {
    marginHorizontal: spacing.screenHorizontal,
    marginVertical: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.error,
  },
  signOutText: {
    ...textStyles.body,
    color: colors.error,
  },
});
