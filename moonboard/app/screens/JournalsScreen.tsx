import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

interface Props {
    user: {
        id: string;
        username: string;
        name?: string;
    };
    onLogout: () => void;
}

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function JournalsScreen({ user, onLogout }: Props) {
    const [entries, setEntries] = React.useState<JournalEntry[]>([]);

    React.useEffect(() => {
        // TODO: Fetch journal entries from the API
        console.log('JournalsScreen: Fetching entries for user:', user.id);
    }, [user.id]);

    const renderEntry = ({ item }: { item: JournalEntry }) => (
        <View style={styles.entry}>
            <AppText style={styles.entryTitle}>{item.title}</AppText>
            <AppText style={styles.entryContent}>{item.content}</AppText>
            <AppText style={styles.entryDate}>
                {new Date(item.createdAt).toLocaleDateString()}
            </AppText>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText style={styles.title}>My Journal</AppText>
                <AppButton
                    title="New Entry"
                    onPress={() => {
                        // TODO: Navigate to new entry screen
                        console.log('JournalsScreen: Creating new entry');
                    }}
                    color="primary"
                />
            </View>
            <FlatList
                data={entries}
                renderItem={renderEntry}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    list: {
        flexGrow: 1,
    },
    entry: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    entryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    entryContent: {
        fontSize: 16,
        marginBottom: 10,
    },
    entryDate: {
        fontSize: 14,
        color: '#666',
    },
}); 