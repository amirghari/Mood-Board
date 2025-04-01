// app/screens/AccountScreen.tsx
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Icon from '../components/Icon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import colors from '../config/colors';

const menuItems = [
  { 
    title: "My Journals",
    icon: {
      name: "format-list-bulleted" as keyof typeof MaterialCommunityIcons.glyphMap,
      backgroundColor: colors.primary
    }
  }
];

interface Props {
  onEdit: () => void;
  onLogout: () => void;
  user: {
    name: string;
    username: string;
  }
}

function AccountScreen({ onEdit, onLogout, user }: Props) {
  return (
    <Screen>
      <View style={styles.container}>
        <ListItem 
          title={user.name}
          subTitle={user.username}
          image={require('../assets/user.png')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={item => item.title}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          renderItem={({ item }) => (
            <ListItem 
              title={item.title}
              subTitle=""
              IconComponent={() => (
                <Icon 
                  name={item.icon.name} 
                  backgroundColor={item.icon.backgroundColor}
                />
              )}
              onPress={onEdit}
            />
          )}
        />
      </View>
      <ListItem
        title='Log Out'
        subTitle=""
        IconComponent={() => (
          <Icon name='logout' backgroundColor={colors.secondary} />
        )}
        onPress={onLogout}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container : {
    marginVertical: 20,
  },
});

export default AccountScreen;