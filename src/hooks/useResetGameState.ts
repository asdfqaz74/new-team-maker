import { useSetAtom } from "jotai";
import { useCallback } from "react";
import {
  captainPlayerAtom,
  blueCaptainAtom,
  redCaptainAtom,
  sessionPlayersAtom,
  loginSessionPlayersAtom,
  waitingPlayersAtom,
  blueTeamAtom,
  redTeamAtom,
  currentTurnAtom,
  remainingPicksAtom,
  playerInfoAtom,
} from "@/store/player.store";

/**
 * 게임 관련 상태들을 초기화하는 훅
 * 로그인/로그아웃 시 호출하여 이전 세션의 데이터를 정리합니다.
 */
export const useResetGameState = () => {
  const setCaptainPlayer = useSetAtom(captainPlayerAtom);
  const setBlueCaptain = useSetAtom(blueCaptainAtom);
  const setRedCaptain = useSetAtom(redCaptainAtom);
  const setSessionPlayers = useSetAtom(sessionPlayersAtom);
  const setLoginSessionPlayers = useSetAtom(loginSessionPlayersAtom);
  const setWaitingPlayers = useSetAtom(waitingPlayersAtom);
  const setBlueTeam = useSetAtom(blueTeamAtom);
  const setRedTeam = useSetAtom(redTeamAtom);
  const setCurrentTurn = useSetAtom(currentTurnAtom);
  const setRemainingPicks = useSetAtom(remainingPicksAtom);
  const setPlayerInfo = useSetAtom(playerInfoAtom);

  const resetGameState = useCallback(() => {
    // 팀장 관련 상태 초기화
    setCaptainPlayer(null);
    setBlueCaptain(null);
    setRedCaptain(null);

    // 세션 플레이어 목록 초기화
    setSessionPlayers([]);
    setLoginSessionPlayers([]);

    // 선수 정보 초기화
    setPlayerInfo([]);

    // 드래프트 상태 초기화
    setWaitingPlayers([]);
    setBlueTeam([]);
    setRedTeam([]);
    setCurrentTurn("blue");
    setRemainingPicks(1);
  }, [
    setCaptainPlayer,
    setBlueCaptain,
    setRedCaptain,
    setSessionPlayers,
    setLoginSessionPlayers,
    setWaitingPlayers,
    setBlueTeam,
    setRedTeam,
    setCurrentTurn,
    setRemainingPicks,
    setPlayerInfo,
  ]);

  return { resetGameState };
};
