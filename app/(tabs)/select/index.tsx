import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

import FullScreenSearchModal from '@/components/modals/searchModalnSelectMenu';


// 1. 리스트에 들어갈 더미 데이터
const DATA = [
    {
        id: '1',
        name: '사과',
        quantity: 3,
        storageDays: '3일 경과',
    },
    {
        id: '2',
        name: '계란',
        quantity: 2,
        storageDays: '7일 경과',
    },
    {
        id: '3',
        name: '딸기',
        quantity: 4,
        storageDays: '1일 경과',
    },

    {
        id: '4',
        name: '우유1',
        quantity: 5,
        storageDays: '1일 경과',
    },
    {
        id: '5',
        name: '우유2',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '6',
        name: '우유3',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '7',
        name: '우유4',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '8',
        name: '우유5',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '9',
        name: '우유6',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '10',
        name: '우유7',
        quantity: 1,
        storageDays: '1일 경과',
    },
    {
        id: '11',
        name: '우유8',
        quantity: 1,
        storageDays: '1일 경과',
    },
];

// 2. 개별 아이템 컴포넌트 (Text 추가 및 스타일 적용)
const MyIngItem = ({ item }) => {
    const [checked, setChecked] = useState(false);

    const toggleCheckbox = () => {
        setChecked(!checked);
    };

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={toggleCheckbox}
            activeOpacity={0.7}
        >
            {/* 텍스트 정보들을 묶는 컨테이너 (왼쪽 정렬) */}
            <View style={styles.textWrapper}>
                {/* 1. 이름 (가장 크고 강조됨) */}
                <Text style={styles.nameText}>{item.name}</Text>

                {/* 2. 수량 (부연 설명) */}
                <Text style={styles.detailText}>{item.quantity}개</Text>

                {/* 3. 보관일 (부연 설명 - 수량과 동일한 스타일) */}
                <Text style={styles.detailText}>{item.storageDays}</Text>
            </View>

            {/* 체크박스 (오른쪽 끝) */}
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={toggleCheckbox}
            />
        </TouchableOpacity>
    );
};

export default function SelectFridgeIngScreen() {

    const [isModalVisible, setModalVisible] = useState(false);


    // 3. 렌더 함수 정의
    const renderItem = ({ item }) => (
        <MyIngItem item={item} />
    );

    return (
       
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                // 리스트 자체의 스타일
                style={styles.list}
                // 리스트 내용물이 화면 중앙에 정렬되도록 돕는 옵션 (데이터가 적을 때 유용)
                contentContainerStyle={styles.listContent}
            />

            <FullScreenSearchModal isModalVisible={isModalVisible} />

            <TouchableOpacity
                style={styles.fab}
                activeOpacity={1}
                onPress={() => setModalVisible(!isModalVisible)}
            >
                {/* 모달 상태에 따라 아이콘 모양 변경 (선택사항) */}
                <Ionicons
                    name={isModalVisible ? "close" : "search"}
                    size={24}
                    color="#fff"
                />
            </TouchableOpacity>
        </View>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center', // 세로축 중앙 정렬
        alignItems: 'center',     // 가로축 중앙 정렬
    },
    list: {
        flexGrow: 0, // 데이터가 적을 때 리스트가 화면 전체를 차지하지 않고 내용물 크기만큼만 차지하게 함 (중앙 배치를 위해)
        width: '80%', // 리스트의 너비 설정
    },
    listContent: {
        // 필요시 리스트 내부 패딩 설정
        paddingVertical: 20,
    },
    //체크박스 리스트 요소
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 텍스트 묶음과 체크박스를 양 끝으로 배치

        backgroundColor: '#e9f5ff',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        marginBottom: 10,

        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    textWrapper: {
        flexDirection: 'row',   // 이름, 수량, 보관일을 가로로 배치
        alignItems: 'center',   // 텍스트들의 세로 중앙 정렬 (Baseline을 맞추려면 'flex-end' 사용 가능)
        flex: 1,                // 체크박스를 제외한 나머지 공간 차지
    },
    nameText: {
        fontSize: 18,           // 이름을 크게
        fontWeight: 'bold',
        color: '#333',
        marginRight: 12,        // 이름과 상세정보 사이 간격
    },
    detailText: {
        fontSize: 14,           // 상세정보는 작게
        color: '#888',          // 색상을 연하게 하여 부연 설명 느낌 강조
        marginRight: 10,        // 수량과 보관일 사이 간격 (동일하게 유지)
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
      

        zIndex: 20,
        elevation: 20,
    },
});