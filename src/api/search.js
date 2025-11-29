import apiClient from "./api.js";


//size 쿼리 제외, 기본적으로 10개 받음
export const searchRequest = async (searchName) => {
    try {
        const Query = String(searchName);
        const response = await apiClient.get("/api/ingredients/autocomplete", {
            params: { q: searchName }
        });
        return response.data;
    } catch (error) {
        console.error("검색 API 오류:", error);
        throw error;
    }
  };