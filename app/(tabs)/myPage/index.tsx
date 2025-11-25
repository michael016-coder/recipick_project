import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const navigation = useNavigation() as any;

  const handleNavigate = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const menuItems = [
    {
      id: "logout",
      title: "로그아웃",
      icon: "log-out-outline",
      screenName: "logout",
      destructive: true,
    },
    {
      id: "withdraw",
      title: "탈퇴",
      icon: "person-remove-outline",
      screenName: "withdraw",
      destructive: true,
    },
    {
      id: "changePassword",
      title: "비밀번호 변경",
      icon: "lock-closed-outline",
      screenName: "changePassword",
    },
    {
      id: "feedback",
      title: "의견 보내기",
      icon: "mail-outline",
      screenName: "feedback",
    },
    {
      id: "donate",
      title: "후원하기",
      icon: "heart-outline",
      screenName: "donate",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.screenName)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={item.destructive ? "#ef4444" : "#111827"}
                />
                <Text
                  style={[
                    styles.menuItemText,
                    item.destructive && styles.menuItemTextDestructive,
                  ]}
                >
                  {item.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9ca3af"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 0,
  },
  menuContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    fontWeight: "400",
  },
  menuItemTextDestructive: {
    color: "#ef4444",
  },
});

