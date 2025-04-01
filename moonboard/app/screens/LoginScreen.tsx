import React, { useState } from 'react';
import { Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';

import { AppForm, AppFormField, SubmitButton } from '../components/forms/index'
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

interface FormValues {
    username: string;
    password: string;
    name: string;
    isRegistering: boolean;
}

interface Props {
    onLogin: (token: string, user: any) => void;
    isRegistering: boolean;
}

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required'),
    name: Yup.string()
        .when('isRegistering', (isRegistering, schema) => {
            return isRegistering
                ? schema.required('Name is required for registration')
                : schema.optional();
        })
});

export default function LoginScreen() {
    const [isRegistering, setIsRegistering] = useState(false);
    const { login, register, loading, error } = useAuth();

    const handleSubmit = async (values: FormValues) => {
        console.log('LoginScreen: Form submitted:', values);
        try {
            if (isRegistering) {
                console.log('LoginScreen: Attempting registration...');
                const response = await register(values.username, values.password, values.name);
                console.log('LoginScreen: Registration response:', response);
            } else {
                console.log('LoginScreen: Attempting login...');
                const response = await login(values.username, values.password);
                console.log('LoginScreen: Login response:', response);
            }
        } catch (error) {
            console.error('LoginScreen: Error during submission:', error);
        }
    };

    return (
        <Screen style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <AppText style={styles.title}>
                {isRegistering ? 'Create Account' : 'Welcome Back'}
            </AppText>
            <AppForm
                initialValues={{ username: '', password: '', name: '', isRegistering: false }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <AppFormField
                    name="username"
                    placeholder="Email"
                    icon="email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <AppFormField
                    name="password"
                    placeholder="Password"
                    icon="lock"
                    secureTextEntry
                />
                {isRegistering && (
                    <AppFormField
                        name="name"
                        placeholder="Full Name"
                        icon="account"
                        autoCapitalize="words"
                    />
                )}
                {error && <AppText style={styles.error}>{error}</AppText>}
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    <SubmitButton title={isRegistering ? 'Register' : 'Login'} />
                )}
                <AppButton
                    title={isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
                    onPress={() => setIsRegistering(!isRegistering)}
                    color="primary"
                />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    error: {
        color: colors.danger,
        textAlign: 'center',
        marginBottom: 10,
    }
});