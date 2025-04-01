// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import JournalEditScreen from './app/screens/JournalEditScreen';
import AccountScreen from './app/screens/AccountScreen';
import Journals from './app/screens/Journals';
import BottomMenu from './app/components/BottomMenu';
import colors from './app/config/colors';

interface User {
  id: number;
  username: string;
  name: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome'); // 'welcome', 'login', 'journals', 'journal', 'account'
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Handle welcome screen actions
  const handleWelcomeAction = (action: 'login' | 'register') => {
    console.log('App: handleWelcomeAction called with:', action);
    setIsRegistering(action === 'register');
    setCurrentScreen('login');
  };

  // Handle login/register completion
  const handleLogin = (newToken: string, userData: User) => {
    console.log('App: handleLogin called with token:', newToken);
    setToken(newToken);
    setUser(userData);
    setCurrentScreen('journals');
    setActiveTab('feed');
    console.log('App: State updated to journals with activeTab feed');
  };

  // Handle logout
  const handleLogout = () => {
    console.log('App: handleLogout called');
    setToken(null);
    setUser(null);
    setCurrentScreen('welcome');
  };

  // Handle bottom menu navigation
  const handleTabPress = (tab: string) => {
    console.log('App: handleTabPress called with:', tab);
    setActiveTab(tab);
    setCurrentScreen(tab === 'feed' ? 'journals' : tab === 'plus' ? 'journal' : 'account');
  };

  // Render the appropriate screen
  const renderScreen = () => {
    console.log('App: Rendering screen:', currentScreen);
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onLogin={() => handleWelcomeAction('login')}
            onRegister={() => handleWelcomeAction('register')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            isRegistering={isRegistering}
          />
        );
      case 'journals':
      case 'journal':
      case 'account':
        return (
          <View style={styles.mainContainer}>
            {currentScreen === 'journals' && <Journals token={token} />}
            {currentScreen === 'journal' && (
              <JournalEditScreen
                onBack={() => handleTabPress('feed')}
                token={token}
              />
            )}
            {currentScreen === 'account' && (
              <AccountScreen
                onEdit={() => handleTabPress('plus')}
                onLogout={handleLogout}
                user={user}
              />
            )}
            <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
          </View>
        );
      default:
        return (
          <WelcomeScreen
            onLogin={() => handleWelcomeAction('login')}
            onRegister={() => handleWelcomeAction('register')}
          />
        );
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {renderScreen()}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.light,
  },
});