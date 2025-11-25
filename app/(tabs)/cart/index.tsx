import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 목업 데이터 (10개)
const MOCK_CART_ITEMS = [
    { id: '1', name: '사과', source: 'fridge' }, // 냉장고에서 온 재료
    { id: '2', name: '당근', source: 'search' }, // 검색으로 추가한 재료
    { id: '3', name: '양파', source: 'fridge' },
    { id: '4', name: '닭가슴살', source: 'search' },
    { id: '5', name: '계란', source: 'fridge' },
    { id: '6', name: '치즈', source: 'search' },
    { id: '7', name: '양배추', source: 'fridge' },
    { id: '8', name: '마늘', source: 'search' },
    { id: '9', name: '버터', source: 'fridge' },
    { id: '10', name: '두부', source: 'search' },
];

export default function CartScreen() {
    const handleClearCart = () => {
        // 장바구니 초기화 로직
        console.log('장바구니 초기화');
    };

    const handleSearchRecipe = () => {
        // 레시피 탐색 로직
        console.log('레시피 탐색');
    };

    const renderItem = ({ item }: { item: typeof MOCK_CART_ITEMS[0] }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                {item.source === 'fridge' ? (
                    <MaterialCommunityIcons
                        name="fridge-outline"
                        size={24}
                        color="#6b7280"
                    />
                ) : (
                    <Feather
                        name="search"
                        size={24}
                        color="#6b7280"
                    />
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={MOCK_CART_ITEMS}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
                
                {/* 하단 버튼 영역 */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.clearButton]}
                        onPress={handleClearCart}
                    >
                        <Text style={styles.clearButtonText}>장바구니 초기화</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[styles.button, styles.searchButton]}
                        onPress={handleSearchRecipe}
                    >
                        <Text style={styles.searchButtonText}>레시피 탐색</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 100, // 하단 버튼 공간 확보
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        padding: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    itemName: {
        fontSize: 16,
        color: '#111827',
        fontWeight: '500',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        gap: 12,
    },
    button: {
        flex: 1,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButton: {
        backgroundColor: '#9ca3af', // 회색
    },
    searchButton: {
        backgroundColor: '#0095F6', // 인스타그램 파란색
    },
    clearButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
});
