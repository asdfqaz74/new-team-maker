import { PlayerListDetailData } from "@/types/mypage";
import { MatchItem } from "@/types/stats";
import { atom } from "jotai";

// 대시보드 플레이어 목록
export const dashboardPlayerList = atom<PlayerListDetailData | null>(null);

// 대시보드 최근 경기 목록
export const dashboardRecentMatches = atom<MatchItem[] | null>(null);
