import { searchRequest } from '@/src/api/search';
import useCartStore from '@/src/stores/cartStore';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, Searchbar } from 'react-native-paper';




const SCREEN_WIDTH = Dimensions.get('window').width;


export default function FullScreenSearchModal({ isModalVisible }) {

    const addItemToCart = useCartStore((state) => state.addItemToCart);
    const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
    const cartItems = useCartStore((state) => state.cartItems);
    const refreshCartItems = useCartStore((state) => state.refreshCartItems);
    
    
    const [searchQuery, setSearchQuery] = useState('');

    // 검색 모드 활성화 여부 (false: 선택된 목록 보여줌, true: 검색 결과 보여줌)
    const [isSearchActive, setIsSearchActive] = useState(false);

    // 현재 리스트에 보여줄 데이터, 장바구니에 선택된 데이터를 보여줄 예정. 
    const [SEARCH_RESULT, setSEARCH_RESULT] = useState([]);

    const selectedCartItemList = useMemo(() => {
        return cartItems.filter(item => item.inFridge === false);
    }, [cartItems]);
    
    useEffect(() => {
        if (isModalVisible) {
            // 보이기: 0 위치로 이동
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
            }).start();
        } else {
            // 숨기기: 다시 오른쪽 끝으로 이동
            Animated.timing(slideAnim, {
                toValue: SCREEN_WIDTH,
                duration: 400,
                useNativeDriver: true,
            }).start();
        }
        refreshCartItems();
    }, [isModalVisible]);

    /**
   * [검색 실행 핸들러]
   * 검색어가 있으면 검색 결과 모드로 전환, 없으면 초기 선택 목록으로 복귀
   */
    const handleSearch = async () => {
        console.log(`검색 실행: ${searchQuery}`);

        // 검색어가 비어있으면 검색 모드 해제 및 결과 초기화
        if (searchQuery.trim() === '') {
            setIsSearchActive(false);
            setSEARCH_RESULT([]); // 리스트 비우기
            return;
        }

        try {
            // API 호출
            const response = await searchRequest(searchQuery);

            // [핵심] 기존 결과를 버리고 새 검색 결과로 저장
            setSEARCH_RESULT(response);

            // 검색 모드 활성화 (UI를 검색 결과 탭으로 전환 등)
            setIsSearchActive(true);

        } catch (error) {
            console.error("검색 실패:", error);
            setSEARCH_RESULT([]); // 에러 발생 시 빈 리스트로 초기화
        }
    };

    const handleCartItem = async (item) => {
        removeItemFromCart(item.basketIngredientId);
    };

    const handleSearchedItem = async (item) => {
        // 현재 시점의 cartItems에서 찾기
        const targetCartItem = selectedCartItemList.find(
            (cart) => cart.ingredientId === item.id
        );

        if (targetCartItem) {
            // 이미 있으면 삭제 (basketIngredientId 사용)
            removeItemFromCart(targetCartItem.basketIngredientId);
        } else {
            // 없으면 추가 (ingredientId 사용)
            addItemToCart(item.id);
        }
    };


    /**
     * [리스트 아이템 렌더링]
     * 요구사항: 이름은 왼쪽 끝, 체크박스는 오른쪽 끝 배치
     */
    const renderSearchItem = ({ item }: { item: any }) => {
        
        const isChecked = selectedCartItemList.some(
            (cart) => cart.ingredientId === item.id
        );

        return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleSearchedItem(item)}
            activeOpacity={0.7}
        >
            {/* 1. 이름 (왼쪽 정렬) */}
            <View style={styles.textWrapper}>
                <Text style={styles.nameText}>{item.name}</Text>
            </View> 
            <Checkbox
                    status={isChecked ? "checked" : "unchecked"}
                    onPress={() => handleSearchedItem(item)}
                color="#3b82f6" // 파란색 포인트 컬러
            />      
        </TouchableOpacity>

        );
    };

    const renderCartItem = ({ item }: { item: any }) => {

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleCartItem(item)}
                activeOpacity={0.7}
            >
                {/* 1. 이름 (왼쪽 정렬) */}
                <View style={styles.textWrapper}>
                    <Text style={styles.nameText}>{item.name}</Text>
                </View>

                {/* 2. 체크박스 (오른쪽 끝) */}
            </TouchableOpacity>
            );
    };

    // 애니메이션 값 (초기값: 화면 너비만큼 오른쪽으로 밀려남)
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateX: slideAnim }],
                },
            ]}
        >
            <View style={styles.modalContent}>
                {/* 1. 헤더 (검색창) */}
                <View style={styles.searchHeader}>
                    <Searchbar
                        placeholder="재료 검색"
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            // 텍스트를 다 지우면 초기 목록으로 돌아가게 처리
                            if (text === '') {
                                setIsSearchActive(false);
                            }
                        }}
                        value={searchQuery}
                        onSubmitEditing={handleSearch} // 엔터 키
                        onIconPress={handleSearch}     // 돋보기 아이콘 클릭
                        style={styles.searchBar}
                        inputStyle={styles.searchInput}
                        placeholderTextColor="#999"
                        iconColor="#666"
                    />
                </View>

                {/* 2. 바디 (리스트) */}
                <View style={styles.modalBody}>
                    {/* 리스트 제목 (선택사항) */}
                    <Text style={styles.listTitle}>
                        {isSearchActive ? `'${searchQuery}' 검색 결과` : '현재 선택된 재료'}
                    </Text>
                    {isSearchActive ?(
                        <FlatList
                            data={SEARCH_RESULT}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={renderSearchItem}
                            contentContainerStyle={styles.listContent}
                            keyboardShouldPersistTaps="handled"
                            ListEmptyComponent={
                                <Text style={styles.emptyText}>
                                   {"검색 결과가 없습니다."}
                                </Text>
                            }
                        />):(
                        <FlatList
                            data={cartItems}
                            keyExtractor={(item) => String(item.ingredientId)}
                            renderItem={renderCartItem}
                            contentContainerStyle={styles.listContent}
                            keyboardShouldPersistTaps="handled"
                            ListEmptyComponent={
                                <Text style={styles.emptyText}>
                                    {"선택된 재료가 없습니다."}
                                </Text>
                            }
                        />
                        )}
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute', 
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        zIndex: 10, 

        shadowColor: "#000",
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchHeader: {
        paddingHorizontal: 16, // 좌우 여백을 적절히 줌 (보통 16 or 20)
        paddingTop: 16,        // 위쪽 여백
        paddingBottom: 12,     // 아래쪽 여백 (리스트와 너무 붙지 않게)
        backgroundColor: '#fff', // 배경색 지정 (스크롤 시 투명해지는 것 방지)

        // (선택사항) 헤더와 리스트 사이의 얇은 구분선
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    // [Searchbar Component]
    searchBar: {
        backgroundColor: '#F6F6F6', // 1. 진한 그림자 대신 연한 회색 배경 사용 (모던한 느낌)
        borderRadius: 12,           // 2. 모서리를 적당히 둥글게 (완전 타원형보다 요즘 많이 씀)
        elevation: 0,               // 3. 안드로이드 그림자 제거 (Flat하게)
        shadowOpacity: 0,           // 4. iOS 그림자 제거
        height: 48,                 // 5. 높이 명시 (너무 크지 않게 조절)
        borderWidth: 1,             // (선택) 아주 연한 테두리
        borderColor: '#eee',
    },
    // [Input Text]
    searchInput: {
        fontSize: 16,               // 폰트 크기 적절히 조절
        minHeight: 0,               // 텍스트가 위아래로 짤리는 버그 방지
        // 텍스트 수직 정렬이 안 맞을 경우 아래 속성 사용
        // alignSelf: 'center', 
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    modalBody: {
        flex: 1,
        padding: 20,
    },
    //list 스타일
    listTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 8,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#9ca3af',
        fontSize: 15,
    },

    // [리스트 아이템 스타일]
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // 텍스트 묶음과 체크박스를 양 끝으로 배치

        backgroundColor: "#e9f5ff",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        marginBottom: 10,

       
    },
    textWrapper: {
        flexDirection: "row", // 이름, 수량, 보관일을 가로로 배치
        alignItems: "center", // 텍스트들의 세로 중앙 정렬 (Baseline을 맞추려면 'flex-end' 사용 가능)
        flex: 1, // 체크박스를 제외한 나머지 공간 차지
        justifyContent: "center", // 왼쪽 정렬
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1f2937',
      },
});