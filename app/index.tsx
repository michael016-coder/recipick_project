// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
    // 앱이 실행되면 자동으로 탭 내 fridge 화면으로 이동
    return <Redirect href="/(tabs)/fridge" />;
}
