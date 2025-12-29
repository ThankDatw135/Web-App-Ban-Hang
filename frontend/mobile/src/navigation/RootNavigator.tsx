import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import {theme} from '@/theme';

// Placeholder screens
import HomeScreen from '@/screens/Home/HomeScreen';
import CartScreen from '@/screens/Cart/CartScreen';
import TryOutfitScreen from '@/screens/TryOutfit/TryOutfitScreen';
import NotificationsScreen from '@/screens/Notifications/NotificationsScreen';
import AccountScreen from '@/screens/Account/AccountScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.elevated,
          borderTopColor: theme.colors.border.medium,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: theme.colors.mutedGold,
        tabBarInactiveTintColor: theme.colors.text.muted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: theme.typography.fontFamily.body,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({color, size}) => <Icon name="shopping-bag" size={size} color={color} />,
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen
        name="TryOutfit"
        component={TryOutfitScreen}
        options={{
          tabBarIcon: ({color, size}) => <Icon name="camera" size={size} color={color} />,
          tabBarLabel: 'Try On',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({color, size}) => <Icon name="bell" size={size} color={color} />,
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({color, size}) => <Icon name="user" size={size} color={color} />,
          tabBarLabel: 'Account',
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
