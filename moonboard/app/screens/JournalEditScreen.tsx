import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton, AppFormPicker } from '../components/forms/index';
import PickerItem from '../components/PickerItem';
import CategoryPickerItem from './CategoryPickerItem';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    title: Yup.string().required().min(1).label('Title'),
    body: Yup.string().required().min(10).label('Body'),
});

const moods = [
    { label: 'Happy', value: 1, backgroundColor: colors.primary, icon: "emoticon-happy" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Sad', value: 2, backgroundColor: colors.secondary, icon: "emoticon-sad" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Angry', value: 3, backgroundColor: colors.danger, icon: "emoticon-angry" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Excited', value: 4, backgroundColor: colors.primary, icon: "emoticon-excited" as keyof typeof MaterialCommunityIcons.glyphMap },
];

interface Props {
    onBack: () => void;
}

function JournalEditScreen({ onBack }: Props) {
    return (
        <Screen style={styles.container}>
            <AppForm
                initialValues={{ title: '', body: '', mood: null }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    onBack();
                }}
            >
                <AppFormField
                    name="title"
                    maxLength={25}
                    icon="folder-text"
                    placeholder="Title"
                />
                <AppFormPicker
                    items={moods}
                    name="mood"
                    placeholder="Mood"
                    PickerItemComponent={CategoryPickerItem}
                />
                <AppFormField
                    name="typewriter"
                    icon="typewriter"
                    placeholder="Body"
                    maxLength={255}
                    multiline={true}
                />
                <SubmitButton title="Save" />
            </AppForm>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
    },
});

export default JournalEditScreen;