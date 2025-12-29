"use client";

import {
  blueCaptainAtom,
  blueTeamAtom,
  currentTurnAtom,
  loginSessionPlayersAtom,
  playerInfoAtom,
  redCaptainAtom,
  redTeamAtom,
  remainingPicksAtom,
  sessionPlayersAtom,
  waitingPlayersAtom,
} from "@/store/player.store";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState, useCallback } from "react";
import type { ParticipantPlayer } from "@/types/team-maker";
import { isLoggedInAtom } from "@/store/user.store";

// 히스토리 타입 정의
type DraftHistory = {
  waitingPlayers: ParticipantPlayer[];
  blueTeam: ParticipantPlayer[];
  redTeam: ParticipantPlayer[];
  currentTurn: "blue" | "red";
  remainingPicks: number;
};

const MakeTeam = () => {
  const blueCaptain = useAtomValue(blueCaptainAtom);
  const redCaptain = useAtomValue(redCaptainAtom);
  const isLogin = useAtomValue(isLoggedInAtom);
  const candidatePlayers = useAtomValue(
    isLogin ? loginSessionPlayersAtom : sessionPlayersAtom
  );

  const playersInfo = useAtomValue(playerInfoAtom);

  // playerId로 선수 정보 찾기
  const getPlayerInfo = (playerId: string) => {
    return playersInfo.find((p) => p.playerId === playerId);
  };

  // 포지션 약자 변환
  const getPositionShort = (position: string) => {
    const posMap: Record<string, string> = {
      TOP: "탑",
      JUNGLE: "정글",
      MIDDLE: "미드",
      BOTTOM: "원딜",
      UTILITY: "서폿",
    };
    return posMap[position.toUpperCase()] || position;
  };

  const [waitingPlayers, setWaitingPlayers] = useAtom(waitingPlayersAtom);
  const [blueTeam, setBlueTeam] = useAtom(blueTeamAtom);
  const [redTeam, setRedTeam] = useAtom(redTeamAtom);
  const [currentTurn, setCurrentTurn] = useAtom(currentTurnAtom);
  const [remainingPicks, setRemainingPicks] = useAtom(remainingPicksAtom);

  // 히스토리 스택 (되돌아가기용)
  const [history, setHistory] = useState<DraftHistory[]>([]);

  // 초기 상태 저장용
  const [initialWaiting, setInitialWaiting] = useState<ParticipantPlayer[]>([]);

  // 초기화 함수
  const resetDraft = useCallback(() => {
    setWaitingPlayers(initialWaiting);
    setBlueTeam([]);
    setRedTeam([]);
    setCurrentTurn("blue");
    setRemainingPicks(1);
    setHistory([]);
  }, [
    initialWaiting,
    setWaitingPlayers,
    setBlueTeam,
    setRedTeam,
    setCurrentTurn,
    setRemainingPicks,
  ]);

  // 초기화: captainPlayerAtom에서 팀장 제외한 대기 플레이어 설정
  useEffect(() => {
    if (!candidatePlayers || !blueCaptain || !redCaptain) return;

    const filtered = candidatePlayers.filter(
      (p) => p.id !== blueCaptain.id && p.id !== redCaptain.id
    );
    // 초기 상태는 useMemo로 처리하거나 여기서 한번에 설정
    if (initialWaiting.length === 0) {
      setInitialWaiting(filtered);
    }
    setWaitingPlayers(filtered);
    setBlueTeam([]);
    setRedTeam([]);
    setCurrentTurn("blue");
    setRemainingPicks(1);
    setHistory([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidatePlayers, blueCaptain, redCaptain]);

  // 드래프트 순서 계산
  // 블루1 → 레드2 → 블루2 → 레드2 → 블루1(자동)
  const getNextTurn = (
    currentTeam: "blue" | "red",
    currentRemaining: number,
    blueCount: number
  ): { nextTurn: "blue" | "red"; nextPicks: number } => {
    // 픽이 남아있으면 같은 팀 유지
    if (currentRemaining > 1) {
      return { nextTurn: currentTeam, nextPicks: currentRemaining - 1 };
    }

    // 턴 전환
    if (currentTeam === "blue") {
      // 블루 → 레드 (2명)
      return { nextTurn: "red", nextPicks: 2 };
    } else {
      // 레드 → 블루
      // 블루가 이미 3명이면 1명만, 아니면 2명
      const nextBluePicks = blueCount >= 3 ? 1 : 2;
      return { nextTurn: "blue", nextPicks: nextBluePicks };
    }
  };

  // 되돌아가기 핸들러
  const handleUndo = () => {
    if (history.length === 0) return;

    const prevState = history[history.length - 1];
    setWaitingPlayers(prevState.waitingPlayers);
    setBlueTeam(prevState.blueTeam);
    setRedTeam(prevState.redTeam);
    setCurrentTurn(prevState.currentTurn);
    setRemainingPicks(prevState.remainingPicks);
    setHistory((prev) => prev.slice(0, -1));
  };

  // 플레이어 선택 핸들러
  const handleSelectPlayer = (player: ParticipantPlayer) => {
    if (waitingPlayers.length === 0) return;

    // 현재 상태를 히스토리에 저장
    setHistory((prev) => [
      ...prev,
      {
        waitingPlayers: [...waitingPlayers],
        blueTeam: [...blueTeam],
        redTeam: [...redTeam],
        currentTurn,
        remainingPicks,
      },
    ]);

    // 대기 목록에서 제거
    setWaitingPlayers((prev) => prev.filter((p) => p.id !== player.id));

    // 현재 턴의 팀에 추가
    if (currentTurn === "blue") {
      setBlueTeam((prev) => [...prev, player]);
    } else {
      setRedTeam((prev) => [...prev, player]);
    }

    // 다음 턴 계산
    const newBlueCount =
      currentTurn === "blue" ? blueTeam.length + 1 : blueTeam.length;
    const remainingWaiting = waitingPlayers.length - 1;

    // 마지막 1명 자동 배정
    if (remainingWaiting === 1) {
      const lastPlayer = waitingPlayers.find((p) => p.id !== player.id);
      if (lastPlayer) {
        // 블루팀이 아직 4명이 안 됐으면 블루에, 아니면 레드에
        if (newBlueCount < 4) {
          setBlueTeam((prev) => [...prev, lastPlayer]);
        } else {
          setRedTeam((prev) => [...prev, lastPlayer]);
        }
        setWaitingPlayers([]);
        return;
      }
    }

    // 다음 턴으로
    if (remainingWaiting > 0) {
      const { nextTurn, nextPicks } = getNextTurn(
        currentTurn,
        remainingPicks,
        newBlueCount
      );
      setCurrentTurn(nextTurn);
      setRemainingPicks(nextPicks);
    }
  };

  const isComplete = waitingPlayers.length === 0 && blueTeam.length > 0;

  return (
    <div className="w-full max-w-4xl">
      {/* 현재 턴 표시 */}
      {!isComplete && waitingPlayers.length > 0 && (
        <div className="text-center mb-6">
          <p className="text-lg">
            현재 턴:{" "}
            <span
              className={`font-bold ${
                currentTurn === "blue" ? "text-blue-400" : "text-red-400"
              }`}
            >
              {currentTurn === "blue" ? "블루팀" : "레드팀"}
            </span>
            <span className="text-gray-400 ml-2">
              (남은 픽: {remainingPicks})
            </span>
          </p>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        {/* 블루팀 */}
        <div className="flex-1 max-w-xs">
          <h2 className="text-xl font-bold mb-4 text-blue-400 text-center">
            블루팀
          </h2>
          <ul className="space-y-2">
            {/* 팀장 */}
            {blueCaptain && (
              <li className="p-3 bg-blue-900/50 border-2 border-blue-400 rounded-lg">
                <div
                  className={`flex items-center ${
                    isLogin ? "justify-between" : "justify-center"
                  } `}
                >
                  <span>👑 {blueCaptain.name}</span>
                  {getPlayerInfo(blueCaptain.id) && (
                    <span className="text-xs text-gray-400">
                      {getPositionShort(
                        getPlayerInfo(blueCaptain.id)!.mainPosition
                      )}
                    </span>
                  )}
                </div>
                {getPlayerInfo(blueCaptain.id) && (
                  <div className="text-xs text-gray-400 mt-1">
                    승률: {getPlayerInfo(blueCaptain.id)!.recentWinRate}%
                  </div>
                )}
              </li>
            )}
            {/* 팀원 */}
            {blueTeam.map((player) => {
              const info = getPlayerInfo(player.id);
              return (
                <li
                  key={player.id}
                  className="p-3 bg-blue-900/30 border border-blue-600 rounded-lg"
                >
                  <div
                    className={`flex items-center ${
                      isLogin ? "justify-between" : "justify-center"
                    } `}
                  >
                    <span>{player.name}</span>

                    <div>
                      {info && (
                        <span className="text-xs text-gray-400">
                          {getPositionShort(info.mainPosition)}
                        </span>
                      )}
                      {info?.subPosition && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition)}
                        </span>
                      )}
                      {info?.subPosition2 && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {info && (
                    <div className="text-xs text-gray-400 mt-1">
                      승률: {info.recentWinRate}%
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 대기 */}
        <div className="flex-1 max-w-xs">
          <h2 className="text-xl font-bold mb-4 text-gray-400 text-center">
            대기 ({waitingPlayers.length}명)
          </h2>
          <ul className="flex flex-col gap-4">
            {waitingPlayers.map((player) => {
              const info = getPlayerInfo(player.id);
              return (
                <li
                  key={player.id}
                  onClick={() => handleSelectPlayer(player)}
                  className={`p-3 bg-slate-700 rounded-lg transition-colors ${
                    isComplete
                      ? "cursor-default"
                      : "cursor-pointer hover:bg-slate-600"
                  } ${
                    currentTurn === "blue"
                      ? "hover:outline-blue-400 hover:outline-2"
                      : "hover:outline-red-400 hover:outline-2"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      isLogin ? "justify-between" : "justify-center"
                    } `}
                  >
                    <span>{player.name}</span>
                    <div>
                      {info && (
                        <span className="text-xs text-gray-400">
                          {getPositionShort(info.mainPosition)}
                        </span>
                      )}
                      {info?.subPosition && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition)}
                        </span>
                      )}
                      {info?.subPosition2 && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {info && (
                    <div className="text-xs text-gray-400 mt-1">
                      승률: {info.recentWinRate}% | 게임: {info.recentGames}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {isComplete && (
            <p className="text-center text-green-400 mt-4 font-bold">
              ✅ 팀 구성 완료!
            </p>
          )}
        </div>

        {/* 레드팀 */}
        <div className="flex-1 max-w-xs">
          <h2 className="text-xl font-bold mb-4 text-red-400 text-center">
            레드팀
          </h2>
          <ul className="space-y-2">
            {/* 팀장 */}
            {redCaptain && (
              <li className="p-3 bg-red-900/50 border-2 border-red-400 rounded-lg">
                <div
                  className={`flex items-center ${
                    isLogin ? "justify-between" : "justify-center"
                  } `}
                >
                  <span>👑 {redCaptain.name}</span>
                  {getPlayerInfo(redCaptain.id) && (
                    <span className="text-xs text-gray-400">
                      {getPositionShort(
                        getPlayerInfo(redCaptain.id)!.mainPosition
                      )}
                    </span>
                  )}
                </div>
                {getPlayerInfo(redCaptain.id) && (
                  <div className="text-xs text-gray-400 mt-1">
                    승률: {getPlayerInfo(redCaptain.id)!.recentWinRate}%
                  </div>
                )}
              </li>
            )}
            {/* 팀원 */}
            {redTeam.map((player) => {
              const info = getPlayerInfo(player.id);
              return (
                <li
                  key={player.id}
                  className="p-3 bg-red-900/30 border border-red-600 rounded-lg"
                >
                  <div
                    className={`flex items-center ${
                      isLogin ? "justify-between" : "justify-center"
                    } `}
                  >
                    <span>{player.name}</span>
                    <div>
                      {info && (
                        <span className="text-xs text-gray-400">
                          {getPositionShort(info.mainPosition)}
                        </span>
                      )}
                      {info?.subPosition && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition)}
                        </span>
                      )}
                      {info?.subPosition2 && (
                        <span className="text-xs text-gray-400">
                          ·{getPositionShort(info.subPosition2)}
                        </span>
                      )}
                    </div>
                  </div>
                  {info && (
                    <div className="text-xs text-gray-400 mt-1">
                      승률: {info.recentWinRate}%
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            history.length === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-slate-600 hover:bg-slate-500 cursor-pointer"
          }`}
        >
          ↩️ 되돌아가기
        </button>
        <button
          onClick={resetDraft}
          disabled={blueTeam.length === 0 && redTeam.length === 0}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            blueTeam.length === 0 && redTeam.length === 0
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-500 cursor-pointer"
          }`}
        >
          🔄 다시뽑기
        </button>
      </div>
    </div>
  );
};

export default MakeTeam;
