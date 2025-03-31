import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from './AppButton';

function SubmitButton({ title }: { title: string }) {
    const { handleSubmit } = useFormikContext();

    return (
        <AppButton title={title} onPress={handleSubmit} color="primary" />
    );
}

export default SubmitButton;
