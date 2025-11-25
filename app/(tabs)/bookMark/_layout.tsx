import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

export default function BookmarkLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        // 북마크 섹션 내부 화면 전환은 오른쪽 슬라이드로 통일
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Archive",
          headerTitleAlign: "center",
          headerTitleStyle: styles.title,
        }}
      />

      <Stack.Screen //
        name="recipeDetail" // BookmarkCard.tsx에서 호출하는 라우트 이름과 일치해야 함
        options={{
          headerShown: true, // 상세 페이지는 헤더를 보여줍니다.
          title: "레시피 상세 정보", // 헤더에 표시될 제목
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
});
