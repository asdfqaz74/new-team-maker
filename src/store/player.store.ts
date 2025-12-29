import { atom } from "jotai";
import { ParticipantPlayer, StoredPlayers } from "@/types/team-maker";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { PlayersListItem } from "@/api/team-maker.api";

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
// 대기명단 자동 동기화되는 플레이어 목록 atom
export const loginPlayersAtom = atom<ParticipantPlayer[] | null>(null);

// 리스트에서 추가된 플레이어 세션스토리지 저장 비로그인 atom
export const sessionPlayersAtom = atomWithStorage<ParticipantPlayer[]>(
  "sessionPlayers",
  [],
  createJSONStorage<ParticipantPlayer[]>(() => sessionStorage)
);
// 리스트에서 추가된 플레이어 세션스토리지 저장 로그인전용
export const loginSessionPlayersAtom = atomWithStorage<ParticipantPlayer[]>(
  "loginSessionPlayers",
  [],
  createJSONStorage<ParticipantPlayer[]>(() => sessionStorage)
);

// hydration 완료 여부 (SSR → CSR 전환 감지)
export const isPlayersHydratedAtom = atom(false);

// 팀장에 선택될 플레이어 atom (후보 목록)
export const captainPlayerAtom = atom<ParticipantPlayer[] | null>(null);

// 선수 정보 저장 atom
export const playerInfoAtom = atom<PlayersListItem[]>([]);

// 추첨 결과: 블루팀 팀장
export const blueCaptainAtom = atom<ParticipantPlayer | null>(null);

// 추첨 결과: 레드팀 팀장
export const redCaptainAtom = atom<ParticipantPlayer | null>(null);

// 드래프트용: 대기 플레이어 (팀장 제외)
export const waitingPlayersAtom = atom<ParticipantPlayer[]>([]);

// 드래프트용: 블루팀 멤버
export const blueTeamAtom = atom<ParticipantPlayer[]>([]);

// 드래프트용: 레드팀 멤버
export const redTeamAtom = atom<ParticipantPlayer[]>([]);

// 드래프트용: 현재 턴 ('blue' | 'red')
export const currentTurnAtom = atom<"blue" | "red">("blue");

// 드래프트용: 현재 턴에서 뽑을 수 있는 인원 수
export const remainingPicksAtom = atom<number>(1);
