import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// localStorage와 자동 동기화되는 플레이어 목록 atom
export const playersAtom = atomWithStorage<string[]>("players", []);

// hydration 완료 여부 (SSR → CSR 전환 감지)
export const isPlayersHydratedAtom = atom(false);
