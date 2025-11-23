import { Stack } from 'expo-router';
import React, { useState } from "react";
import { Animated, StyleSheet } from "react-native";

export default function FridgeLayout() {
    const [searchMode, setSearchMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const fadeAnim = new Animated.Value(1);

    // 🔍 검색모드 전환 시 페이드 효과
    const toggleSearch = () => {
        Animated.timing(fadeAnim, {
            toValue: searchMode ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setSearchMode(!searchMode);
        });
    };


    return (
        <Stack
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_right', // 오른쪽에서 슬라이드
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: 'MyFridge',   // 헤더 텍스트
                    headerTitleAlign: 'center', // 중앙 정렬 (원하면)
                    headerTitleStyle: styles.title

                  }}
            />
        </Stack>

      
    );
}


// options = {{
//     headerTitle: () => (
//         searchMode ? (
//             <Animated.View style={[styles.searchBox, { opacity: fadeAnim }]}>
//                 <TextInput
//                     value={searchQuery}
//                     onChangeText={setSearchQuery}
//                     placeholder="재료 검색..."
//                     style={styles.searchInput}
//                     autoFocus
//                 />
//             </Animated.View>
//         ) : (
//             <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
//                 MyFridge
//             </Animated.Text>
//         )
//     ),
//         headerRight: () => (
//             <TouchableOpacity onPress={toggleSearch} style={styles.iconButton}>
//                 <Image
//                     source={require('../../../assets/icons/search.png')}
//                     style={{ width: 26, height: 26 }}
//                 />
//             </TouchableOpacity>
//         ),

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: "600",
        textAlign: "center",
        fontFamily:"CedarvilleCursive_400Regular"
    },
    iconButton: {
        marginRight: 10,
    },
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 220,
        height: 35,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 4,
    },
});