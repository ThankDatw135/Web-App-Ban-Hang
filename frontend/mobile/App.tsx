import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {colors} from './src/theme/colors';

// Custom dark theme matching web design
const LuxuryDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.mutedGold,
    background: colors.darkBg,
    card: colors.darkSurface,
    text: colors.warmWhite,
    border: colors.ivory + '10',
    notification: colors.mutedGold,
  },
};

function App(): React.JSX.Element {
  return (
    <NavigationContainer theme={LuxuryDarkTheme}>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkBg} />
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
