import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("오류", "새 비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("오류", "새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 실제 비밀번호 변경 로직
    Alert.alert("성공", "비밀번호가 변경되었습니다.", [
      {
        text: "확인",
        onPress: () => {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="lock-closed-outline" size={64} color="#0095F6" />
        </View>
        <Text style={styles.title}>비밀번호 변경</Text>
        <Text style={styles.description}>
          보안을 위해 정기적으로 비밀번호를 변경하는 것을 권장합니다.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>현재 비밀번호</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="현재 비밀번호를 입력하세요"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>새 비밀번호</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="새 비밀번호를 입력하세요 (6자 이상)"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>새 비밀번호 확인</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="새 비밀번호를 다시 입력하세요"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.changeButton,
            (!currentPassword.trim() ||
              !newPassword.trim() ||
              !confirmPassword.trim()) &&
              styles.changeButtonDisabled,
          ]}
          onPress={handleChangePassword}
          activeOpacity={0.8}
          disabled={
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
          }
        >
          <Text style={styles.changeButtonText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#f9fafb",
  },
  changeButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0095F6",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  changeButtonDisabled: {
    backgroundColor: "#f3f4f6",
  },
  changeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
});

