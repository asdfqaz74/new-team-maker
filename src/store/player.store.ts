import { atom } from "jotai";
import {
  LoginStoredPlayers,
  ParticipantPlayer,
  StoredPlayers,
} from "@/types/team-maker";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<StoredPlayers | null>(() => localStorage);

// 비로그인 전용
// localStorage와 자동 동기화되는 플레이어 목록 atom
export const playersAtom = atomWithStorage<StoredPlayers | null>(
  "players",
  null,
  {
    ...storage,
    getItem: (key, initialValue) => {
      const value = storage.getItem(key, initialValue);

      if (!value) return initialValue;

      if (Date.now() > value.expiresAt) {
        storage.removeItem(key);
        return initialValue;
      }
      return value;
    },
  }
);

// 로그인 전용
// localStorage와 자동 동기화되는 플레이어 목록 atom
export const loginPlayersAtom = atomWithStorage<LoginStoredPlayers | null>(
  "loginPlayers",
  null,
  createJSONStorage<LoginStoredPlayers | null>(() => localStorage)
);

// 리스트에서 추가된 플레이어 세션스토리지 저장 atom
export const sessionPlayersAtom = atomWithStorage<ParticipantPlayer[]>(
  "sessionPlayers",
  [],
  createJSONStorage<ParticipantPlayer[]>(() => sessionStorage)
);

// hydration 완료 여부 (SSR → CSR 전환 감지)
export const isPlayersHydratedAtom = atom(false);
