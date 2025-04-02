import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';
import AppText from '../components/AppText';
import MoodFilter from '../components/MoodFilter';
import { useJournal } from '../hooks/useJournal';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_URL = 'http://172.20.10.2:5001/api/journal';

const randomImages = [
  require('../assets/journal1.jpg'),
  require('../assets/journal2.jpg'),
  require('../assets/journal3.jpg'),
  require('../assets/journal4.jpg'),
  require('../assets/journal5.jpg'),
  require('../assets/journal6.jpg'),
  require('../assets/journal7.jpg'),
  require('../assets/journal8.jpg'),
  require('../assets/journal10.jpg'),
  require('../assets/journal12.jpg'),
  require('../assets/journal13.jpg'),
  require('../assets/journal14.jpg'),
  require('../assets/journal15.jpg'), 
  require('../assets/journal16.jpg'),
  require('../assets/journal17.jpg'),
];

const moods = [
  { label: 'Happy', value: 1, backgroundColor: colors.primary, icon: "emoticon-happy" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Sad', value: 2, backgroundColor: "#0A1D37", icon: "emoticon-sad" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Angry', value: 3, backgroundColor: "#DE3163", icon: "emoticon-angry" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Excited', value: 4, backgroundColor: colors.tertiary, icon: "emoticon-excited" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Neutral', value: 5, backgroundColor: "#D36B00", icon: "emoticon-neutral" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Stressed', value: 6, backgroundColor: "red", icon: "emoticon-cry" as keyof typeof MaterialCommunityIcons.glyphMap },
];

interface User {
  id: number; // Make sure it's a number
  username: string;
}

interface Props {
  token: string | null;
  onSelectJournal: (journal: any) => void;
  user?: User; // optional
}

export default function Journals({ token, onSelectJournal, user }: Props) {
  const { getJournals, loading, error } = useJournal();
  const [journals, setJournals] = useState<any[]>([]);
  const [selectedMood, setSelectedMood] = useState<number | undefined>();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // If user is provided, fetch /user
        // If not, fetch the base route
        const endpoint = user ? '/user' : '';
        console.log(`Fetching from: ${API_URL + endpoint}`);
        console.log('With token:', token ? 'Token present' : 'No token');
        console.log('User:', user);
        
        const response = await axios.get(API_URL + endpoint, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

        console.log('Response received:', response.data);
        const processedData = response.data.map((journal: any, index: number) => {
          if (!journal.id) {
            console.warn(`Missing "id", fallback key for index ${index}`);
            journal.id = `fallback-${index}`;
          }
          if (!journal.image) {
            const rnd = Math.floor(Math.random() * randomImages.length);
            journal.image = randomImages[rnd];
          }
          return journal;
        });

        setJournals(processedData);
      } catch (err: any) {
        console.error('Error fetching journals:', err);
        console.error('Error response:', err.response?.data);
        console.error('Error status:', err.response?.status);
        setError(err.response?.data?.message || 'Error fetching journals');
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, [token, user]);

  const handleMoodSelect = (mood: number) => {
    setSelectedMood(selectedMood === mood ? undefined : mood);
  };

  const filteredJournals = selectedMood
    ? journals.filter(journal => {
        // Convert the mood label to match the database value
        let processedMood = '';
        switch(selectedMood) {
          case 1:
            processedMood = 'Glowing';
            break;
          case 2:
            processedMood = 'Low';
            break;
          case 3:
            processedMood = 'Fired Up';
            break;
          case 4:
            processedMood = 'Energized';
            break;
          case 5:
            processedMood = 'Balanced';
            break;
          case 6:
            processedMood = 'Tense';
            break;
          default:
            processedMood = '';
        }
        return journal.mood === processedMood;
      })
    : journals;

  if (loading) {
    return (
      <Screen style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={styles.container}>
        <AppText style={styles.error}>{error}</AppText>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <MoodFilter 
        selectedMood={selectedMood}
        onSelectMood={handleMoodSelect}
      />
      <FlatList
        data={filteredJournals}
        keyExtractor={(journal) => journal.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectJournal(item)}>
            <Card 
              title={item.title} 
              subTitle={item.mood} 
              image={item.image}
              username={item.username || 'Anonymous'}
              date={new Date(item.created_at).toLocaleDateString()}
            />
          </TouchableOpacity>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    backgroundColor: colors.light,
    flex: 1,
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
  },
});