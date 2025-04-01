import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';
import AppText from './AppText';

interface Props {
    activeTab: string;
    onTabPress: (tab: string) => void;
}

function BottomMenu({ activeTab, onTabPress }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => onTabPress('feed')}
            >
                <MaterialCommunityIcons 
                    name="format-list-bulleted" 
                    size={24} 
                    color={activeTab === 'feed' ? colors.primary : colors.medium} 
                />
                <AppText style={{ ...styles.tabText, ...(activeTab === 'feed' ? styles.activeTabText : {}) }}>
                    Feed
                </AppText>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => onTabPress('plus')}
            >
                <MaterialCommunityIcons 
                    name="plus-circle" 
                    size={24} 
                    color={activeTab === 'plus' ? colors.primary : colors.medium} 
                />
                <AppText style={{ ...styles.tabText, ...(activeTab === 'plus' ? styles.activeTabText : {}) }}>
                    New
                </AppText>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.tab} 
                onPress={() => onTabPress('account')}
            >
                <MaterialCommunityIcons 
                    name="account" 
                    size={24} 
                    color={activeTab === 'account' ? colors.primary : colors.medium} 
                />
                <AppText style={{ ...styles.tabText, ...(activeTab === 'account' ? styles.activeTabText : {}) }}>
                    Account
                </AppText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: colors.light,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tab: {
        alignItems: 'center',
        padding: 5,
    },
    tabText: {
        fontSize: 12,
        color: colors.medium,
        marginTop: 2,
    },
    activeTabText: {
        color: colors.primary,
    },
});

export default BottomMenu; 