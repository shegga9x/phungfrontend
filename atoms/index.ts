import { atom, atomFamily, RecoilState, selector, useRecoilState, useRecoilValue } from "recoil";

import { shoppingCartItemProps, BookProps, PAGE_SIZE } from "@/const";
import { UserResponse } from "@/models/user/UserResponse";

export const homePageBookSumState = atom({
  key: "homePageBookSumState",
  default: 0,
});

export const bookTypeListState = atom<string[]>({
  key: "bookTypeListState",
  default: [],
});

export const homePageQueryState = atom({
  key: "homePageQueryState",
  default: { page: 0, type: "", sort: "", size: PAGE_SIZE, title: "" },
});

export const bookDetailsIdState = atom({
  key: "bookDetailsIdState",
  default: "",
});

export const currentUserState = atom<UserResponse | null>({
  key: "currentUserState",
  default: null,
});

export const cartState = atom<shoppingCartItemProps[]>({
  key: "cartState",
  default: [], // Default empty cart
});

export const cartLoadingStage = atom({
  key: "cartLoadingAtom",
  default: false, // Initially not loading
});

export const currentCartUpdateItemStage = atom({
  key: "currentCartUpdateItemStage",
  default: "", // Initially not loading
});

export const gHNAvailableServicesSelectedState = atom<number | null>({
  key: "gHNAvailableServicesSelectedState",
  default: null, // Initially not loading
});


export const refrshAble = atom({
  key: "refrshAble",
  default: false, // Default to true since the user starts on the page
});
