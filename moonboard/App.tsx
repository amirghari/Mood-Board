// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import JournalEditScreen from './app/screens/JournalEditScreen';
import AccountScreen from './app/screens/AccountScreen';
import Journals from './app/screens/Journals';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen'; // New details screen
import BottomMenu from './app/components/BottomMenu';
import colors from './app/config/colors';

interface User {
  id: number;
  username: string;
  name: string;
}

interface Journal {
  id: number;
  title: string;
  mood: string;
  entry_text: string;
  is_private: boolean;
  created_at: string;
  image?: any;
  user_id: number;
}

export default function App() {
  // possible currentScreen values: 'welcome', 'login', 'journals', 'listing', 'journal', 'account'
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

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
    setCurrentScreen(
      tab === 'feed' ? 'journals' : tab === 'plus' ? 'journal' : 'account'
    );
  };

  // Handle selecting a journal to view details
  const handleSelectJournal = (journal: Journal) => {
    console.log('App: Journal selected:', journal);
    setSelectedJournal(journal);
    setCurrentScreen('listing');
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
        return <LoginScreen onLogin={handleLogin} isRegistering={isRegistering} />;
      case 'journals':
        return (
          <View style={styles.mainContainer}>
            {/* Pass onSelectJournal prop so that when a card is pressed, it calls this callback */}
            <Journals token={token} onSelectJournal={handleSelectJournal} />
            <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
          </View>
        );
      case 'listing':
        return (
          <ListingDetailsScreen
            journal={selectedJournal}
            onBack={() => setCurrentScreen('journals')}
          />
        );
      case 'journal':
        return (
          <View style={styles.mainContainer}>
            <JournalEditScreen onBack={() => handleTabPress('feed')} token={token} />
            <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
          </View>
        );
      case 'account':
        return (
          <View style={styles.mainContainer}>
            <AccountScreen onEdit={() => handleTabPress('plus')} onLogout={handleLogout} user={user} />
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