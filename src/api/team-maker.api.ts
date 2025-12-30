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
  api.get<PlayersListResponse>("/api/players/list");

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
  return api.post<PlayerListResponse>("/api/team-match/players", { playerIds });
};

/* -------------------------------------------- */
/*                  대기목록 선수 추가                  */
/* -------------------------------------------- */
export interface AddWaitingPlayerRequest {
  playerId: string;
  playerName: string;
}

export interface AddWaitingPlayerItem {
  id: string;
  name: string;
}

export type AddWaitingResponse = {
  success: boolean;
  message: string;
  data?: AddWaitingPlayerItem[];
};

export const addWaitingPlayer = (body: AddWaitingPlayerRequest) => {
  return api.post<AddWaitingResponse>("/api/users/wait-players", body);
};

/* -------------------------------------------- */
/*                  대기목록 선수 삭제                  */
/* -------------------------------------------- */
export interface DeleteWaitPlayerParams {
  playerId: string;
}

export interface DeleteWaitingPlayerItem {
  id: string;
  name: string;
}

export type DeleteWaitingResponse = {
  success: boolean;
  message: string;
  data?: DeleteWaitingPlayerItem[];
};

export const deleteWaitingPlayer = (params: DeleteWaitPlayerParams) => {
  return api.delete<DeleteWaitingResponse>(
    `/api/users/wait-players/${params.playerId}`
  );
};

/* -------------------------------------------- */
/*                  대기목록 선수 조회                  */
/* -------------------------------------------- */
export type GetWaitingPlayersResponse = {
  success: boolean;
  message: string;
  data: AddWaitingPlayerItem[];
};

export const getWaitingPlayers = () => {
  return api.get<GetWaitingPlayersResponse>("/api/users/wait-players");
};
