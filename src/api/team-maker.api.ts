import { api } from ".";

interface PlayerItem {
  _id: string;
  realName: string;
  gameName: string;
  tagLine: string;
}

interface PlayerListData {
  totalCount: number;
  list: PlayerItem[];
}

type PlayersListResponse = {
  success: boolean;
  message: string;
  data: PlayerListData;
};

// 선수 목록 조회 (간단)
export const getSimplePlayersList = () =>
  api.get<PlayersListResponse>("/players/list");

export interface PlayersListItem {
  playerId: string;
  gameName: string;
  tagLine: string;
  realName: string;
  mainPosition: string;
  subPosition: string;
  subPosition2?: string;
  recentWinRate: number;
  recentGames: number;
}

interface PlayerListItemData {
  players: PlayersListItem[];
}

type PlayerListResponse = {
  success: boolean;
  message: string;
  data: PlayerListItemData;
};

// 선수 조회 (리스트 response)
export const getPlayerList = (playerIds: string[]) => {
  return api.post<PlayerListResponse>("/team-match/players", { playerIds });
};
