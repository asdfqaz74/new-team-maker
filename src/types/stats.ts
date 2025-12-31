export type MatchPlayer = {
  _id: string;
  matchId: string;
  playerId: string;

  riotIdGameName: string;
  riotIdTagLine: string;

  champion: string;
  team: "BLUE" | "RED";
  position: "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";

  win: boolean;

  level: string;
  kills: string;
  deaths: string;
  assists: string;

  doubleKills: string;
  tripleKills: string;
  quadraKills: string;
  pentaKills: string;

  goldEarned: string;
  creepScore: string;

  magicDamageDealt: string;
  magicDamageToChampions: string;
  magicDamageTaken: string;

  physicalDamageDealt: string;
  physicalDamageToChampions: string;
  physicalDamageTaken: string;

  trueDamageDealt: string;
  trueDamageToChampions: string;
  trueDamageTaken: string;

  totalDamageDealt: string;
  totalDamageToChampions: string;
  totalDamageTaken: string;

  visionScore: string;
  controlWardsBought: string;
  wardsKilled: string;
  wardsPlaced: string;

  items: Item[];
  perks: Perks;
  summonerSpells: SummonerSpell[];
};

export type Item = {
  id: string;
  name: string;
};

export type SummonerSpell = {
  id: string;
  name: string;
};

export type Perks = {
  primaryStyle: RuneStyle;
  subStyle: RuneStyle;
  statPerks: string[];
};

export type RuneStyle = {
  style: {
    id: string;
    name: string;
  };
  keystone?: Rune; // subStyle에는 없음
  slots: Rune[];
};

export type Rune = {
  id: string;
  name: string;
};

// 경기 정보 최종 아이템
export type MatchItem = {
  _id: string;
  metadata: {
    gameLength: number;
    gameDuration: number;
    winTeam: "BLUE" | "RED";
    playTime: string;
  };
  playedAt: string;
  players: MatchPlayer[];
};
