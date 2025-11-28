// RECIPICK/api/auth.js

import * as SecureStore from 'expo-secure-store';
import apiClient from "./api.js";

// ===================================
//              인증 (Auth)
// ===================================

/**
 * 로그인 API 요청 함수
 * 요청: loginId, password
 * 응답: accessToken, refreshToken
 */
export const loginRequest = async (loginId, password) => {
  try {
    // 💡 /api/auth/login 요청
    const response = await apiClient.post("/api/auth/login", {
      loginId: loginId,
      password: password,
    });

    // 서버 응답에서 토큰을 추출
    const { accessToken, refreshToken } = response.data;


    // 💡 핵심: 토큰을 Secure Storage에 저장
    if (accessToken && refreshToken) {
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("refreshToken", refreshToken);
      console.log("access token: ", accessToken);
      console.log("refresh token: ", refreshToken);
    } else {
      console.warn("로그인 성공했으나 서버 응답에 토큰이 누락됨");
    }

    return response.data;
  } catch (error) {
    console.error("로그인 API 오류:", error);
    throw error;
  }
};



// ... (registerRequest, getAuthMe 함수는 변경 없음) ...

export const signupRequest = async (loginId, password, checkPassword) => {
  try {

    const response = await apiClient.post("/api/auth/signup", {
      loginId: loginId,
      password: password,
      checkPassword: checkPassword,
    });

    return response.data;

  } catch (error) {
    console.error("회원가입 API 오류:", error);
    console.log("서버 에러 데이터:", error.response.data);
    throw error;
  }
};




/**
 * 로그아웃 API 요청 함수 및 클라이언트 토큰 삭제
 * 요청: (AccessToken in Header)
 * 응답: Void
 */
export const logoutRequest = async () => {
  try {
    // 💡 POST /api/auth/logout 요청
    await apiClient.post("/api/auth/logout");
  } catch (error) {
    // 서버 로그아웃 요청 실패 시에도 클라이언트 토큰은 제거해야 함
    console.error(
      "서버 로그아웃 요청 오류 (클라이언트 토큰은 삭제 시도):",
      error
    );
    throw error;
  } finally {
    // 클라이언트 Secure Storage에서 토큰 삭제 (성공/실패 무관)
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }
};

/**
 * 회원 탈퇴 API 요청 함수 및 클라이언트 토큰 삭제
 * 요청: (AccessToken in Header)
 * 응답: Void
 */
export const withdrawRequest = async () => {
  try {
    // 💡 DELETE /api/auth/withdraw 요청
    await apiClient.delete("/api/auth/withdraw");

    // 서버 요청 성공 시
    return;
  } catch (error) {
    console.error("회원 탈퇴 API 오류:", error);
    throw error;
  } finally {
    // 성공/실패와 관계없이, 탈퇴 후에는 토큰을 반드시 삭제
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("refreshToken");
  }
};
