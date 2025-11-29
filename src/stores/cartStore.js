import { create } from 'zustand';
import {
    addBasketIngredient,
    deleteAllBasketIngredients,
    deleteBasketIngredient,
    getBasketIngredients,
} from '../api/basket'; // API 파일 경로에 맞게 수정해주세요.

const useCartStore = create((set, get) => ({
    // =================================================
    // [State] 장바구니 상태 데이터
    // =================================================
    cartItems: [], // 장바구니 아이템 목록 (response.content)
    isLoading: false,
    error: null,

    // Request용: 페이지네이션 설정
    pageable: {
        page: 0,
        size: 100, // 한 번에 많이 조회 (기본 100)
        sort: [],
    },

    // Response용: 메타데이터
    paginationInfo: {
        totalElements: 0,
        totalPages: 0,
        number: 0,
        first: true,
        last: true,
        empty: true,
    },

    // =================================================
    // [Actions] 데이터 조회 (Read)
    // =================================================

    /**
     * 장바구니 목록 조회 (내부 로직)
     * - targetPage가 있으면 해당 페이지 로드
     * - 없으면 현재 pageable.page 로드
     */
    fetchCartItems: async (targetPage = null) => {
        const { pageable, cartItems, isLoading } = get();

        // targetPage가 명시되면 페이지 상태 업데이트
        let reqPage = pageable.page;
        if (targetPage !== null) {
            reqPage = targetPage;
            set((state) => ({ pageable: { ...state.pageable, page: reqPage } }));
        }

        // 첫 페이지 로드 시에만 로딩 표시 (UX 최적화)
        if (reqPage === 0) set({ isLoading: true, error: null });

        try {
            const reqPageable = { ...pageable, page: reqPage };
            const response = await getBasketIngredients(reqPageable);

            // 0페이지면 덮어쓰기, 아니면 이어붙이기 (무한 스크롤 지원)
            const newItems = reqPage === 0
                ? response.content
                : [...cartItems, ...response.content];

            set({
                cartItems: newItems,
                paginationInfo: {
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    number: response.number,
                    first: response.first,
                    last: response.last,
                    empty: response.empty,
                },
                isLoading: false,
            });
        } catch (error) {
            console.error("Cart Fetch Error:", error);
            set({ error, isLoading: false });
        }
    },

    /**
     * [4. 저장소의 내용물 모두 불러오기]
     * - 새로고침 (페이지 0부터 다시 로드)
     */
    refreshCartItems: async () => {
        await get().fetchCartItems(0);
    },

    /**
     * 더보기 (다음 페이지 로드)
     */
    loadMoreCartItems: async () => {
        const { pageable, paginationInfo, isLoading } = get();
        if (isLoading || paginationInfo.last) return;

        await get().fetchCartItems(pageable.page + 1);
    },

    // =================================================
    // [Actions] 데이터 변경 (CUD)
    // =================================================

    /**
     * [1. 저장소에 내용물 추가]
     * @param {number} ingredientId - 추가할 재료 ID (식재료 자체 ID)
     */
    addItemToCart: async (ingredientId) => {
        set({ isLoading: true, error: null });
        try {
            const { pageable } = get();
            console.log("zustand 요청 파라미타", ingredientId);
            // API 호출
            await addBasketIngredient(ingredientId, pageable);

            // 추가 후 목록 새로고침 (서버 데이터와 동기화)
            await get().refreshCartItems();
        } catch (error) {
            console.error("Cart Add Error:", error);
            set({ error, isLoading: false });
        }
    },

    /**
     * [2. 저장소에 내용물 삭제]
     * @param {number} basketIngredientId - 삭제할 장바구니 항목 ID (PK)
     */
    removeItemFromCart: async (basketIngredientId) => {
        // [낙관적 업데이트] 화면에서 즉시 제거
        set((state) => ({
            cartItems: state.cartItems.filter(
                (item) => item.basketIngredientId !== basketIngredientId
            ),
        }));

        try {
            const { pageable } = get();

            // API 호출
            await deleteBasketIngredient(basketIngredientId, pageable);

            // 데이터 정합성을 위해 백그라운드 새로고침
            await get().refreshCartItems();
        } catch (error) {
            console.error("Cart Remove Error:", error);
            // 에러 발생 시 목록 원상복구
            await get().refreshCartItems();
        }
    },

    /**
     * [3. 저장소의 내용물 모두 삭제]
     */
    clearCart: async () => {
        // [낙관적 업데이트] 화면에서 즉시 전체 비움
        const previousItems = get().cartItems; // 백업용
        set({ cartItems: [] });

        try {
            const { pageable } = get();

            // API 호출
            await deleteAllBasketIngredients(pageable);

            // 데이터 정합성 확인
            await get().refreshCartItems();
        } catch (error) {
            console.error("Cart Clear Error:", error);
            // 에러 발생 시 원상복구 (혹은 다시 불러오기)
            set({ cartItems: previousItems });
            await get().refreshCartItems();
        }
    },

    // 페이지네이션 설정 변경
    setPageable: (newPageable) => {
        set((state) => ({
            pageable: { ...state.pageable, ...newPageable },
        }));
    },
}));

export default useCartStore;