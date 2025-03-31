import React from 'react';
import { ImageSourcePropType, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

import AppText from './AppText';
import colors from '../config/colors';

interface Props {
    title: string;
    subTitle: string;
    image?: ImageSourcePropType;
    IconComponent?: React.ComponentType<any>;
    onPress?: () => void;
    renderRightActions?: () => React.ReactElement;
}

function ListItem({title, subTitle, image, IconComponent, onPress, renderRightActions}: Props) {
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <TouchableHighlight underlayColor={colors.white} onPress={onPress}>
                <View style={styles.container}>
                    {IconComponent && <IconComponent />}
                    {image && <Image style={styles.image} source={image} />}
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{title}</AppText>
                        {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: colors.white
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: 500
    },
    subTitle: {
        color: colors.medium,
    },
    detailsContainer: {
        marginLeft: 10,
        justifyContent: 'center'
    }
});

export default ListItem;