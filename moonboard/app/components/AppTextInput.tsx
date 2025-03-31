import React from 'react';
import { View ,TextInput, StyleSheet, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

interface Props {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    [key: string]: any;
}

function AppTextInput({icon, ...otherProps}: Props) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />
            <TextInput style={styles.textInput} {...otherProps}  />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,  
        borderRadius: 25,
        flexDirection: 'row',
        width: '100%',
        padding: 15,
        marginVertical: 10
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        color: colors.dark
    },
    icon: {
        marginRight: 10
    }
})

export default AppTextInput;