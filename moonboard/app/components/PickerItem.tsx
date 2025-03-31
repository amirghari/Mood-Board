import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import colors from '../config/colors';

export interface Props {
    item: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    };
    onPress: () => void;
}

function PickerItem({ item, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{item.label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        padding: 20,
        color: colors.dark
    }
});

export default PickerItem;
