"use client";

import { AddPlayer, ParticipantPlayer } from "@/components/team-maker";
import { useState } from "react";

const SelectStep2 = () => {
  // Lazy Initializer 패턴 적용: 초기 렌더링 시에만 실행됨
  const [playerList, setPlayerList] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const storedPlayers = localStorage.getItem("players");
    return storedPlayers ? JSON.parse(storedPlayers) : [];
  });

  return (
    <div>
      <AddPlayer setPlayerList={setPlayerList} />
      <ParticipantPlayer playerList={playerList} />
    </div>
  );
};

export default SelectStep2;
