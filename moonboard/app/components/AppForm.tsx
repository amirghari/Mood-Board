import React from 'react';
import { Formik } from 'formik';

interface Props {
    initialValues: any;
    onSubmit: (values: any) => void;
    validationSchema: any;
    children: React.ReactNode;
}

function AppForm({ initialValues, onSubmit, validationSchema, children }: Props) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <>{children}</>}
        </Formik>
    );
}

export default AppForm;
