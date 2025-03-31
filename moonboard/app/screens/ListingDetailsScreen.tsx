import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import AppText from '../components/AppText';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';

interface Props {
    onBack: () => void;
}

function ListingDetailsScreen({ onBack }: Props) {
    return (
        <Screen>
            <View style={styles.container}>
                <AppButton title="Back" onPress={onBack} color="primary" />
            </View>
            <Image style={styles.image} source={require("../assets/background.jpg")}/>
            <View style={styles.detailContainer}>
                <AppText style={styles.title}>xxx</AppText>
                <AppText style={styles.mood}>Hiegr</AppText>
                <View style={styles.userContainer}>
                    <ListItem 
                        image={require("../assets/user.png")}
                        title="Amirghari"
                        subTitle="5 Journals"
                    />
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 340,
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
    },
    container: {
        padding: 10,
    }
});

export default ListingDetailsScreen;