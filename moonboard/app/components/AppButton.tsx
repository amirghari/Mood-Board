import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import  text  from '../config/styles';   

import colors from '../config/colors';


interface Props {
    title: string;
    onPress : () => void;
    color: 'primary' | 'secondary' | 'black' | 'white';
}


function AppButton({ title, onPress, color }: Props) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor: colors[color]}]} onPress={onPress}>
            <Text style={[text.text, { color: colors.white }]}>{title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: '100%',
        marginVertical: 10,
    },
});

export default AppButton;