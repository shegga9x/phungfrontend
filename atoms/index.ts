import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

import { shoppingCartItemProps, BookProps, PAGE_SIZE } from "@/const";
import { UserResponse } from "@/models/user/UserResponse";

export const homePageBookSumState = atom({
  key: "homePageBookSumState",
  default: 0,
});

export const shoppingCartState = atom<shoppingCartItemProps[]>({
  key: "shoppingCartState",
  default: [],
});

export const bookTypeListState = atom<string[]>({
  key: "bookTypeListState",
  default: [],
});

export const homePageQueryState = atom({
  key: "homePageQueryState",
  default: { page: 0, type: "", sort: "", size: PAGE_SIZE },
});

export const bookDetailsIdState = atom({
  key: "bookDetailsIdState",
  default: "",
});

export const currentUserIdState = atom<UserResponse | null>({
  key: "currentUserIdState",
  default: null,
});
