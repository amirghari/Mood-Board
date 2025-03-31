import React from 'react';
import Screen from '../components/Screen';
import { FlatList, StyleSheet } from 'react-native';
import Card from '../components/Card';
import colors from '../config/colors';
const journals = [
    {
        id: 1,
        title: "Journal 1",
        mood: "Happy",
        image: require('../assets/journal1.jpg')
    },
    {
        id: 2,
        title: "Journal 2",
        mood: "Sad",
        image: require('../assets/journal2.jpg')
    }
]

function Journals(props: any) {
    return (
        <Screen style={styles.screen}>
            <FlatList
                data={journals}
                keyExtractor={journal => journal.id.toString()}
                renderItem={({item}) => (
                    <Card
                        title={item.title}
                        subTitle={item.mood}
                        image={item.image}
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        marginHorizontal: 10,
    }
})

export default Journals;