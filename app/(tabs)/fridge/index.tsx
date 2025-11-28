import EditFridgeIng from '@/components/modals/editFridgeIng';
import { searchRequest } from '@/src/api/search';
import useFridgeStore from '@/src/stores/fridgeStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';


//손가락 제스쳐 핸들러
//


export default function FridgeScreen() {
    
    
  

    // 검색 화면, 재료 추가화면 관련 state, event func
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
    const [quantityCount, setQuantityCount] = useState(1);
    const [memoText, setMemoText] = useState('');
    const [isDetailVisible, setIsDetailVisible] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
    // [추가] 상세 팝업 선택 시 저장할 ID State (냉장고 추가 시 필요)
    const [selectedIngredientId, setSelectedIngredientId] = useState(null);

    const ingredients = useFridgeStore((state) => state.ingredients);
    const isLoading = useFridgeStore((state) => state.isLoading);
    const refreshIngredients = useFridgeStore((state) => state.refreshIngredients);
    const removeIngredientItem = useFridgeStore((state) => state.removeIngredientItem);
    const loadMoreIngredients = useFridgeStore((state) => state.loadMoreIngredients);
    const updateIngredientItems = useFridgeStore((state) => state.updateIngredientItems);
    const addIngredientItem = useFridgeStore((state) => state.addIngredientItem);


    useEffect(() => {
        refreshIngredients();
    }, []);



    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            Alert.alert("알림", "검색어를 입력해주세요.");
            return;
        }

        try {
            // API 호출 (searchQuery 전달)
            const response = await searchRequest(searchQuery);

            // 응답 데이터: [{ "id": 1, "name": "당근" }, ...]
            setSearchResults(response);

        } catch (error) {
            console.error("검색 실패:", error);
            // 에러 처리 (빈 배열로 초기화 등)
            setSearchResults([]);
        }
    };

    const openDetailPopup = (item) => {
        // item: { id: 0, name: "string" }
        setSelectedIngredient(item.name); // 화면 표시용 이름
        setSelectedIngredientId(item.id); // [중요] 나중에 API 전송할 때 쓸 ID 저장
        setQuantityCount(1);
        setMemoText('');
        setIsSearchVisible(false); // 검색 모달 닫기
        setIsDetailVisible(true);  // 상세 입력 모달 열기
    };

    const handleConfirmSelection = async () => {
        // ID가 없으면 로직 중단 (방어 코드)
        if (!selectedIngredientId) {
            console.error("재료 ID가 없습니다.");
            return;
        }

        try {
            // API 요청 데이터 구성 (필드명 매핑)
            const ingredientData = {
                ingredientId: selectedIngredientId, // API: ingredientId <-> State: selectedIngredientId
                count: quantityCount,               // API: count        <-> State: quantityCount
                memo: memoText                      // API: memo         <-> State: memoText
            };

            // Store 함수 호출 (서버 전송 -> 성공 시 목록 새로고침됨)
            await addIngredientItem(ingredientData);

            // 모달 닫기 및 초기화
            setIsDetailVisible(false);
            setSelectedIngredient(null);
            setSelectedIngredientId(null);

            // UX 옵션: 성공 후 검색창을 다시 띄울지, 아예 닫을지 결정
            // setIsSearchVisible(true); // 계속 추가하려면 이 줄을 사용
        } catch (error) {
            console.error("재료 추가 실패:", error);
            // Alert.alert("오류", "재료 추가에 실패했습니다.");
        }
    };

    

    //편집모달 state
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    //편집 모달에 전달할 임시 데이터 관리 state
    const [selectedItem, setSelectedItem] = useState<any>(null);
    
    // 편집모달 띄우기
    const openEditModal = (ItemId) => {
        console.log("선택된 ID:", ItemId);

        // [변경] id -> fridgeIngredientId 로 찾기
        const item = ingredients.find(item => item.fridgeIngredientId === ItemId);

        // 2. 찾은 item에서 필요한 필드만 추출 (필드명 매핑 수정)
        if (item) {
            const data = {
                id: item.fridgeIngredientId,    // 기존 id -> fridgeIngredientId
                name: item.ingredientName,      // 기존 name -> ingredientName
                quantity: item.count,           // 기존 quantity -> count
                memo: item.memo,                // memo는 동일
                // 필요하다면 유통기한 등 추가 정보도 여기에 포함
                storagePeriod: item.storagePeriod
            };
            console.log("매핑된 데이터:", data);

            setSelectedItem(data);
            setIsEditModalVisible(true);
        }
    };
    
    const handleSaveChnage = async (updatedItemField) => {
        try {
            // 1. API 요청 규격에 맞게 데이터 변환
            // (편집 모달에서는 id, quantity, memo로 관리했지만, 서버는 아래 필드명을 원함)
            const requestData = {
                fridgeIngredientId: updatedItemField.id,
                count: updatedItemField.quantity,
                memo: updatedItemField.memo
            };

            // 2. Store 함수 호출
            // updateIngredientItems는 '일괄 수정'을 위해 배열([])을 인자로 받습니다.
            // 하나만 수정하더라도 배열에 담아서 보내야 합니다.
            await updateIngredientItems([requestData]);

            // 3. 성공 시 모달 닫기 
            // (Store 함수 내부에서 API 성공 후 refreshIngredients()를 호출하므로 목록은 자동 갱신됨)
            setIsEditModalVisible(false);

        } catch (error) {
            console.error("재료 수정 실패:", error);
            // Alert.alert("수정 실패", "잠시 후 다시 시도해주세요.");
        }
    };

    
    // SWIPE LIST에서 삭제 버튼 관련 이벤트
    function closeItem(rowMap, rowKey) {
        // 키가 숫자로 들어올 수 있으므로 문자열로 안전하게 변환하여 접근
        const keyString = String(rowKey);
        if (rowMap[keyString]) {
            console.log("닫는 Row Key:", keyString);
            rowMap[keyString].closeRow();
        }
    }
    
    
    const deleteIng = async (rowMap, rowItemId) => {
        // 1. UI 처리: 먼저 스와이프된 행을 닫습니다.
        closeItem(rowMap, rowItemId);

        // 2. 데이터 처리: 로컬 배열 splice 대신 Store의 삭제 함수 호출
        // (기존 코드의 prevIndex 찾기 및 splice 로직은 제거됨)
        try {
            console.log("삭제 요청 ID:", rowItemId);

            // zustand store의 비동기 삭제 함수 실행
            // 이 함수가 실행되면 서버 DB에서 삭제되고, 성공 시 목록이 새로고침 됩니다.
            await removeIngredientItem(rowItemId);

        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            // 필요 시 Alert.alert("오류", "삭제에 실패했습니다.");
        }
    };
    
    1
    
    return (
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
                            keyExtractor={(item) => String(item.fridgeIngredientId)}
                            extraData={ingredients}
                            data={ingredients}
                            renderItem={(data, rowMap) => (
                                <View style={styles.itemContainer}>
                                    <TouchableOpacity
                                        onPress={() => openEditModal(data.item.fridgeIngredientId)}
                                    >
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Text style={styles.itemName}>
                                                {data.item.ingredientName}
                                            </Text>
                                            <Text style={styles.itemInfo}>
                                                수량: {data.item.count} | {data.item.storagePeriod}
                                            </Text>
                                        </View>
                                        <Text style={styles.itemMemo}>{data.item.memo}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderHiddenItem={(data, rowMap) => (
                                <View style={styles.hiddenItemContainer}>
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() =>
                                            deleteIng(rowMap, data.item.fridgeIngredientId)
                                        }
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

            {selectedItem && (
                <EditFridgeIng
                    visible={isEditModalVisible}

                    // openEditModal에서 매핑한 필드명 사용 (좌: Props, 우: State)
                    id={selectedItem.id}             // 서버: fridgeIngredientId -> 로컬: id
                    name={selectedItem.name}         // 서버: ingredientName -> 로컬: name
                    quantity={selectedItem.quantity} // 서버: count -> 로컬: quantity
                    memo={selectedItem.memo}

                    // 수정된 핸들러 전달
                    onSave={handleSaveChnage}

                    // 모달 닫기
                    closeModal={() => setIsEditModalVisible(false)}
                />
            )}
            
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsSearchVisible(true)}
            >
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>

            {/* 검색 모달, 재료 추가 모달 */}
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
                                placeholder="재료 이름을 입력하세요 (예: 계란)"
                                placeholderTextColor="#9ca3af"
                                returnKeyType="search"
                                // [수정] 엔터(검색) 키 누르면 API 호출
                                onSubmitEditing={handleSearch}
                            />
                            {/* (옵션) 돋보기 아이콘 눌러도 검색되게 하려면 TouchableOpacity로 감싸서 handleSearch 연결 가능 */}
                        </View>

                        <FlatList
                            // [수정] 로컬 필터링 데이터 대신 API 결과 사용
                            data={searchResults}

                            // [수정] API 응답의 고유 ID 사용
                            keyExtractor={(item) => String(item.id)}

                            keyboardShouldPersistTaps="handled"

                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.suggestionItem}
                                    // [수정] 객체 전체(item)를 넘겨서 ID와 Name 모두 활용
                                    onPress={() => openDetailPopup(item)}
                                >
                                    {/* [수정] item이 객체이므로 item.name으로 접근 */}
                                    <Text style={styles.suggestionText}>{item.name}</Text>
                                    <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
                                </TouchableOpacity>
                            )}

                            ListEmptyComponent={
                                <Text style={styles.emptySuggestion}>
                                    {searchQuery ? "검색 결과가 없습니다." : "재료를 검색해보세요."}
                                </Text>
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

                        {/* 수량 조절 부분 */}
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

                        {/* 메모 입력 부분 */}
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
                                    setIsSearchVisible(true); // 취소 시 다시 검색창으로
                                }}
                            >
                                <Text style={styles.cancelText}>취소</Text>
                            </TouchableOpacity>

                            {/* [연결] 선택 버튼에 handleConfirmSelection 연결 */}
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
     
    );
}











const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    dataContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
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
        flexDirection: 'row',
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