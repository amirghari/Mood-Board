// app/screens/JournalEditScreen.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms';
import AppFormSwitch from '../components/forms/AppFormSwitch';
import AppText from '../components/AppText';
import colors from '../config/colors';
import { useJournal } from '../hooks/useJournal';
import CategoryPickerItem from '../components/CategoryPickerItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BackButton from '../components/BackButton';


const moods = [
  { label: 'Happy', value: 1, backgroundColor: colors.primary, icon: "emoticon-happy" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Sad', value: 2, backgroundColor: "blue", icon: "emoticon-sad" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Angry', value: 3, backgroundColor: colors.danger, icon: "emoticon-angry" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Excited', value: 4, backgroundColor: "purple", icon: "emoticon-excited" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Neutral', value: 5, backgroundColor: colors.medium, icon: "emoticon-neutral" as keyof typeof MaterialCommunityIcons.glyphMap },
  { label: 'Stressed', value: 6, backgroundColor: "red", icon: "emoticon-cry" as keyof typeof MaterialCommunityIcons.glyphMap },
];

// Transform the "mood" field: if it's an object, extract its "value" property.
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required').min(1).label('Title'),
  mood: Yup.string()
    .transform((value, originalValue) => {
      return typeof originalValue === 'object' && originalValue !== null ? originalValue.value : originalValue;
    })
    .required('Mood is required')
    .label('Mood'),
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
    mood: any; // Could be an object or string; validation will transform it.
    entry_text: string;
    is_private: boolean;
  }) => {
    console.log('JournalEditScreen: Form submitted:', values);
    try {
      // If needed, you can still process the mood field; however, validation should have transformed it.
      const processedMood =
        typeof values.mood === 'object' && values.mood !== null ? values.mood.value : values.mood;
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
      <View style={styles.header}>
        <BackButton onPress={onBack} />
        <AppText style={styles.title}>New Journal Entry</AppText>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginRight: 40, // To center the title accounting for the back button
  },
  error: {
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 10,
  },
});