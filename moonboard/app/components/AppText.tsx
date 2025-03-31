import React from 'react';
import { Text, StyleSheet, Platform, TextStyle } from 'react-native';

interface Props {
    children: string;
    style?: TextStyle;
}

function AppText({ children, style }: Props) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
});

export default AppText;