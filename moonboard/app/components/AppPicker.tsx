import React from 'react';
import { View , StyleSheet, TouchableWithoutFeedback, Modal, FlatList} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';

import Screen from './Screen';
import colors from '../config/colors';
import AppText from './AppText';
import PickerItem, { Props as PickerItemProps } from './PickerItem';
import AppButton from './AppButton';

interface Props {
    icon?: keyof typeof MaterialCommunityIcons.glyphMap;
    [key: string]: any;
    placeholder: string;
    PickerItemComponent: React.ComponentType<PickerItemProps>;
    items: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    }[];
    onSelectItem: (item: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    }) => void;
    selectedItem?: {
        label: string;
        value: number;
        backgroundColor: string;
        icon: keyof typeof MaterialCommunityIcons.glyphMap;
    };
}

function AppPicker({icon, placeholder, items, onSelectItem, selectedItem, PickerItemComponent = PickerItem }: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.container}>
                    <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />
                    {selectedItem ? (
                        <AppText style={styles.text}>{selectedItem.label}</AppText>
                    ) : (
                        <AppText style={styles.placeholder}>{placeholder}</AppText>
                    )}
                    <MaterialCommunityIcons name="chevron-down" size={20} color={colors.medium} style={styles.icon} />
                </View>
            </TouchableWithoutFeedback>
            <Modal visible={modalVisible} animationType='slide'>
                <Screen style={styles.modal}>
                    <AppButton title='Close' onPress={() => setModalVisible(false)} color="secondary" />
                    <FlatList
                        data={items}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({item}) => <PickerItemComponent item={item} onPress={() => {
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
    },
    placeholder: {
        flex: 1,
        color: colors.medium
    },
    modal: {
        marginHorizontal: 20
    }
})

export default AppPicker;