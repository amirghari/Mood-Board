import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';

interface Props {
    item: string;
    onPress: () => void;
}

function PickerItem({ item, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{item}</AppText>
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
