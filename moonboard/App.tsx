import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppTextInput from './app/components/AppTextInput';

import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import colors from './app/config/colors';
import ListItem from './app/components/ListItem';
import AccountScreen from './app/screens/AccountScreen';
import Journals from './app/screens/Journals';
import AppPicker from './app/components/AppPicker';
import { useState } from 'react';
import LoginScreen from './app/screens/LoginScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LoginScreen />
    </GestureHandlerRootView>
  );
}


