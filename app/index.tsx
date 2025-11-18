// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // 앱이 실행되면 처음에 로그인 화면으로 이동
  return <Redirect href="/login" />;
}
