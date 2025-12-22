"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { playersAtom, isPlayersHydratedAtom } from "@/store/player.store";

const ParticipantPlayer = () => {
  const playerList = useAtomValue(playersAtom);
  const isHydrated = useAtomValue(isPlayersHydratedAtom);
  const setIsHydrated = useSetAtom(isPlayersHydratedAtom);

  // 클라이언트 마운트 후 hydration 완료 표시
  useEffect(() => {
    setIsHydrated(true);
  }, [setIsHydrated]);

  // 아직 hydration 안됐으면 로딩 표시
  if (!isHydrated) {
    return <div className="border p-4 w-80">로딩 중...</div>;
  }

  return (
    <div className="border p-4 w-80">
      {playerList.length === 0 ? (
        <div className="text-gray-400">플레이어가 없습니다</div>
      ) : (
        playerList.map((player, index) => (
          <div key={`player-${index}`}>{player}</div>
        ))
      )}
    </div>
  );
};

export default ParticipantPlayer;
