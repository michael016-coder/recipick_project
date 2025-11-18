import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: 실제 로그인 로직 연동
    // 임시로 로그인 성공 시 냉장고 탭으로 이동
    router.replace("/(tabs)/fridge");
  };

  const handleGoToSignup = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ReciPick</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            value={id}
            onChangeText={setId}
            placeholder="아이디"
            placeholderTextColor="#aaa"
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress={handleGoToSignup}>
            <Text style={styles.signupText}>아직 계정이 없다면 회원가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoText: {
    fontSize: 52,
    fontFamily: "CedarvilleCursive_400Regular",
    color: "#111827",
  },
  formContainer: {
    flex: 4,
    marginTop: 32,
  },
  input: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fafafa",
  },
  loginButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#0095F6", // 인스타그램 파란색 계열
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  signupButton: {
    marginTop: 18,
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    color: "#0095F6",
  },
});

