import React from 'react';
import { StyleSheet } from 'react-native';
import { ErrorMessageProps } from 'formik';

import AppText from '../AppText';

interface Props {
    error: string;
}

function ErrorMessages({ error }: Props) {
    if (!error) return null;

    return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
});

export default ErrorMessages;
