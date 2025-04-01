import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';

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
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        // If user is provided, fetch /user
        // If not, fetch the base route
        const endpoint = user ? '/user' : '';
        console.log(`Fetching from: ${API_URL + endpoint}`);
        const response = await axios.get(API_URL + endpoint, {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        });

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
      } catch (err) {
        console.error('Error fetching journals:', err);
        setError('Error fetching journals');
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, [token, user]);

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
        <Text style={styles.errorText}>{error}</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <FlatList
        data={journals}
        keyExtractor={(journal) => journal.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectJournal(item)}>
            <Card title={item.title} subTitle={item.mood} image={item.image} />
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
  errorText: {
    color: colors.danger,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});