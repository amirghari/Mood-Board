import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import JournalEditScreen from './app/screens/JournalEditScreen';
import AccountScreen from './app/screens/AccountScreen';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen);
  };

  const handleWelcomeAction = (action: 'login' | 'register') => {
    setIsRegistering(action === 'register');
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('account');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onLogin={() => handleWelcomeAction('login')} onRegister={() => handleWelcomeAction('register')} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} isRegistering={isRegistering} />;
      case 'journal':
        return <JournalEditScreen onBack={() => handleScreenChange('account')} />;
      case 'account':
        return <AccountScreen onEdit={() => handleScreenChange('journal')} />;
      case 'listing':
        return <ListingDetailsScreen onBack={() => handleScreenChange('account')} />;
      default:
        return <WelcomeScreen onLogin={() => handleWelcomeAction('login')} onRegister={() => handleWelcomeAction('register')} />;
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {renderScreen()}
    </GestureHandlerRootView>
  );
}


