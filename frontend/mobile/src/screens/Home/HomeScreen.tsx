import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luxury Fashion</Text>
      <Text style={styles.subtitle}>Home Screen - To be implemented</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.fontSize['4xl'],
    fontFamily: theme.typography.fontFamily.heading,
    color: theme.colors.text.warmWhite,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.body,
    color: theme.colors.text.warmGray,
    textAlign: 'center',
  },
});

export default HomeScreen;
