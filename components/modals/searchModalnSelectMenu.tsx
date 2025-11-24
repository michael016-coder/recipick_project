import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { Searchbar } from 'react-native-paper';




const SCREEN_WIDTH = Dimensions.get('window').width;


const InnerSearchContent = () => {
    
    const [searchQuery, setSearchQuery] = React.useState('');
    return (
        <View style={styles.modalContent}>
            <View style={styles.searchHeader}>
                <Searchbar
                    placeholder="재료 검색"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    // 1. 스타일 객체 적용
                    style={styles.searchBar}
                    // 2. 내부 텍스트 스타일 적용
                    inputStyle={styles.searchInput}
                    // 3. 플레이스홀더 색상 조정 (선택사항)
                    placeholderTextColor="#999"
                    // 4. 아이콘 색상 조정 (선택사항)
                    iconColor="#666"
                />
            </View>
            <View style={styles.modalBody}>
                <Text>여기 리스트가 들어갑니다...</Text>
            </View>
        </View>
    )
};

export default function FullScreenSearchModal({ isModalVisible }) {
    // 애니메이션 값 (초기값: 화면 너비만큼 오른쪽으로 밀려남)
    const slideAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current;

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
    }, [isModalVisible]);


    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateX: slideAnim }],
                },
            ]}
        >
            <InnerSearchContent />
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
    }
});