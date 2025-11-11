// RECIPICK/api/recipe.js

import apiClient from "./api.js";
// 💡 apiClient가 AccessToken을 자동으로 첨부하므로 memberId는 제거되었습니다.

// ===================================
//        레시피 (Recipe Controller)
// ===================================

/**
 * 1. 레시피 히스토리 조회 API
 * GET /api/recipe/history
 * 사용자의 레시피 조회 기록을 가져옵니다.
 * @param {object} pageable - 페이지네이션 정보
 */
export const getRecipeHistory = async (pageable) => {
  try {
    // 💡 memberId 제거
    const params = {
      ...pageable,
    };
    const response = await apiClient.get("/api/recipe/history", { params });
    return response.data;
  } catch (error) {
    console.error("레시피 히스토리 조회 API 오류:", error);
    throw error;
  }
};

/**
 * 2. 레시피 히스토리 추가 API
 * POST /api/recipe/history
 * 특정 레시피를 조회 기록에 추가합니다.
 * @param {number} recipeId - 조회 기록에 추가할 레시피 ID
 */
export const addRecipeToHistory = async (recipeId) => {
  try {
    // 💡 memberId 제거. recipeId만 Request Body로 전송
    await apiClient.post("/api/recipe/history", { recipeId });
  } catch (error) {
    console.error("레시피 히스토리 추가 API 오류:", error);
    throw error;
  }
};

/**
 * 3. 레시피 히스토리 삭제 API
 * DELETE /api/recipe/history
 * 특정 레시피를 조회 기록에서 삭제합니다.
 * @param {number} historyRecipeId - 삭제할 기록의 ID
 * @param {object} pageable - 삭제 후 반환받을 목록의 페이지네이션 정보 (Query)
 */
export const deleteRecipeFromHistory = async (historyRecipeId, pageable) => {
  try {
    // DELETE 요청에서 Request Body를 사용하려면 data 속성을 사용합니다.
    // 💡 memberId 제거
    await apiClient.delete("/api/recipe/history", {
      data: {
        historyRecipeId,
      },
      params: {
        // pageable은 쿼리 파라미터로 처리
        ...pageable,
      },
    });
  } catch (error) {
    console.error("레시피 히스토리 삭제 API 오류:", error);
    throw error;
  }
};

/**
 * 4. 레시피 목록 조회 API
 * GET /api/recipe
 * 특정 조건(예: 재료)에 맞는 레시피 목록을 조회합니다.
 * @param {Array<string>} ingredients - 필터링할 재료 목록
 * @param {object} pageable - 페이지네이션 정보
 */
export const getRecipes = async (ingredients, pageable) => {
  try {
    // 💡 memberId 제거
    const params = {
      // 재료 배열을 쉼표로 구분된 문자열로 변환하여 쿼리 파라미터로 전송
      ingredients: ingredients.join(","),
      ...pageable,
    };

    const response = await apiClient.get("/api/recipe", { params });
    return response.data;
  } catch (error) {
    console.error("레시피 목록 조회 API 오류:", error);
    throw error;
  }
};

/**
 * 5. 레시피 상세 정보 조회 API
 * GET /api/recipe/detail/{recipeId}
 * 특정 레시피의 상세 정보를 조회합니다.
 * @param {number} recipeId - 상세 정보를 조회할 레시피 ID (Path)
 */
export const getRecipeDetail = async (recipeId) => {
  try {
    // 💡 memberId 제거. Path Variable만 사용.
    const response = await apiClient.get(`/api/recipe/detail/${recipeId}`);
    return response.data;
  } catch (error) {
    console.error("레시피 상세 정보 조회 API 오류:", error);
    throw error;
  }
};
