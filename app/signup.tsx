import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { signupRequest } from '@/src/api/auth';

export default function SignupScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const handleBackToLogin = () => {
    router.back();
  };

  const validateForm = () => {
    if (!userId.trim()) return "아이디를 입력해주세요.";
    if (password.length < 6) return "비밀번호는 6자 이상이어야 합니다.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return null;
  };

  const handleSubmit = async() => {

    const error = validateForm();
    if (error) {
      Alert.alert("회원가입 실패", error);
      return;
    }
    setIsSignUpLoading(true);

    try{

      await signupRequest(userId, password, confirmPassword);
      setIsSignUpLoading(false);

    } catch (error) {
      setIsSignUpLoading(false);
      Alert.alert("회원가입 실패", (error as Error).message);
      return;
    }

    Alert.alert("회원가입 완료", `${userId}님, 환영합니다!`, [
      {
        text: "로그인하러 가기",
        onPress: handleBackToLogin,
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backRow}>
          <TouchableOpacity onPress={handleBackToLogin} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ReciPick</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ID 설정</Text>
            <TextInput
              style={styles.input}
              value={userId}
              onChangeText={setUserId}
              placeholder="아이디"
              placeholderTextColor="#9ca3af"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>비밀번호 설정</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="비밀번호 (6자 이상)"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="비밀번호 확인"
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
          </View>
          <TouchableOpacity style={[styles.button, styles.submit]} onPress={handleSubmit}>
           {isSignUpLoading ? (
                        <ActivityIndicator color="white" />
                      ) : (
              <Text style={styles.buttonText}>회원가입</Text>
                      )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  backRow: {
    width: "100%",
    marginBottom: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoText: {
    fontSize: 52,
    fontFamily: "CedarvilleCursive_400Regular",
    color: "#111827",
  },
  formContainer: {
    gap: 20,
  },
  section: {
    marginBottom: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#f9fafb",
    marginBottom: 12,
  },
  button: {
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    backgroundColor: "#0095F6",
    marginTop: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
