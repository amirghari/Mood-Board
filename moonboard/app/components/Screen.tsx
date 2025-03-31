import React from 'react';
import { SafeAreaView, StyleSheet, ViewStyle } from 'react-native';
import Constants from 'expo-constants';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
}

function Screen({children, style}: Props) {
    return (
        <SafeAreaView style={[styles.screen, style]}>{children}</SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        padding: Constants.statusBarHeight,
    }
});

export default Screen;