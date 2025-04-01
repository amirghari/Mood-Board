// app/screens/Journals.tsx
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors';

// Define your API URL (adjust if necessary)
const API_URL = 'http://172.20.10.2:5001/api/journal';

// Array of images to choose from
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

export default function Journals(props: { token: string | null }) {
  const [journals, setJournals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: props.token ? `Bearer ${props.token}` : '',
          },
        });
        // For each journal entry, if no image is provided, assign a random image
        const processedData = response.data.map((journal: any) => {
          if (!journal.image) {
            const randomIndex = Math.floor(Math.random() * randomImages.length);
            return { ...journal, image: randomImages[randomIndex] };
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
  }, [props.token]);

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
          <Card title={item.title} subTitle={item.mood} image={item.image} />
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