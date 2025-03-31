import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import AppText from '../components/AppText';
import colors from '../config/colors';

function ListingDetailsScreen(props: any) {
    return (
        <View>
            <Image style={styles.image} source={require("../assets/background.jpg")}/>
            <View style={styles.detailContainer}>
                <AppText style={styles.title}>xxx</AppText>
                <AppText style={styles.mood}>Hiegr</AppText>
                <View style={styles.userContainer}>
                    <ListItem 
                        image={require("../assets/background.jpg")}
                        title="Amirghari"
                        subTitle="5 Journals"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover'
    },
    detailContainer: {
        padding: 20,
        width: '100%'
    },
    title: {
        fontSize: 24,
        fontWeight: "500",
        color: colors.primary
    },
    mood: {
        color: colors.secondary,
        fontWeight: "bold",
        fontSize: 20,
        marginVertical: 10
    },
    userContainer: {
        marginVertical: 50,
    }
});

export default ListingDetailsScreen;