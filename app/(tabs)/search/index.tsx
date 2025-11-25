import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
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
