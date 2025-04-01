import React from 'react';
import { View ,TextInput, StyleSheet, Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import defaultStyles from '../config/styles';
interface Props {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    [key: string]: any;
}

function AppTextInput({icon, style, ...otherProps}: Props) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />
            <TextInput 
                placeholderTextColor={colors.medium} 
                style={[defaultStyles.text, styles.textInput, style]} 
                {...otherProps}  
            />
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
        marginVertical: 10,
        alignItems: 'flex-start'
    },
    icon: {
        marginRight: 10,
        marginTop: 8
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        paddingTop: 10,
        paddingBottom: 0,
        textAlignVertical: 'top',
        minHeight: 40
    }
})

export default AppTextInput;