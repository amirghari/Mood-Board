import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { Formik } from 'formik';

function LoginScreen() {

    return (
        <Screen style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => console.log(values)}
            >
                {({ handleChange, handleSubmit }) => (
                    <>
                        <AppTextInput
                            icon="email"
                            placeholder="Email"
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                        />
                        <AppTextInput
                            icon="lock"
                            placeholder="Password"
                            textContentType="password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            keyboardType="email-address"
                            onChangeText={handleChange('password')}
                        />
                        <AppButton title="Login" onPress={handleSubmit} color="primary" />
                    </>
                )}
            </Formik>
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