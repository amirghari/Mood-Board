import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Icon from './Icon';
import AppText from './AppText';

interface Props {
    item: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    };
    onPress: () => void;
}

function CategoryPickerItem({ item, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <Icon backgroundColor={item.backgroundColor} name={item.icon} size={70} />
                <AppText>{item.label}</AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        alignItems: 'center',
    }
});

export default CategoryPickerItem; 