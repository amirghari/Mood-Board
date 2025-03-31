import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    name: keyof typeof MaterialCommunityIcons.glyphMap;
    size?: number;
    backgroundColor?: string;
    iconColor?: string;
}

function Icon({name, size = 40, backgroundColor = colors.black, iconColor = colors.white}: Props) {
    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor,
            justifyContent: 'center',
            alignItems: 'center'
         }}
        >
            <MaterialCommunityIcons name={name} color={iconColor} size={size / 2} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Icon;