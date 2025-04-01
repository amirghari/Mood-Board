import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import colors from '../config/colors';

const moods = [
    { label: 'All', value: 0, backgroundColor: colors.primary, icon: "filter-variant" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Glowing', value: 1, backgroundColor: "#f6c65b" , icon: "emoticon-happy" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Low', value: 2, backgroundColor: "#7d8ca3", icon: "emoticon-sad" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Fired Up', value: 3, backgroundColor: "#b5523a", icon: "emoticon-angry" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Energized', value: 4, backgroundColor: "#f79256", icon: "emoticon-excited" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Balanced', value: 5, backgroundColor: "#b3a89f", icon: "emoticon-neutral" as keyof typeof MaterialCommunityIcons.glyphMap },
    { label: 'Tense', value: 6, backgroundColor: "#9b6a6c", icon: "emoticon-cry" as keyof typeof MaterialCommunityIcons.glyphMap },
  ];

interface Props {
    selectedMood?: number;
    onSelectMood: (mood: number) => void;
}

function MoodFilter({ selectedMood, onSelectMood }: Props) {
    return (
        <View style={styles.filterContainer}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {moods.map((mood) => (
                    <TouchableOpacity
                        key={mood.value}
                        style={[
                            styles.moodItem,
                            { backgroundColor: mood.backgroundColor },
                            selectedMood === mood.value && styles.selectedMood
                        ]}
                        onPress={() => onSelectMood(mood.value)}
                    >
                        <MaterialCommunityIcons 
                            name={mood.icon} 
                            size={20} 
                            color={colors.white} 
                        />
                        <AppText style={styles.moodLabel}>{mood.label}</AppText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    filterContainer: {
        height: 60, // Fixed height container
        backgroundColor: colors.light,
        borderBottomWidth: 1,
        borderBottomColor: colors.light,
    },
    scrollContent: {
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    moodItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 5,
        height: 40, // Fixed height for mood items
        backgroundColor: colors.primary,
    },
    selectedMood: {
        borderWidth: 2,
        borderColor: colors.white,
    },
    moodLabel: {
        color: colors.white,
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '500',
    },
});

export default MoodFilter; 