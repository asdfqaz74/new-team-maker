import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { LoginInfoItem } from "@/types/user";

// SSR 환경에서 안전한 storage 생성
const storage = createJSONStorage<LoginInfoItem | null>(() =>
  typeof window !== "undefined"
    ? localStorage
    : (undefined as unknown as Storage)
);

// 유저 정보 atom (로그인 전에는 null) - localStorage에 persist
export const userInfoAtom = atomWithStorage<LoginInfoItem | null>(
  "userInfo",
  null,
  storage,
  { getOnInit: true } // 초기화 시 즉시 localStorage에서 로드
);

// Hydration 완료 여부 atom
export const isHydratedAtom = atom(false);

// 로그인 여부를 파생하는 read-only atom
export const isLoggedInAtom = atom((get) => get(userInfoAtom) !== null);
