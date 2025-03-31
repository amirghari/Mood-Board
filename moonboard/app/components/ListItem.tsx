import React from 'react';
import { ImageSourcePropType, View, StyleSheet, Image } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';

interface Props {
    title: string;
    subTitle: string;
    image: ImageSourcePropType;
}

function ListItem({title, subTitle, image}: Props) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10
    },
    title: {
        fontWeight: 500
    },
    subTitle: {
        color: colors.medium,
    }
})

export default ListItem;