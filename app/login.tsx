import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import useAuthStore from '@/src/stores/authStore';


export default function LoginScreen() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const loginAction = useAuthStore(state => state.login);
  const isAuthLoading = useAuthStore(state => state.isAuthLoading);



  
  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert("경고", "아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      // 💡 3. Zustand login 액션 호출 (비동기 처리)
      // login 액션 내부에서 EncryptedStorage 저장 및 Zustand 상태 업데이트가 완료됨.
      await loginAction(id, password);

      // 4. 로그인 성공 후 라우팅 (replace를 사용하여 로그인 화면 스택에서 제거)
      router.replace("/(tabs)/fridge");

    } catch (error) {
      // 5. 로그인 실패 시 에러 처리
      const errorMessage = error.response?.data?.message || "로그인 중 오류가 발생했습니다. 아이디와 비밀번호를 확인해주세요.";
      Alert.alert("로그인 실패", errorMessage);
    }
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
            //editable={isAuthLoading} // 로딩 중 입력 비활성화
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호"
            placeholderTextColor="#aaa"
            style={styles.input}
            secureTextEntry
            //editable={isAuthLoading} // 로딩 중 입력 비활성화
          />

          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={handleLogin}
            //disabled={isAuthLoading} // 로딩 중 버튼 비활성화
            >
            {!isAuthLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>로그인</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
           style={styles.signupButton} 
           onPress={handleGoToSignup}
           //disabled={isAuthLoading} // 로딩 중 버튼 비활성화
           >
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

