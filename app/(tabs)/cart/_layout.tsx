import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function CartLayout() {
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
          title: "Cart",
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
        }}
      />
      <Stack.Screen
        name="recipeSearch"
        options={{
          headerShown: false, // 커스텀 헤더 사용
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="recipeDetail"
        options={{
          headerShown: true,
          headerTitle: "", // 빈 문자열로 설정 (recipeDetail 화면에서 동적으로 설정)
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
          animation: "slide_from_right",
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
  backButton: {
    marginLeft: 16,
    padding: 4,
  },
});
