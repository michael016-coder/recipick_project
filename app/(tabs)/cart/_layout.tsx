import { Stack } from 'expo-router';

export default function FridgeLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right', // 오른쪽에서 슬라이드
            }}
        >
            <Stack.Screen name="index" />  {/* 기본 냉장고 메인 화면 */}
            <Stack.Screen name="add" />    {/* 재료 추가 화면 */}
        </Stack>
    );
}
