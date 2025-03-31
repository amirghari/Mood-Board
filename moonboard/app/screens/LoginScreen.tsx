import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';

function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Screen style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <AppTextInput
                icon="email"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text: string) => setEmail(text)}
                 />
            <AppTextInput
                icon="lock"
                placeholder="Password"
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                keyboardType="email-address"
                onChangeText={(text: string) => setPassword(text)}
            />
            <AppButton title="Login" onPress={() => console.log(email, password)} color="primary" />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginHorizontal: 10,
    },
    logo: {
        width: 400,
        height: 400,
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
});

export default LoginScreen;