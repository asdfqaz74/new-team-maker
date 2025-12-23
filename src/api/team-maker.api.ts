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
