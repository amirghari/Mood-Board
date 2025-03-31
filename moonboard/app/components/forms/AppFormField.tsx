import React from 'react';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons, AntDesign  } from '@expo/vector-icons';

import AppTextInput from '../AppTextInput';
import ErrorMessages from './ErrorMessages';

interface FormValues {
    [key: string]: string;
}

interface Props {
    name: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    [key: string]: any;
}

function AppFormField({ name, icon, ...otherProps }: Props) {  
    const { setFieldTouched, handleChange, errors, touched } = useFormikContext<FormValues>();

    return (
        <>
            <AppTextInput
                icon={icon || "email"}
                onChangeText={handleChange(name)}
                onBlur={() => setFieldTouched(name)}
                {...otherProps}
            />
             {touched[name] && <ErrorMessages error={errors[name] || ''}  />}
        </>
    );
}

export default AppFormField;
