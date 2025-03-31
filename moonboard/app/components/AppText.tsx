import React from 'react';
import { Text, TextStyle } from 'react-native';

import defaultStyles from '../config/styles';

interface Props {
    children: string | ((errorMessage: string) => React.ReactNode);
    style?: TextStyle;
}

function AppText({ children, style }: Props) {
    return (
        <Text style={[defaultStyles.text, style]}>{typeof children === 'function' ? children('') : children}</Text>
    );
}

export default AppText;