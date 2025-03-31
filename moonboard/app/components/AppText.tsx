import React from 'react';
import { Text, TextStyle } from 'react-native';

import defaultStyles from '../config/styles';

interface Props {
    children: string;
    style?: TextStyle;
}

function AppText({ children, style }: Props) {
    return (
        <Text style={[defaultStyles.text, style]}>{children}</Text>
    );
}


export default AppText;