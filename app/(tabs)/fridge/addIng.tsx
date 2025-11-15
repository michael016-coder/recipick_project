import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AddIngredientScreen() {
    const router = useRouter();

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#f4f4f4',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ fontSize: 20, marginBottom: 20 }}>재료 추가 화면입니다</Text>

            <TouchableOpacity
                onPress={() => router.back()}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                    backgroundColor: '#7cb342',
                    borderRadius: 8,
                }}
            >
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={{ color: '#fff', marginLeft: 8 }}>돌아가기</Text>
            </TouchableOpacity>
        </View>
    );
}
