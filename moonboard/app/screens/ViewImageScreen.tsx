import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import colors from '../config/colors';

function ViewImageScreen(props: any) {

    return (
        <View style={styles.cotainer}>
            <View style={styles.closeIcon}>
                <MaterialCommunityIcons size={35} name='close' color={colors.white} />
            </View>
            <View style={styles.deleteIcon}>
            <MaterialCommunityIcons size={35} name='trash-can-outline' color={colors.white} />

            </View>
            <Image resizeMode='contain' style={styles.image} source={require("../assets/tree.jpg")} />;
        </View>
    )

}

const styles = StyleSheet.create({
    deleteIcon: {
        position: "absolute",
        top: 40,
        right: 30
    },
    closeIcon: {
        position: "absolute",
        top: 40,
        left: 30
    },
    cotainer: {
        backgroundColor: colors.black,
        flex:1
    },
    image: {
        width: "100%",
        height: "100%"
    }
});

export default ViewImageScreen;