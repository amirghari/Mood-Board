import React from 'react';
import { View , StyleSheet, TouchableWithoutFeedback, Modal, Button, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import Screen from './Screen';
import colors from '../config/colors';
import AppText from './AppText';
import PickerItem from './PickerItem';

interface Props {
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    [key: string]: any;
    placeholder: string;
    items: {label: string, value: number}[];
    onSelectItem: (item: {label: string, value: number}) => void;
    selectedItem?: {label: string, value: number};
}

function AppPicker({icon, placeholder, items, onSelectItem, selectedItem}: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />
                    <AppText style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</AppText>
                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors.medium} style={styles.icon} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
                <Screen>
                    <Button title='Close' onPress={() => setModalVisible(false)} />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({item}) => <PickerItem item={item.label} onPress={() => {
                            setModalVisible(false);
                            onSelectItem(item);
                        }} />}
                    />
                </Screen>
            </Modal>
        </>
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
    icon: {
        marginRight: 10
    },
    text: {
        flex: 1
    }
})

export default AppPicker;