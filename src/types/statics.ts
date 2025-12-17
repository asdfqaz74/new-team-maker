import { ResponseStructure } from "./common";

/* -------------------------------------------- */
/*              가장 많이 픽된 챔피언 통계 조회              */
/* -------------------------------------------- */
export interface MostPickedChampionStatItem {
  _id: string;
  chmapionId: string;
  championName: string;
  pickRate: number;
  totalGames: number;
  winRate: number;
}

export interface MostPickedChampionStatData {
  stats: MostPickedChampionStatItem[];
}

export type MostPickedChampionStatResponse =
  ResponseStructure<MostPickedChampionStatData>;

/* -------------------------------------------- */
/*                   나머지 통계 조회                  */
/* -------------------------------------------- */
export interface HighestWinRateChampionItem {
  _id: string;
  championId: string;
  championName: string;
  pickRate: number;
  totalGames: number;
  winRate: number;
}

export interface HighestBanRateChampionItem {
  _id: string;
  championId: string;
  championName: string;
  banRate: number;
  banCount: number;
  pickRate: number;
  winRate: number;
  totalGames: number;
}

// 포지션별 통계
export interface PositionStats {
  games: number;
  wins: number;
  winRate: number;
}

// 포지션 타입
export type Position = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";

// 포지션별 승률 챔피언 아이템
export interface HighestWinRateChampionsByPositionItem {
  _id: string;
  championId: string;
  championName: string;
  byPosition: Partial<Record<Position, PositionStats>>;
}

// 포지션별 승률 챔피언 데이터
export type HighestWinRateChampionsByPositionData = Record<
  Position,
  HighestWinRateChampionsByPositionItem[]
>;

export interface TopPlayersByWinRateItem {
  _id: string;
  playerId: string;
  gameName: string;
  tagLine: string;
  totalGames: number;
  winRate: number;
}

export interface StatsOverviewData {
  highestWinRateChampions: HighestWinRateChampionItem[];
  highestBanRateChampions: HighestBanRateChampionItem[];
  highestWinRateChampionsByPosition: HighestWinRateChampionsByPositionData;
  topPlayersByWinRate: TopPlayersByWinRateItem[];
}

export type StatsOverviewResponse = ResponseStructure<StatsOverviewData>;
