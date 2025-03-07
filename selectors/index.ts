import { selector, selectorFamily } from "recoil";
import {
  bookDetailsIdState, cartLoadingStage,
  cartState, currentUserState, homePageQueryState,
  refrshAble
} from "@/atoms";
import {
  fetchBookDetailsById,
  fetchBookRatingsById,
  fetchBooks,
  fetchAddressList,
  fetchShippingInfo,
  getAvailableServices,
  getCart,
  updateCart,
} from "@/lib/http";
import { shoppingCartItemProps } from "@/const";

export const homePageQuery = selector({
  key: "homePage",
  get: async ({ get }) => {
    const { page, size, type, sort, title } = get(homePageQueryState);
    const response = await fetchBooks({ page, size, type, sort, title });
    return response;
  },
});

export const bookInfoQuery = selector({
  key: "BookInfoQuery",
  get: async ({ get }) => {
    const bookID = get(bookDetailsIdState);
    const response = await fetchBookDetailsById(bookID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

export const bookRatingQuery = selector({
  key: "BookRatingQuery",
  get: async ({ get }) => {
    const bookID = get(bookDetailsIdState);
    if (!bookID) {
      throw new Error('Required bookID');
    }
    const response = await fetchBookRatingsById(bookID);
    if (response.error) {
      throw response.error;
    }
    return response;
  },
});

export const provinceListQuery = selector({
  key: "provinceListQuery",
  get: async ({ get }) => {
    const response = await fetchAddressList("province", 1);
    return response;
  },
});

export const userShippingInfoQuery = selector({
  key: "userShippingInfoQuery",
  get: async ({ get }) => {
    const user = get(currentUserState);
    if (user) {
      const response = await fetchShippingInfo(user?.id);

      return response;
    }
    return null;
  },
});

export const getAvailableServicesQuery = selector({
  key: "getAvailableServicesQuery",
  get: async ({ get }) => {
    const user = get(currentUserState);
    if (user) {
      const response = await getAvailableServices(user?.id);
      return response;
    }
    return null;
  },
});


export const getCartQuery = selector<shoppingCartItemProps[]>({
  key: "getCartQuery",
  get: async ({ get }) => {
    const user = get(currentUserState);
    if (user) {
      const response = await getCart(user?.id);
      return [];
    }
    return [];
  },
});


export const cartSelector = selector<shoppingCartItemProps[]>({
  key: "cartSelector",
  get: async ({ get }) => {
    const isRefrshAble = get(refrshAble); // Get tab state
    const user = get(currentUserState);
    const numericUserId = Number(user?.id); // Ensure it's a number
    if (!numericUserId) return []; // If userId is invalid, return empty
    const existingCart: shoppingCartItemProps[] = get(cartState);
    if (!isRefrshAble && existingCart.length > 0) return existingCart;    // Fetch cart from API
    try {
      const response = await getCart(numericUserId);
      if (response.content) {
        const result = response.content;
        return result as unknown as shoppingCartItemProps[];
      }
    } catch (error) {
      console.log(error);
    }

    return [];
  },
  set: ({ set }, newCart) => {
    set(cartState, newCart); // Update atom state
  },
});