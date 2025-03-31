import React from 'react';
import { ImageBackground, View, StyleSheet,Image, Text } from 'react-native';

function WelcomeScreen(props: any) {
    return (
        <ImageBackground style={styles.background} source={require("../assets/background.jpg")}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.loginButton}></View>
            <View style={styles.registerButton}></View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    loginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#4a5d23'
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#e1a95f'
    },
    logo: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: 70
    },

})

export default WelcomeScreen;


