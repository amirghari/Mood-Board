import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Screen from '../components/Screen';
import ErrorMessages from '../components/ErrorMessages';
import AppFormField from '../components/AppFormField';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen() {

    return (
        <Screen style={styles.container}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <AppForm
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log(values)}
            >
                <>
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
                        <SubmitButton title="Login" />
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