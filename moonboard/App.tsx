// App.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import JournalEditScreen from './app/screens/JournalEditScreen';
import AccountScreen from './app/screens/AccountScreen';
import MyJournals from './app/screens/Journals';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
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
  username: string;
}

export default function App() {
  // possible screen states: 'welcome', 'login', 'myjournals', 'myjournalsuser', 'listing', 'journal', 'account'
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [isRegistering, setIsRegistering] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [selectedJournal, setSelectedJournal] = useState<Journal | null>(null);

  const handleWelcomeAction = (action: 'login' | 'register') => {
    setIsRegistering(action === 'register');
    setCurrentScreen('login');
  };

  const handleLogin = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    setCurrentScreen('myjournals'); // By default, let's show all journals or user journnals?
    setActiveTab('feed');
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setCurrentScreen('welcome');
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(
      tab === 'feed' ? 'myjournals' : tab === 'plus' ? 'journal' : 'account'
    );
  };

  const handleSelectJournal = (journal: Journal) => {
    setSelectedJournal(journal);
    setCurrentScreen('listing');
  };

  // Called from the AccountScreen "My Journals" item
  const handleUserJournals = () => {
    setCurrentScreen('myjournalsuser');
  };

  const renderScreen = () => {
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

      case 'myjournals':
        // This might display all journals or some default set (the code you already have).
        return (
          <View style={styles.mainContainer}>
            <MyJournals token={token} onSelectJournal={handleSelectJournal} />
            <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
          </View>
        );

      case 'myjournalsuser':
        // Pass user for filtering your user's journals. 
        return (
          <View style={styles.mainContainer}>
            {/* Here we pass user as a prop so Journals fetches from /api/journal/user */}
            <MyJournals 
              token={token} 
              user={user} 
              onSelectJournal={handleSelectJournal} 
            />
            <BottomMenu activeTab={activeTab} onTabPress={handleTabPress} />
          </View>
        );

      case 'listing':
        return (
          <ListingDetailsScreen
            journal={selectedJournal}
            onBack={() => setCurrentScreen('myjournals')}
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
            <AccountScreen
              onUserJournals={handleUserJournals} // new callback
              onLogout={handleLogout}
              user={user}
            />
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