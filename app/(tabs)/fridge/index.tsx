import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INGREDIENT_DATABASE = [
    '사과',
    '배',
    '딸기',
    '블루베리',
    '당근',
    '양파',
    '대파',
    '닭가슴살',
    '돼지고기',
    '쇠고기',
    '계란',
    '버터',
    '치즈',
    '두부',
    '양배추',
    '양상추',
    '애호박',
    '감자',
    '고구마',
    '마늘',
];
//손가락 제스쳐 핸들러
//
import { SwipeListView } from 'react-native-swipe-list-view';


import EditFridgeIng from '@/components/modals/editFridgeIng';


export default function FridgeScreen() {
    
    
    const router = useRouter();
    
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const openEditModal = () => {
        setIsEditModalVisible(true);
    };
    
    
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
            quantity: '1팩',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
      ]);

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [quantityCount, setQuantityCount] = useState(1);
    const [memoText, setMemoText] = useState('');
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const filteredIngredients = useMemo(() => {
        if (!searchQuery.trim()) {
            return INGREDIENT_DATABASE;
        }
        const normalized = searchQuery.trim().toLowerCase();
        return [...INGREDIENT_DATABASE]
            .filter((item) => item.toLowerCase().includes(normalized))
            .sort((a, b) => {
                const aIdx = a.toLowerCase().indexOf(normalized);
                const bIdx = b.toLowerCase().indexOf(normalized);
                if (aIdx === bIdx) {
                    return a.localeCompare(b, 'ko');
                }
                return aIdx - bIdx;
            });
    }, [searchQuery]);

    const openDetailPopup = (name: string) => {
        setSelectedIngredient(name);
        setQuantityCount(1);
        setMemoText('');
        setIsSearchVisible(false);
        setIsDetailVisible(true);
    };

    const handleConfirmSelection = () => {
        if (!selectedIngredient) return;
        const newItem = {
            id: Date.now().toString(),
            name: selectedIngredient,
            quantity: `${quantityCount}개`,
            storageDays: '오늘 등록',
            memo: memoText.trim() || '메모 없음',
        };
        setIngredients((prev) => [newItem, ...prev]);
        setIsDetailVisible(false);
        setSelectedIngredient(null);
        setIsSearchVisible(true);
        setSearchQuery('');
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemInfo}>
                    수량: {item.quantity} | {item.storageDays}
                </Text>
            </View>
            <Text style={styles.itemMemo}>{item.memo}</Text>
        </View>
      );
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '4',
            name: '우유1',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '5',
            name: '우유2',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '6',
            name: '우유3',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '7',
            name: '우유4',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '8',
            name: '우유5',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '9',
            name: '우유6',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '10',
            name: '우유7',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
        {
            id: '11',
            name: '우유8',
            quantity: '1L',
            storageDays: '1일 경과',
            memo: '개봉 후 냉장보관',
        },
    ]);
    

 
    
    
    function closeItem(rowMap, rowKey) {
        if (rowMap[rowKey]) {
            console.log(rowKey);
            rowMap[rowKey].closeRow();
        }
    }
    
    
    function deleteIng(ingredients, setIngredients, rowMap, rowItemId) {
        closeItem(rowMap, rowItemId);
        const newData = [...ingredients];
        const prevIndex = ingredients.findIndex(item => item.id === rowItemId);
        console.log(ingredients[prevIndex]);
        console.log(rowItemId); 
        console.log(rowMap[rowItemId]);
        newData.splice(prevIndex, 1);
        setIngredients(newData);
    }
    
    
    1
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.headerText}>MyFridge</Text>
            </View>
        <View 
        style={styles.container}
        >
            {ingredients.length === 0 ? (
                <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => setIsSearchVisible(true)}
            >
                <Ionicons name="add-circle-outline" size={50} color="#00b4d8" />
                <Text style={{ marginTop: 8, fontSize: 18, color: '#555' }}>
                    냉장고를 채워주세요!
                </Text>
            </TouchableOpacity>
            ) : ( 

                <View style={styles.SwipeListContainer}>
                         <SwipeListView 
                            keyExtractor={(item) => item.id}
                            data={ingredients}
                            renderItem={(data, rowMap) => (
                                <View style={styles.itemContainer}>
                                <TouchableOpacity  
                                
                                        onPress={openEditModal}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.itemName}>{data.item.name}</Text>
                                        <Text style={styles.itemInfo}>
                                            수량: {data.item.quantity} | {data.item.storageDays}
                                        </Text>
                                    </View>
                                    <Text style={styles.itemMemo}>{data.item.memo}</Text>
                                </TouchableOpacity>                             
                                </View>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View style = {styles.hiddenItemContainer}>
                                    <TouchableOpacity style = {styles.deleteButton}
                                        onPress={() => deleteIng(ingredients, setIngredients, rowMap, data.item.id)}
                        
                                    >
                                        <Text style={styles.deleteText}>삭제</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            disableRightSwipe={true}
                            rightOpenValue={-75}                  
                            friction={200}
                            tension={200}

                        />
              </View>


            )}
            <EditFridgeIng isEditModalVisible={isEditModalVisible} setIsEditModalVisible={setIsEditModalVisible}/>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsSearchVisible(true)}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>

            <Modal visible={isSearchVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.searchModal}>
                        <View style={styles.searchHeader}>
                            <Text style={styles.searchTitle}>재료 추가하기</Text>
                            <TouchableOpacity onPress={() => setIsSearchVisible(false)}>
                                <Ionicons name="close" size={22} color="#6b7280" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchInputRow}>
                            <Ionicons name="search" size={18} color="#9ca3af" style={{ marginRight: 6 }} />
                            <TextInput
                                style={styles.searchInput}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                placeholder="재료 이름을 입력하세요"
                                placeholderTextColor="#9ca3af"
                                returnKeyType="search"
                                onSubmitEditing={() => {
                                    if (filteredIngredients.length > 0) {
                                        openDetailPopup(filteredIngredients[0]);
                                    }
                                }}
                            />
                        </View>
                        <FlatList
                            data={filteredIngredients}
                            keyExtractor={(item) => item}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.suggestionItem}
                                    onPress={() => openDetailPopup(item)}
                                >
                                    <Text style={styles.suggestionText}>{item}</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={styles.emptySuggestion}>검색 결과가 없습니다</Text>
                            }
                        />
                    </View>
                </View>
            </Modal>

            <Modal visible={isDetailVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.detailModal}>
                        <Text style={styles.detailTitle}>
                            {selectedIngredient ? `${selectedIngredient}` : '재료 선택'}
                        </Text>
                        <View style={styles.quantityRow}>
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setQuantityCount((prev) => Math.max(1, prev - 1))}
                            >
                                <Text style={styles.counterText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantityCount}</Text>
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setQuantityCount((prev) => prev + 1)}
                            >
                                <Text style={styles.counterText}>+</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={styles.memoInput}
                            value={memoText}
                            onChangeText={setMemoText}
                            placeholder="메모를 입력하세요 (선택)"
                            placeholderTextColor="#9ca3af"
                            multiline
                        />
                        <View style={styles.detailButtons}>
                            <TouchableOpacity
                                style={[styles.detailButton, styles.cancelButton]}
                                onPress={() => {
                                    setIsDetailVisible(false);
                                    setSelectedIngredient(null);
                                    setIsSearchVisible(true);
                                }}
                            >
                                <Text style={styles.cancelText}>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.detailButton, styles.selectButton]}
                                onPress={handleConfirmSelection}
                            >
                                <Text style={styles.selectText}>선택</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        borderBottomWidth: 0,
    },
    headerText: {
        fontSize: 36,
        fontFamily: 'CedarvilleCursive_400Regular',
        color: '#111827',
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    dataContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    itemContainer: {
        backgroundColor: '#e9f5ff',
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    SwipeListContainer : {
        paddingHorizontal: 20, // 전체 여백
        marginBottom: 20,
        width: "100%",
    },
    itemContainer: {
        backgroundColor: '#e9f5ff',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    searchModal: {
        width: '100%',
        maxHeight: '75%',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 20,
    },
    searchHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    searchTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    searchInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1f2937',
    },
    suggestionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    suggestionText: {
        fontSize: 16,
        color: '#111827',
    },
    emptySuggestion: {
        textAlign: 'center',
        color: '#9ca3af',
        paddingVertical: 20,
    },
    detailModal: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#111827',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    counterButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#eef2ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 20,
        color: '#4f46e5',
        fontWeight: '600',
    },
    quantityText: {
        fontSize: 22,
        fontWeight: '700',
        marginHorizontal: 24,
        color: '#1f2937',
    },
    memoInput: {
        height: 80,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 12,
        textAlignVertical: 'top',
        fontSize: 15,
        color: '#374151',
        marginBottom: 20,
        backgroundColor: '#f9fafb',
    },
    detailButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailButton: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f3f4f6',
        marginRight: 12,
    },
    selectButton: {
        backgroundColor: '#4f46e5',
    },
    cancelText: {
        color: '#4b5563',
        fontSize: 16,
        fontWeight: '600',
    },
    selectText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

   hiddenItemContainer: {
       alignItems: "center",
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'flex-end',
       marginTop: 10,
   },
   deleteButton: {
       backgroundColor: '#f44336',
       alignItems: 'center',
       bottom: 0,
       justifyContent: 'center',
       position: 'absolute',
       top: 0,
       width: 75,
       borderRadius: 8,

   },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    popup: {
        position: "absolute",
        top: "25%",
        left: "10%",
        width: "80%",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 3 },
      },
});