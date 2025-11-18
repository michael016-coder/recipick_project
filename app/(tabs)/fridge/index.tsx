import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

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