import { create } from 'zustand';
import {
    addIngredient,
    deleteIngredient,
    getFridgeIngredients,
    updateIngredients,
} from '../api/fridge'; // 경로 확인 필요

const useFridgeStore = create((set, get) => ({
    // =================================================
    // [State]
    // =================================================
    ingredients: [],
    isLoading: false,
    error: null,

    pageable: {
        page: 0,
        size: 100,
        sort: [],
    },

    paginationInfo: {
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: true,
        empty: true,
    },

    // =================================================
    // [Actions]
    // =================================================

    /**
     * ✅ 목록 조회 (내부 로직 강화)
     * - targetPage 인자가 있으면 해당 페이지를 강제로 요청합니다. (State 의존성 제거)
     */
    fetchIngredients: async (targetPage = null) => {
        const { pageable, ingredients, isLoading } = get();

        // targetPage가 명시되었으면 pageable 상태를 먼저 업데이트
        let reqPage = pageable.page;
        if (targetPage !== null) {
            reqPage = targetPage;
            set((state) => ({ pageable: { ...state.pageable, page: reqPage } }));
        }

        // 로딩 상태 시작 (첫 페이지거나 명시적 갱신일 때만 로딩 표시 추천)
        if (reqPage === 0) set({ isLoading: true, error: null });

        try {
            // 변경된 reqPage를 포함하여 요청
            const reqPageable = { ...pageable, page: reqPage };
            const response = await getFridgeIngredients(reqPageable);

            // 0페이지면 덮어쓰기, 아니면 이어붙이기
            const newIngredients = reqPage === 0
                ? response.content
                : [...ingredients, ...response.content];

            set({
                ingredients: newIngredients,
                paginationInfo: {
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    number: response.number,
                    first: response.first,
                    last: response.last,
                    empty: response.empty,
                },
                isLoading: false
            });
        } catch (error) {
            console.error("Fetch Error:", error);
            set({ error, isLoading: false });
        }
    },

    /**
     * ✅ [새로고침] 0페이지부터 강제 로드
     */
    refreshIngredients: async () => {
        // fetchIngredients에 0을 직접 전달하여 상태 꼬임 방지
        await get().fetchIngredients(0);
    },

    /**
     * ✅ [더보기] 다음 페이지 로드
     */
    loadMoreIngredients: async () => {
        const { pageable, paginationInfo, isLoading } = get();
        if (isLoading || paginationInfo.last) return;

        // 현재 페이지 + 1 요청
        await get().fetchIngredients(pageable.page + 1);
    },

    // -------------------------------------------------
    // CUD 작업 (낙관적 업데이트 + 서버 동기화)
    // -------------------------------------------------

    /**
     * 재료 추가
     */
    addIngredientItem: async (ingredientData) => {
        // 1. [서버 요청] 추가는 정렬 순서를 모르므로 낙관적 업데이트가 어렵습니다.
        //    대신 로딩을 확실하게 보여줍니다.
        set({ isLoading: true, error: null });

        try {
            const { pageable } = get();
            await addIngredient(ingredientData, pageable);

            // 2. [완료 후 새로고침]
            await get().refreshIngredients();
        } catch (error) {
            set({ error, isLoading: false });
        }
    },

    /**
     * 재료 수정 (낙관적 업데이트 적용)
     * - 화면에서 먼저 값을 바꾸고, 나중에 서버와 맞춥니다.
     */
    updateIngredientItems: async (updateRequests) => {
        // 1. [낙관적 업데이트] 화면 먼저 갱신
        set((state) => ({
            ingredients: state.ingredients.map((item) => {
                // 수정 요청 목록에서 현재 아이템 ID와 일치하는 것을 찾음
                const update = updateRequests.find(
                    (req) => req.fridgeIngredientId === item.fridgeIngredientId
                );

                // 찾았으면 기존 값 + 수정된 값 병합 (메모, 수량 등 업데이트)
                return update ? { ...item, ...update } : item;
            })
        }));

        try {
            const { pageable } = get();
            // 2. [서버 요청]
            await updateIngredients(updateRequests, pageable);

            // 3. [데이터 정합성] 혹시 모를 차이를 위해 조용히 새로고침
            // (이미 화면은 바뀌어 있어서 사용자는 딜레이를 못 느낌)
            await get().refreshIngredients();
        } catch (error) {
            console.error("Update Error:", error);
            // 에러 발생 시 원상복구(다시 불러오기)
            await get().refreshIngredients();
        }
    },

    /**
     * 재료 삭제 (낙관적 업데이트 적용)
     */
    removeIngredientItem: async (fridgeIngredientId) => {
        // 1. [낙관적 업데이트] 리스트에서 즉시 제외
        set((state) => ({
            ingredients: state.ingredients.filter(
                (item) => item.fridgeIngredientId !== fridgeIngredientId
            ),
        }));

        try {
            const { pageable } = get();
            // 2. [서버 요청]
            await deleteIngredient(fridgeIngredientId, pageable);

            // 3. [데이터 정합성]
            await get().refreshIngredients();
        } catch (error) {
            console.error("Delete Error:", error);
            // 에러 시 복구
            await get().refreshIngredients();
        }
    },

    setPageable: (newPageable) => {
        set((state) => ({
            pageable: { ...state.pageable, ...newPageable }
        }));
    },
}));

export default useFridgeStore;