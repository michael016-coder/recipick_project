// src/store/authStore.js

import { loginRequest, logoutRequest, withdrawRequest } from '@/src/api/auth';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

// EncryptedStorage 키 정의
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';


/**
 * @typedef {Object} UserInfo
 * @property {string} id - 사용자 고유 ID
 * @property {string} username - 사용자 이름
 * // 필요한 다른 사용자 정보를 추가합니다.
 */

/**
 * @typedef {Object} AuthState
 * @property {boolean} isLoggedIn - 현재 로그인 상태 (UI 상태)
 * @property {UserInfo | null} user - 로그인된 사용자 정보
 * @property {boolean} isAuthLoading - 인증 로직 실행 중 여부
 * @property {(accessToken: string, refreshToken: string, userData: UserInfo) => Promise<void>} login - 로그인 처리 액션
 * @property {() => Promise<void>} logout - 로그아웃 처리 액션
 * @property {() => Promise<void>} hydrate - 저장소 복구 (자동 로그인) 액션
 */

/**
 * Zustand 스토어를 생성합니다.
 * @type {import('zustand').StoreApi<AuthState>}
 */

/** @typedef {Object} UserInfo
* @typedef {Object} UserInfo
* @property {string} id - 사용자 고유 ID
* @property {string} username - 사용자 이름
* // 필요한 다른 사용자 정보를 추가합니다.
*/


export const useAuthStore = create((set) => ({

    // 1. 초기 상태 (Initial State)
    isLoggedIn: false,
    user: null,
    isAuthLoading: true,

    /**
     * 로그인 처리를 수행합니다. 
     * API 요청과 토큰 저장은 외부 loginRequest 함수에 의존합니다.
     * @param {string} loginId
     * @param {string} password
     * @returns {Promise<UserInfo>} 성공 시 사용자 정보를 반환합니다.
     */
    login: async (loginId, password) => {
        set({ isAuthLoading: true });
        try {
            // 1. API 요청 및 토큰 Secure Storage 저장 (loginRequest 내부 로직)
            // loginRequest는 토큰을 저장하고, 사용자 정보를 포함한 응답 데이터를 반환해야 합니다.
            // 🚨 loginRequest는 { accessToken, refreshToken, ...userData }를 포함한 데이터를 반환해야 함을 가정합니다.
            const userData = await loginRequest(loginId, password);

            // 2. Zustand Store 상태 업데이트
            set({
                isLoggedIn: true,
                user: userData, // 로그인 요청 성공 시 받은 사용자 정보
                isAuthLoading: false
            });

            return userData;

        } catch (error) {
            console.error("Store Login Action Failed:", error);
            // 로그인 실패 시 상태 초기화 및 로딩 종료
            set({
                isLoggedIn: false,
                user: null,
                isAuthLoading: false
            });
            throw error; // 에러를 호출한 컴포넌트로 전달
        }
    },

    /**
     * 로그아웃 처리를 수행합니다.
     * API 요청 및 토큰 삭제는 외부 logoutRequest 함수에 의존합니다.
     * @returns {Promise<void>}
     */
    logout: async () => {
        set({ isAuthLoading: true });
        try {
            // 1. API 요청 및 토큰 Secure Storage 삭제 (logoutRequest 내부 로직)
            await logoutRequest();

        } catch (error) {
            // 서버 로그아웃 요청 실패하더라도 클라이언트 토큰은 삭제되었으므로 상태 초기화 진행
            console.warn("Server Logout Request Failed, but client state will be reset:", error);
            throw error; // 에러를 호출한 컴포넌트로 전달

        } finally {
            // 2. Zustand Store 상태 초기화 (성공/실패 무관하게 토큰 삭제 후 상태는 무조건 초기화)
            set({
                isLoggedIn: false,
                user: null,
                isAuthLoading: false
            });
        }
    },

    /**
     * 회원 탈퇴 처리를 수행합니다.
     * API 요청 및 토큰 삭제는 외부 withdrawRequest 함수에 의존합니다.
     * @returns {Promise<void>}
     */
    withdraw: async () => {
        set({ isAuthLoading: true });
        try {
            // 1. API 요청 및 토큰 Secure Storage 삭제 (withdrawRequest 내부 로직)
            await withdrawRequest();

        } catch (error) {
            console.error("Store Withdraw Action Failed:", error);
            throw error; // 에러를 호출한 컴포넌트로 전달

        } finally {
            // 2. Zustand Store 상태 초기화 (성공/실패 무관하게 토큰 삭제 후 상태는 무조건 초기화)
            set({
                isLoggedIn: false,
                user: null,
                isAuthLoading: false
            });
        }
    },

    /**
     * 앱 시작 시 토큰을 불러와 로그인 상태를 복원합니다 (Hydration).
     */
    hydrate: async () => {
        set({ isAuthLoading: true }); // 로딩 시작

        try {
            const accessToken = await SecureStore.setItemAsync("accessToken", ACCESS_TOKEN_KEY);
            const refreshToken = await SecureStore.setItemAsync("refreshToken", REFRESH_TOKEN_KEY);

            if (accessToken && refreshToken) {
                // 1. 서버에서 사용자 정보 페칭 (토큰 유효성 검사 역할 겸함)
                // 토큰이 유효하지 않으면 fetchUserData에서 401 에러를 발생시키고
                // 인터셉터가 토큰 재발급을 시도하거나 실패 시 throw 됩니다.
                //const fetchedUser = await fetchUserData(); // 🚨 실제 서버 API 호출로 변경 필요

                set({
                    isLoggedIn: true,
                    user: fetchedUser,
                });
            }
        } catch (error) {
            // 토큰 재발급 실패, 토큰 유효성 검사 실패 등 모든 오류 처리
            console.warn("Error during hydration. Logging out user:", error);
            // 오류 발생 시, 안전하게 토큰 삭제 및 상태 초기화
            await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
            await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
            set({
                isLoggedIn: false,
                user: null,
            });
        } finally {
            // 로딩 종료
            set({ isAuthLoading: false });
        }
    }
}));

export default useAuthStore;