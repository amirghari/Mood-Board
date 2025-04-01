// app/screens/JournalEditScreen.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import AppFormSwitch from '../components/forms/AppFormSwitch';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { useJournal } from '../hooks/useJournal';
import CategoryPickerItem from '../components/CategoryPickerItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const moods = [
  { label: 'Glowing', value: 1, backgroundColor: "#f6c65b" , icon: "emoticon-happy" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Low', value: 2, backgroundColor: "#7d8ca3", icon: "emoticon-sad" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Fired Up', value: 3, backgroundColor: "#b5523a", icon: "emoticon-angry" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Energized', value: 4, backgroundColor: "#f79256", icon: "emoticon-excited" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Balanced', value: 5, backgroundColor: "#b3a89f", icon: "emoticon-neutral" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Tense', value: 6, backgroundColor: "#9b6a6c", icon: "emoticon-cry" as keyof typeof MaterialCommunityIcons.glyphMap },
];

// Transform the "mood" field: if it's an object, extract its "value" property.
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(1).label('Title'),
  entry_text: Yup.string().required('Entry text is required').min(10).label('Entry'),
  is_private: Yup.boolean(),
});

interface Props {
  onBack: () => void;
  token: string | null;
}

export default function JournalEditScreen({ onBack, token }: Props) {
  const { postJournal, loading, error } = useJournal();

  const handleSubmit = async (values: {
    title: string;
    mood: any;
    entry_text: string;
    is_private: boolean;
  }) => {
    console.log('JournalEditScreen: Form submitted:', values);
    try {
      const moodValue = values.mood?.value;
      let processedMood = '';
      
      switch(moodValue) {
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

      const newJournal = await postJournal(
        values.title,
        processedMood,
        values.entry_text,
        values.is_private,
        token
      );
      console.log('JournalEditScreen: Journal posted successfully:', newJournal);
      onBack();
    } catch (err) {
      console.error('JournalEditScreen: Error posting journal:', err);
    }
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>New Journal Entry</AppText>
      <AppForm
        initialValues={{
          title: '',
          mood: '',
          entry_text: '',
          is_private: true,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <>
          <AppFormField name="title" placeholder="Title" icon="folder-text" />
          <AppFormPicker
            items={moods}
            name="mood"
            placeholder="Select Mood"
            PickerItemComponent={CategoryPickerItem}
          />
          <AppFormField style={{height: 300}}
            name="entry_text"
            placeholder="Write your journal entry here..."
            icon="pencil"
            multiline={true}
            numberOfLines={4}
          />
          <AppFormSwitch name="is_private" label="Private" />
          {error && <AppText style={styles.error}>{error}</AppText>}
          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <SubmitButton title="Save" />
          )}
        </>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
    },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
});