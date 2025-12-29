"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  playersAtom,
  isPlayersHydratedAtom,
  loginPlayersAtom,
} from "@/store/player.store";
import PlayerGroup from "./PlayerGroup";
import { isLoggedInAtom } from "@/store/user.store";

const ParticipantPlayer = () => {
  const playerList = useAtomValue(playersAtom); // 비로그인 플레이어 목록
  const loginPlayerList = useAtomValue(loginPlayersAtom); // 로그인 플레이어 목록
  const isHydrated = useAtomValue(isPlayersHydratedAtom);
  const setIsHydrated = useSetAtom(isPlayersHydratedAtom);
  const isLogin = useAtomValue(isLoggedInAtom);

  // 클라이언트 마운트 후 hydration 완료 표시
  useEffect(() => {
    setIsHydrated(true);
  }, [setIsHydrated]);

  /* ------- console.log("대기명단", fetchW); ------- */

  // 플레이어를 절반으로 나누기
  let currentPlayers = [];
  if (isLogin) {
    currentPlayers = loginPlayerList || [];
  } else {
    currentPlayers = playerList?.value || [];
  }
  const firstGroup = currentPlayers.slice(0, 10);
  const secondGroup = currentPlayers.slice(10, 15);

  // 아직 hydration 안됐으면 로딩 표시
  if (!isHydrated) {
    return (
      <div className="border p-4 w-80 md:w-96 text-center">불러오는 중...</div>
    );
  }

  return (
    <div className="border p-4 w-80 md:w-96 flex flex-col gap-4 h-117.5">
      <p className="text-2xl text-center font-bold">대기명단</p>
      {currentPlayers.length === 0 ? (
        <p className="text-center">플레이어가 없습니다.</p>
      ) : (
        <>
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-sm font-medium">
              클릭하여 플레이어를 추가해주세요
            </p>

            <p className="text-xs">
              (
              <span className="text-cyan-500 font-medium">참가명단에 추가</span>{" "}
              /
              <span className="text-rose-500 font-medium">
                대기명단에서 삭제
              </span>
              )
            </p>
          </div>

          <div className="flex justify-center gap-8">
            <div
              role="group"
              aria-label="첫 번째 그룹"
              className="flex flex-col gap-2 w-24"
            >
              <PlayerGroup players={firstGroup} />
            </div>
            <div
              role="group"
              aria-label="두 번째 그룹"
              className="flex flex-col gap-2 w-24"
            >
              <PlayerGroup players={secondGroup} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ParticipantPlayer;
