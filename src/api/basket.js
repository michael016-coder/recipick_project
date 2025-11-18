// RECIPICK/api/basket.js

import apiClient from "./api.js";
// 💡 apiClient가 AccessToken을 자동으로 첨부하므로 memberId는 불필요합니다.

// ===================================
//          장바구니 (Basket Controller)
// ===================================

/**
 * GET /api/basket/ingredients
 * 장바구니 재료 목록 조회
 * @param {object} pageable - 페이지네이션 정보 (page, size, sort 등)
 * @returns {Promise<object>} 재료 목록 및 페이지 정보
 */
export const getBasketIngredients = async (pageable) => {
  try {
    // 💡 memberId 제거. 서버에서 AccessToken을 통해 사용자 식별
    const params = {
      ...pageable,
    };
    const response = await apiClient.get("/api/basket/ingredients", { params });
    return response.data;
  } catch (error) {
    console.error("장바구니 재료 조회 API 오류:", error);
    throw error;
  }
};

/**
 * POST /api/basket/ingredients
 * 장바구니에 재료 추가
 * @param {number} ingredientId - 추가할 재료 ID
 * @param {object} pageable - 추가 후 반환받을 목록의 페이지네이션 정보
 * @returns {Promise<object>} 추가된 재료가 포함된 목록
 */
export const addBasketIngredient = async (ingredientId, pageable) => {
  try {
    // 💡 memberId 제거. ingredientId와 pageable을 쿼리로 사용
    const params = {
      ingredientId,
      ...pageable,
    };
    // POST 요청 시 Body는 null/빈 객체로, 쿼리 파라미터는 세 번째 인자로 전달
    const response = await apiClient.post("/api/basket/ingredients", null, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("장바구니 재료 추가 API 오류:", error);
    throw error;
  }
};

/**
 * DELETE /api/basket/ingredients/{basketIngredientId}
 * 장바구니의 특정 재료 삭제
 * @param {number} basketIngredientId - 삭제할 장바구니 재료 ID (Path Variable)
 * @param {object} pageable - 삭제 후 반환받을 목록의 페이지네이션 정보 (Query Parameter)
 * @returns {Promise<void>}
 */
export const deleteBasketIngredient = async (basketIngredientId, pageable) => {
  try {
    // 💡 memberId 제거
    const params = {
      ...pageable,
    };
    await apiClient.delete(`/api/basket/ingredients/${basketIngredientId}`, {
      params,
    });
    // 응답 데이터가 없으므로 반환 값 없음 (void)
  } catch (error) {
    console.error("장바구니 재료 삭제 API 오류:", error);
    throw error;
  }
};

/**
 * DELETE /api/basket/ingredients/all
 * 장바구니의 모든 재료 전체 삭제
 * @param {object} pageable - 삭제 후 반환받을 목록의 페이지네이션 정보 (Query Parameter)
 * @returns {Promise<void>}
 */
export const deleteAllBasketIngredients = async (pageable) => {
  try {
    // 💡 memberId 제거
    const params = {
      ...pageable,
    };
    await apiClient.delete("/api/basket/ingredients/all", { params });
    // 응답 데이터가 없으므로 반환 값 없음 (void)
  } catch (error) {
    console.error("장바구니 재료 전체 삭제 API 오류:", error);
    throw error;
  }
};
