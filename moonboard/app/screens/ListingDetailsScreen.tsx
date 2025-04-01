// app/screens/ListingDetailsScreen.tsx
import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import ListItem from '../components/ListItem';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import colors from '../config/colors';
import BackButton from '../components/BackButton';

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
  name: string;
}

interface Props {
  journal: Journal | null;
  onBack: () => void;
}

export default function ListingDetailsScreen({ journal, onBack }: Props) {
  if (!journal) {
    return (
      <Screen>
        <AppText style={styles.error}>No journal details available.</AppText>
        <AppButton title="Back" onPress={onBack} color="primary" />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={styles.headerContainer}>
        <BackButton onPress={onBack} />
      </View>
      <ScrollView>
        <Image
          style={styles.image}
          source={journal.image ? journal.image : require("../assets/background.jpg")}
        />
        <View style={styles.detailContainer}>
          <AppText style={styles.title}>{journal.title}</AppText>
          <AppText style={styles.mood}>{`Mood: ${journal.mood}`}</AppText>
          <AppText style={styles.body}>{journal.entry_text}</AppText>
          <View style={styles.userContainer}>
            <ListItem 
              image={require("../assets/user.png")}
              title={journal.name}
              subTitle={`User Name: ${journal.username}`}
            />
            <AppText style={styles.info}>
            {`Created at: ${new Date(journal.created_at).toLocaleString()}`}
          </AppText>
          </View>
          
          
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    width: '30%',
},
  image: {
    width: '100%',
    height: 340,
    resizeMode: 'cover',
  },
  detailContainer: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 10,
  },
  mood: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.secondary,
    marginVertical: 10,
  },
  body: {
    fontSize: 18,
    marginVertical: 40,
  },
  info: {
    fontSize: 16,
    color: colors.medium,
    position: 'absolute',
    bottom:-20 ,
    left: 60
  },
  userContainer: {
    marginVertical: 20,
  },
  error: {
    fontSize: 18,
    color: colors.danger,
    textAlign: 'center',
    marginVertical: 20,
  },
});