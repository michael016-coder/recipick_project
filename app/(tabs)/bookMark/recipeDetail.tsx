// app/(tabs)/bookMark/recipeDetail.tsx 예시

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RecipeDetailScreen() {
  const params = useLocalSearchParams();
  const { recipeId, foodName } = params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {foodName} 상세 페이지</Text>
      <Text style={styles.subtitle}>ID: {recipeId}</Text>
      <Text style={styles.content}>
        여기에 레시피의 상세 내용, 조리법 등이 표시됩니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
});
