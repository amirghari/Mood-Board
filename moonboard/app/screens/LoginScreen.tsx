// app/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';

interface FormValues {
  username: string;
  password: string;
  name: string;
}

interface Props {
  onLogin: (token: string, user: any) => void; // e.g., navigate to next screen
}

export default function LoginScreen({ onLogin }: Props) {
  const [localRegister, setLocalRegister] = useState(false);
  const { login, register, loading, error } = useAuth();

  // Here we add a custom test for name: if localRegister is true, it must be filled
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required'),

    // Name is enforced if localRegister is toggled true
    name: Yup.string()
      .test('name-required-if-registering', 'Name is required', function (value) {
        // "this.parent" references all form values, but we can also just use localRegister from closure
        if (localRegister && (!value || value.trim().length === 0)) {
          return false;
        }
        return true;
      }),
  });

  const handleSubmit = async (values: FormValues) => {
    console.log('Form submitted:', values, 'localRegister =', localRegister);

    try {
      let response;
      if (localRegister) {
        console.log('Registering...');
        response = await register(values.username, values.password, values.name);
      } else {
        console.log('Logging in...');
        response = await login(values.username, values.password);
      }
      console.log('Auth successful:', response);
      onLogin(response.token, response.user);
    } catch (err) {
      console.error('Auth error:', err);
      // error is also handled by the useAuth hook’s "error" state
    }
  };

  return (
    <Screen style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <AppText style={styles.title}>
        {localRegister ? 'Create Account' : 'Welcome Back'}
      </AppText>

      <AppForm
        initialValues={{ username: '', password: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <>
          {localRegister && (
            <AppFormField
              name="name"
              placeholder="Full Name"
              autoCapitalize="words"
              icon="account"
            />
          )}
          <AppFormField
            name="username"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            icon="email"
          />
          <AppFormField
            name="password"
            placeholder="Password"
            icon="lock"
            secureTextEntry
          />

          {error && <AppText style={styles.error}>{error}</AppText>}

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <SubmitButton title={localRegister ? 'Register' : 'Login'} />
          )}
        </>
      </AppForm>

      {/* Toggle button to switch between register and login */}
      <AppButton
        title={
          localRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"
        }
        onPress={() => setLocalRegister(!localRegister)}
        color="primary"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 200,
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
  },
});