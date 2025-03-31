import React from 'react';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppPicker from '../AppPicker';
import ErrorMessages from './ErrorMessages';
import { Props as PickerItemProps } from '../PickerItem';

interface FormValues {
    [key: string]: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    } | undefined;
}

interface Props {
    items: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    }[];
    name: string;
    placeholder: string;
    PickerItemComponent: React.ComponentType<PickerItemProps>;
}

function AppFormPicker({ items, name, placeholder, PickerItemComponent }: Props) {   
    const { errors, setFieldValue, touched, values } = useFormikContext<FormValues>();

    return (
        <>
            <AppPicker
                items={items}
                onSelectItem={(item) => setFieldValue(name, item)}
                placeholder={placeholder}
                selectedItem={values[name]}
                PickerItemComponent={PickerItemComponent}
            />
            {touched[name] && <ErrorMessages error={errors[name] || ''} />}
        </>
    )
}

export default AppFormPicker;