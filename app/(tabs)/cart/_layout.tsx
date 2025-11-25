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
