import React from 'react';
import { ImageBackground, View, StyleSheet,Image, Text } from 'react-native';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

function WelcomeScreen(props: any) {
    return (
        <ImageBackground blurRadius={1} style={styles.background} source={require("../assets/background1.jpg")}>
            <Image style={styles.logo} source={require("../assets/logo.png")} />
            <View style={styles.btnContainer}>
                <AppButton title='Login' onPress={() => {}} color="primary"/>
                <AppButton title='Register' onPress={() => {}} color="secondary"/>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    btnContainer: {
        padding: 20,
        width: "100%"
    },
    logo: {
        width: 330,
        height: 330,
        position: 'absolute',
        top: 70
    },

})

export default WelcomeScreen;


