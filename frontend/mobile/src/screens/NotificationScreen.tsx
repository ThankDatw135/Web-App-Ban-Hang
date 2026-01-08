import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {colors, spacing, textStyles} from '../theme';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

// Empty for now
const mockNotifications: Notification[] = [];

export default function NotificationScreen() {
  const isEmpty = mockNotifications.length === 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>No notifications yet</Text>
          <Text style={styles.emptyDescription}>
            We'll notify you about orders, promotions, and new arrivals.
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <View style={[styles.notificationItem, !item.read && styles.unread]}>
              <View style={styles.dot} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{item.title}</Text>
                <Text style={styles.notificationMessage}>{item.message}</Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
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
  },

  // List
  listContent: {
    paddingVertical: spacing.md,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  unread: {
    backgroundColor: colors.darkSurface,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.mutedGold,
    marginTop: 6,
    marginRight: spacing.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    ...textStyles.body,
    color: colors.ivory,
    fontWeight: '600',
  },
  notificationMessage: {
    ...textStyles.bodySm,
    color: colors.softGray,
    marginTop: spacing.xs,
  },
  notificationTime: {
    ...textStyles.caption,
    color: colors.softGray,
    marginTop: spacing.sm,
  },
});
