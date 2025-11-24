import { Stack } from 'expo-router';
import { StyleSheet } from "react-native";


export default function SearchLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                animation: 'slide_from_right', // 오른쪽에서 슬라이드
            }}
        >
            <Stack.Screen name="index" 
                options={{
                    title: 'Select Ingredient',   // 헤더 텍스트
                    headerTitleAlign: 'center', // 중앙 정렬 (원하면)
                    headerTitleStyle: styles.title

                }}
            /> 
            <Stack.Screen
                name="search"
                options={{
                    // 핵심: 오른쪽에서 왼쪽으로 슬라이드 되는 애니메이션 강제 적용
                animation: 'slide_from_right',

                // (선택사항) 검색 화면에서는 기본 헤더를 숨기고 커스텀 헤더를 쓰는 경우가 많음
                headerShown: false,
                presentation: 'card',          // 카드 형태로 스택이 쌓이는 느낌을 줌
                gestureEnabled: true,          // iOS 스와이프 백 제스처 활성화
                contentStyle: { backgroundColor: '#fff' }
                }}
            />
        </Stack>
    );
}


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