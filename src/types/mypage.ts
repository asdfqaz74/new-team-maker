import { MatchItem } from "./stats";
/* -------------------------------------------- */
/*               플레이어 목록 조회 (대시보드)              */
/* -------------------------------------------- */
export interface PlayerListItem {
  realName: string;
  gameName: string;
  tagLine: string;
  mainPosition: string;
  subPosition: string;
  subPosition2?: string;
}

export interface PlayerListDetailData {
  first: PlayerListItem[];
  second: PlayerListItem[];
}

export type PlayerListDetailResponse = {
  success: boolean;
  message: string;
  data?: PlayerListDetailData;
};

/* -------------------------------------------- */
/*              유저 최근 경기 조회 (대시보드)              */
/* -------------------------------------------- */
export type RecentMatchResponse = {
  success: boolean;
  message: string;
  data?: MatchItem[];
};
