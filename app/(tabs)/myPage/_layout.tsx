import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "myPage",
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
        }}
      />
      <Stack.Screen
        name="logout"
        options={{
          title: "로그아웃",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Stack.Screen
        name="withdraw"
        options={{
          title: "탈퇴",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          title: "비밀번호 변경",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Stack.Screen
        name="feedback"
        options={{
          title: "의견 보내기",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Stack.Screen
        name="donate"
        options={{
          title: "후원하기",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
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
    fontFamily: "CedarvilleCursive_400Regular",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});
