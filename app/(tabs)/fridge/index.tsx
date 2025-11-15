import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';



export default function FridgeScreen() {

    const router = useRouter();

    const [ingredients, setIngredients] = useState([
        {
            id: '1',
            name: '사과',
            quantity: '2개',
            storageDays: '3일 경과',
            memo: '상태 양호함',
        },
        {
            id: '2',
            name: '계란',
            quantity: '10개',
            storageDays: '7일 경과',
            memo: '유통기한 임박',
        },
        {
            id: '3',
            name: '딸기',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '4',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '5',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '6',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '7',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '8',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '9',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '20',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '71',
            name: '우유',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
      ]);

    const renderItem = ({ item }) => (
        <TouchableOpacity>
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemInfo}>
                    수량: {item.quantity} | {item.storageDays}
                </Text>
            </View>
            <Text style={styles.itemMemo}>{item.memo}</Text>
        </View>

        </TouchableOpacity>
      );

    return (
        <View 
            style={styles.container}
        >
            {ingredients.length === 0 ? (
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => router.push('/(tabs)/fridge/addIng')}
            >
                <Ionicons name="add-circle-outline" size={50} color="#00b4d8" />
                <Text style={{ marginTop: 8, fontSize: 18, color: '#555' }}>
                    냉장고를 채워주세요!
                </Text>
            </TouchableOpacity>
            ) : (
                    <View style={styles.dataContainer}>
                    <FlatList
                        // 🔹 실제로 렌더링할 데이터 배열 (여기서는 더미데이터 'ingredients')
                        data={ingredients}

                        // 🔹 각 데이터 항목(item)을 화면에 어떻게 표시할지 정의하는 함수
                        //    → FlatList가 자동으로 반복 렌더링함
                        renderItem={renderItem}

                        // 🔹 각 항목의 고유 key를 지정 (성능 최적화에 필수)
                        //    → key는 문자열이어야 하며, item.id처럼 고유한 값 사용
                        // item은 구조화된 파라미터이기 때문에 이름을 멋대로 변경하면 오류남
                        keyExtractor={(item ) => item.id}

                        // 🔹 FlatList의 전체 콘텐츠 영역에 대한 추가 스타일
                        //    → paddingBottom: 100은 스크롤 시 플로팅 버튼(FAB)과 겹치지 않게 여백 확보
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </View>
              
            )}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/(tabs)/fridge/addIng')}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    dataContainer: {
        marginRight: 20,
        marginLeft: 20,
        width: '100%',
        height: 'auto'
    },
    itemContainer: {
        backgroundColor: '#e9f5ff',
        borderRadius: 10,
        marginRight: 20,
        marginLeft: 20,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#023e8a',
    },
    itemInfo: {
        fontSize: 14,
        color: '#555',
    },
    itemMemo: {
        marginTop: 6,
        fontSize: 13,
        color: '#6c757d',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#caf0f8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
});