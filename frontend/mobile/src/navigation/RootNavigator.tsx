import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import TryOnScreen from '../screens/TryOnScreen';
import NotificationScreen from '../screens/NotificationScreen';
import AccountScreen from '../screens/AccountScreen';

// Theme
import {colors, spacing} from '../theme';

// Icons - using simple View placeholders (replace with actual icons)
const TabIcon = ({focused, iconType}: {focused: boolean; iconType: string}) => (
  <View style={[styles.icon, focused && styles.iconFocused]} />
);

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.mutedGold,
        tabBarInactiveTintColor: colors.softGray,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} iconType="home" />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} iconType="cart" />,
        }}
      />
      <Tab.Screen
        name="TryOn"
        component={TryOnScreen}
        options={{
          tabBarLabel: 'Try Outfit',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} iconType="camera" />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Alerts',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} iconType="bell" />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused}) => <TabIcon focused={focused} iconType="user" />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor: colors.darkBg},
      }}>
      <Stack.Screen name="Main" component={MainTabs} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.darkSurface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    height: 70,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.softGray,
  },
  iconFocused: {
    backgroundColor: colors.mutedGold,
  },
});
