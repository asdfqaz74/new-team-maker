// 비로그인 플레이어 타입
export type ParticipantPlayer = {
  id: string;
  name: string;
};

export type StoredPlayers = {
  value: ParticipantPlayer[];
  expiresAt: number;
};

// 대기명단 플레이어 타입 (로그인)
export type WaitingListResponse = {
  success: boolean;
  message: string;
  data: ParticipantPlayer[];
};
