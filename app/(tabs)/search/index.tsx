import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Search</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.placeholder}>검색 기능이 곧 추가됩니다.</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: 12,
        paddingBottom: 16,
        alignItems: 'center',
    },
    headerText: {
        fontSize: 36,
        fontFamily: 'CedarvilleCursive_400Regular',
        color: '#111827',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    placeholder: {
        fontSize: 16,
        color: '#6b7280',
    },
});
