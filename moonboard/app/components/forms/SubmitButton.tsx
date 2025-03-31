import React from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet } from 'react-native';

import AppButton from '../AppButton';
import colors from '../../config/colors';

function SubmitButton({ title }: { title: string }) {
    const { handleSubmit } = useFormikContext();

    return (
        <AppButton title={title} onPress={handleSubmit} color="primary" />
    );
}

const styles = StyleSheet.create({
    button: {
        color: colors.white,
    }
});

export default SubmitButton;

