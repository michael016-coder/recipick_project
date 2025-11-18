// RECIPICK/api/fridge.js

import apiClient from "./api.js";
// 💡 apiClient가 AccessToken을 자동으로 첨부하므로 memberId는 불필요합니다.

// ===================================
//          냉장고 (Fridge Controller)
// ===================================

/**
 * GET /api/fridge/ingredients
 * 냉장고 재료 목록 조회
 * @param {object} pageable - 페이지네이션 정보 (page, size, sort 등)
 * @returns {Promise<object>} 재료 목록 및 페이지 정보
 */
export const getFridgeIngredients = async (pageable) => {
  try {
    // 💡 memberId 제거
    const params = { ...pageable };
    const response = await apiClient.get("/api/fridge/ingredients", { params });
    return response.data;
  } catch (error) {
    console.error("냉장고 재료 조회 API 오류:", error);
    throw error;
  }
};

/**
 * POST /api/fridge/ingredients
 * 냉장고에 재료 추가
 * @param {object} ingredientData - 추가할 재료 정보 (Body)
 * @param {object} pageable - 추가 후 반환받을 목록의 페이지네이션 정보 (Query)
 * @returns {Promise<object>} 추가된 재료가 포함된 목록
 */
export const addIngredient = async (ingredientData, pageable) => {
  try {
    // 💡 memberId 제거
    const params = { ...pageable };
    // POST: (URL, Body, Config(Params)) 순서
    const response = await apiClient.post(
      "/api/fridge/ingredients",
      ingredientData,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("냉장고 재료 추가 API 오류:", error);
    throw error;
  }
};

/**
 * PATCH /api/fridge/ingredients
 * 냉장고 재료 목록 수정 (일괄 수정)
 * @param {Array<object>} updateRequests - 수정 요청 목록 (Body)
 * @param {object} pageable - 수정 후 반환받을 목록의 페이지네이션 정보 (Query)
 * @returns {Promise<object>} 수정된 재료가 포함된 목록
 */
export const updateIngredients = async (updateRequests, pageable) => {
  try {
    // 💡 memberId 제거
    const params = { ...pageable };
    // PATCH: (URL, Body, Config(Params)) 순서
    const response = await apiClient.patch(
      "/api/fridge/ingredients",
      updateRequests,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("냉장고 재료 수정 API 오류:", error);
    throw error;
  }
};

/**
 * DELETE /api/fridge/ingredients/{fridgeIngredientId}
 * 냉장고 재료 삭제
 * @param {number} fridgeIngredientId - 삭제할 냉장고 재료 ID (Path)
 * @param {object} pageable - 삭제 후 반환받을 목록의 페이지네이션 정보 (Query)
 * @returns {Promise<object>} 삭제 후 남은 재료가 포함된 목록
 */
export const deleteIngredient = async (fridgeIngredientId, pageable) => {
  try {
    // 💡 memberId 제거
    const params = { ...pageable };
    // DELETE: (URL, Config(Params)) 순서. 서버가 응답 데이터(response.data)를 반환하는 경우를 대비해 반환값 유지.
    const response = await apiClient.delete(
      `/api/fridge/ingredients/${fridgeIngredientId}`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("냉장고 재료 삭제 API 오류:", error);
    throw error;
  }
};
