import { atom } from "jotai";
import { LoginInfoItem } from "@/types/user";

// 유저 정보 atom (로그인 전에는 null)
export const userInfoAtom = atom<LoginInfoItem | null>(null);

// 인증 확인 중 여부 (앱 시작 시 /users/me 호출 중)
export const isAuthLoadingAtom = atom(true);

// 로그인 여부를 파생하는 read-only atom
export const isLoggedInAtom = atom((get) => get(userInfoAtom) !== null);
