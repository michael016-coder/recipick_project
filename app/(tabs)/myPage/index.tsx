import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPageScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      { text: "취소", style: "cancel" },
      {
        text: "로그아웃",
        style: "destructive",
        onPress: () => {
          // TODO: 실제 로그아웃 로직
          router.replace("/login");
        },
      },
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert("탈퇴", "정말 탈퇴하시겠습니까? 모든 데이터가 삭제됩니다.", [
      { text: "취소", style: "cancel" },
      {
        text: "탈퇴",
        style: "destructive",
        onPress: () => {
          // TODO: 실제 탈퇴 로직
          Alert.alert("탈퇴 완료", "탈퇴가 완료되었습니다.");
        },
      },
    ]);
  };

  const handleChangePassword = () => {
    Alert.alert("비밀번호 변경", "비밀번호 변경 기능은 곧 추가됩니다.");
  };

  const handleSendFeedback = () => {
    Alert.alert("의견 보내기", "의견 보내기 기능은 곧 추가됩니다.");
  };

  const handleDonate = () => {
    Alert.alert("후원하기", "후원하기 기능은 곧 추가됩니다.");
  };

  const menuItems = [
    {
      id: "logout",
      title: "로그아웃",
      icon: "log-out-outline",
      onPress: handleLogout,
      destructive: true,
    },
    {
      id: "withdraw",
      title: "탈퇴",
      icon: "person-remove-outline",
      onPress: handleWithdraw,
      destructive: true,
    },
    {
      id: "changePassword",
      title: "비밀번호 변경",
      icon: "lock-closed-outline",
      onPress: handleChangePassword,
    },
    {
      id: "feedback",
      title: "의견 보내기",
      icon: "mail-outline",
      onPress: handleSendFeedback,
    },
    {
      id: "donate",
      title: "후원하기",
      icon: "heart-outline",
      onPress: handleDonate,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>MyPage</Text>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
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
  header: {
    paddingTop: 12,
    paddingBottom: 16,
    alignItems: "center",
  },
  headerText: {
    fontSize: 36,
    fontFamily: "CedarvilleCursive_400Regular",
    color: "#111827",
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

