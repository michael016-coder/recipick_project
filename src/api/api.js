// src/api/api.js
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

// BASE_URL 변경
const BASE_URL = "https://kathey-overforward-swaggeringly.ngrok-free.dev";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});


//  요청 시 AccessToken 자동 포함
apiClient.interceptors.request.use(async (config) => {
  const accessToken = await SecureStore.getItemAsync("accesssToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${ accessToken }`;
  }
  return config;
});



//  요청 시 AccessToken 자동 포함
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) throw new Error("No refresh token found");

        // RefreshToken으로 AccessToken 재발급
        // 💡 /auth/reissue 요청
        const res = await axios.post(
          `${BASE_URL}/api/auth/reissue`,
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
          }
        );

        // 💡 응답에서 accessToken과 refreshToken 둘 다 저장
        // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        //   res.data;

        const { accessToken: newAccessToken } = res.data;

        await SecureStore.setItemAsync("accessToken", newAccessToken);
       // await EncryptedStorage.setItem("refreshToken", newRefreshToken); // 새 Refresh Token 저장

        // 원래 요청 다시 시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (err) {
        console.log("토큰 재발급 실패:", err);
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
        // → 필요 시 로그인 페이지로 이동 처리
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
