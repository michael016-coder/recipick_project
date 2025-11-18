import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';


const editFridgeIng = ({isEditModalVisible, setIsEditModalVisible}) => {

    
    // 팝업 닫기 함수
    const closeModal = () => {
        setIsEditModalVisible(false);
    };

    return (
            <Modal
                animationType="fade" // 'none', 'slide', 'fade' 중 선택
                transparent={true} // ⬅️ 배경을 투명하게 만들어 뒷 화면이 보이게 함 (필수)
                visible={isEditModalVisible} // 팝업 표시 여부
                onRequestClose={closeModal} // Android의 뒤로가기 버튼 처리
            >
                {/* // 모달 배경 영역 (전체 화면을 덮는 오버레이)
                  // onTouchEnd를 사용하여 팝업 외부를 터치하면 닫히도록 설정
                */}
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1} // 터치 시 불투명도 변화 없음
                    onPress={closeModal} // 오버레이를 터치하면 팝업 닫기
                >
                    {/* 팝업 실제 내용 컨테이너 (Modal Overlay 위에 배치) */}
                <View style={styles.contentContainer}>

                    {/* 1. 재료명 및 수량 조절 버튼 영역 */}
                    <View style={styles.headerRow}>
                        <Text style={styles.ingredientName}>{ingredientName}</Text>

                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleQuantityChange('decrement')}
                                disabled={quantity <= 1} // 수량이 1일 때 비활성화
                            >
                                <Ionicons name="remove" size={24} color={quantity > 1 ? "#333" : "#ccc"} />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityButton}
                                onPress={() => handleQuantityChange('increment')}
                            >
                                <Ionicons name="add" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* 2. 텍스트 입력란 (메모/부연 설명) */}
                    <View style={styles.memoInputWrapper}>
                        <TextInput
                            style={styles.memoInput}
                            placeholder="상태, 유통기한 등 메모를 입력하세요."
                            value={memo}
                            onChangeText={setMemo}
                            multiline={true}
                            placeholderTextColor="#aaa"
                        />
                    </View>

                    {/* 3. 취소 | 저장 버튼 영역 */}
                    <View style={styles.actionRow}>
                        {/* 취소 버튼 */}
                        <TouchableOpacity
                            style={[styles.actionButton, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={[styles.actionText, styles.cancelText]}>취소</Text>
                        </TouchableOpacity>

                        {/* 저장 버튼 */}
                        <TouchableOpacity
                            style={[styles.actionButton, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={[styles.actionText, styles.saveText]}>저장</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                </TouchableOpacity>
            </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    contentContainer: {
        // 모달의 실제 내용 컨테이너 (Modal Overlay 위에 배치되는 View)
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10, // 부모 모달 컨테이너의 borderRadius와 일치
        paddingTop: 15,
    },

    // --- 1. 재료명 및 수량 조절 ---
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    ingredientName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
    },
    quantityButton: {
        padding: 8,
    },
    quantityText: {
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 12,
        color: '#333',
    },

    // --- 2. 텍스트 입력란 ---
    memoInputWrapper: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    memoInput: {
        height: 60,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top', // Android에서 멀티라인 텍스트를 위에서부터 시작
        paddingVertical: 10,
    },

    // --- 3. 취소 | 저장 버튼 ---
    actionRow: {
        flexDirection: 'row',
        // padding을 주지 않고 버튼이 하단에 완전히 붙도록 구현
        borderTopWidth: 1,
        borderTopColor: '#f1f1f1',
        overflow: 'hidden', // borderRadius가 적용되도록
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#eee',
    },
    saveButton: {
        backgroundColor: '#007bff',
        borderLeftWidth: 1,
        borderLeftColor: '#d0d0d0',
    },
    actionText: {
        fontSize: 18,
        fontWeight: '600',
    },
    cancelText: {
        color: '#555',
    },
    saveText: {
        color: '#fff',
    },
});

export default editFridgeIng;