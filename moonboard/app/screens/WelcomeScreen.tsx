import React from 'react';
import { ImageBackground, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import AppButton from '../components/AppButton';

interface Props {
    onLogin: () => void;
    onRegister: () => void;
}

function WelcomeScreen({ onLogin, onRegister }: Props) {
    return (
        <ImageBackground blurRadius={1} style={styles.background} source={require("../assets/background1.jpg")}>
            <SafeAreaView style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require("../assets/logo.png")} />
                </View>
                <View style={styles.btnContainer}>
                    <AppButton title='Login' onPress={onLogin} color="primary"/>
                    <AppButton title='Register' onPress={onRegister} color="secondary"/>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnContainer: {
        padding: 20,
        width: "100%",
        gap: 10,
    },
    logo: {
        width: 330,
        height: 330,
        resizeMode: 'contain',
    },
})

export default WelcomeScreen;


