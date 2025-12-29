import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Notifications Screen - To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.fontSize['3xl'],
    color: theme.colors.text.warmWhite,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.warmGray,
  },
});

export default NotificationsScreen;
