import { PlayerListDetailResponse, RecentMatchResponse } from "@/types/mypage";
import { api } from ".";

/* -------------------------------------------- */
/*               플레이어 목록 조회 (대시보드)              */
/* -------------------------------------------- */

export const getDashboardPlayerList = () =>
  api.get<PlayerListDetailResponse>("/mypage/list");

/* -------------------------------------------- */
/*              유저 최근 경기 조회 (대시보드)              */
/* -------------------------------------------- */

export const getDashboardRecentMatches = () =>
  api.get<RecentMatchResponse>("/mypage/stats");
