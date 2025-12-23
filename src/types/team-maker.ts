// 비로그인 플레이어 타입
export type ParticipantPlayer = {
  id: string;
  name: string;
};

export type StoredPlayers = {
  value: ParticipantPlayer[];
  expiresAt: number;
};
