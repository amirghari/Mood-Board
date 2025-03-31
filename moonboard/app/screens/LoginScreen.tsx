import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import { AppForm, AppFormField, SubmitButton } from '../components/forms/index'
import Screen from '../components/Screen';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
    name: Yup.string().when('isRegistering', (isRegistering, schema) => {
        return isRegistering ? schema.required().min(1).label('Name') : schema.optional();
    })
});

interface Props {
    onLogin: () => void;
    isRegistering: boolean;
}

function LoginScreen({ onLogin, isRegistering }: Props) {
    return (
        <Screen style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <AppForm
                initialValues={{ email: '', password: '', name: '', isRegistering }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    onLogin();
                }}
            >
                <>
                    {isRegistering && (
                        <AppFormField
                            name="name"
                            placeholder="Name"
                            autoCapitalize="words"
                            autoCorrect={false}
                        />
                    )}
                    <AppFormField
                        name="email"
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                    />
                    <AppFormField
                        name="password"
                        placeholder="Password"  
                        textContentType="password"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                    />
                    <SubmitButton title={isRegistering ? "Register" : "Login"} />
                </>
            </AppForm>
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