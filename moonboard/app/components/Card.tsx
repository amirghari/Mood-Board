import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppText from './AppText';
import colors from '../config/colors';

interface Props {
    title: string;
    subTitle: string;
    image: ImageSourcePropType;
    username: string;
    date: string;
}

function Card({title, subTitle, image, username, date}: Props) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <View style={styles.headerRow}>
                    <AppText style={styles.title}>{title}</AppText>
                    <View style={styles.userInfo}>
                        <MaterialCommunityIcons name="account" size={16} color={colors.medium} />
                        <AppText style={styles.username}>{username}</AppText>
                    </View>
                </View>
                <View style={styles.footerRow}>
                    <View style={styles.moodInfo}>
                        <MaterialCommunityIcons name="emoticon" size={16} color={colors.medium} />
                        <AppText style={styles.subTitle}>{subTitle}</AppText>
                    </View>
                    <View style={styles.dateInfo}>
                        <MaterialCommunityIcons name="calendar" size={16} color={colors.medium} />
                        <AppText style={styles.date}>{date}</AppText>
                    </View>
                </View>
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
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 20,
        flex: 1,
        marginRight: 10
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        marginLeft: 15,

    },
    username: {
        color: colors.medium,
        fontSize: 14,
        marginLeft: 15
    },
    moodInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateInfo: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    subTitle: {
        color: colors.secondary,
        marginLeft: 5
    },
    date: {
        color: colors.medium,
        marginLeft: 5,
        fontSize: 14
    }
});

export default Card;