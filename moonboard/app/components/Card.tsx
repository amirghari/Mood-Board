import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppText from './AppText';
import colors from '../config/colors';

interface Props {
    title: string;
    subTitle: string;
    image: ImageSourcePropType;
}

function Card({title, subTitle, image}: Props) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subTitle}>{subTitle}</AppText>    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: Colors.white,
        marginBottom: 20,
        overflow: "hidden"
    },
    detailsContainer: {
        padding: 20
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    title: {
        color: colors.primary,
        marginBottom: 7,
        fontWeight: "bold",
        fontSize: 20
    },
    subTitle : {
        color: colors.secondary,
    }
});

export default Card;