import BookmarkCard from "@/components/BookmarkCard";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// [임시 데이터] 식재료(ingredients) 필드 추가 및 데이터 정리
const INITIAL_RECIPES = [
  {
    id: 1,
    name: "크림 파스타",
    img: "https://picsum.photos/300/200?random=1",
    ingredients: ["생크림", "파스타면", "베이컨"], // 👈 식재료 데이터 추가
  },
  {
    id: 2,
    name: "매콤 닭볶음탕",
    img: "https://picsum.photos/300/200?random=2",
    ingredients: ["닭", "감자", "양파", "고추장"],
  },
  {
    id: 4,
    name: "짜장면",
    img: "https://picsum.photos/300/200?random=4",
    ingredients: ["춘장", "면", "양파", "돼지고기"],
  },
  {
    id: 6,
    name: "불고기",
    img: "https://picsum.photos/300/200?random=6",
    ingredients: ["소고기", "간장", "양파", "당근"],
  },
];

export default function BookmarkScreen() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);

  // 항목 삭제 로직 함수 정의
  const handleRemoveRecipe = (idToRemove: number) => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== idToRemove);
    setRecipes(newRecipes);
  };

  const renderItem = ({ item }) => (
    <BookmarkCard
      id={item.id}
      foodName={item.name}
      imageUrl={item.img}
      ingredients={item.ingredients} // 👈 ingredients prop 전달
      onRemove={handleRemoveRecipe}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>북마크된 레시피가 없습니다.</Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 8 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
