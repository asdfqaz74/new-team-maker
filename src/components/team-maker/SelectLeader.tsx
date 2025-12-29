import {
  blueCaptainAtom,
  captainPlayerAtom,
  redCaptainAtom,
} from "@/store/player.store";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useRef, useState } from "react";

const gridClassMap: Record<number, string> = {
  1: "md:grid-cols-1",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

type TeamColor = "blue" | "red" | null;

type SelectLeaderProps = {
  isDrawing: boolean;
  onDrawComplete: () => void;
  duration?: number; // 애니메이션 지속 시간 (ms)
};

const SelectLeader = ({
  isDrawing,
  onDrawComplete,
  duration = 7000,
}: SelectLeaderProps) => {
  const isLogin = useAtomValue(isLoggedInAtom);
  const selectedTeamLeader = useAtomValue(captainPlayerAtom);
  const [, setBlueCaptain] = useAtom(blueCaptainAtom);
  const [, setRedCaptain] = useAtom(redCaptainAtom);

  // 각 플레이어의 현재 색상 상태
  const [colorMap, setColorMap] = useState<Record<string, TeamColor>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const count = selectedTeamLeader?.length ?? 0;

  const getColunmCount = (count: number) => {
    if (count === 5 || count === 10) return 5;
    if (count === 6 || count === 9) return 3;
    if (count === 7 || count === 8) return 4;
    return count;
  };

  const columnCount = getColunmCount(count);

  // 랜덤으로 블루 1명, 레드 1명만 색상 배정
  const shuffleColors = useCallback(() => {
    if (!selectedTeamLeader || selectedTeamLeader.length < 2) return;

    // 랜덤으로 2명 선택
    const shuffled = [...selectedTeamLeader].sort(() => Math.random() - 0.5);
    const bluePlayer = shuffled[0];
    const redPlayer = shuffled[1];

    const newColorMap: Record<string, TeamColor> = {};
    selectedTeamLeader.forEach((player) => {
      if (player.id === bluePlayer.id) {
        newColorMap[player.id] = "blue";
      } else if (player.id === redPlayer.id) {
        newColorMap[player.id] = "red";
      } else {
        newColorMap[player.id] = null;
      }
    });
    setColorMap(newColorMap);
  }, [selectedTeamLeader]);

  // 최종 결과 확정 (블루 1명, 레드 1명)
  const finalizeResult = useCallback(() => {
    if (!selectedTeamLeader || selectedTeamLeader.length < 2) return;

    const shuffled = [...selectedTeamLeader].sort(() => Math.random() - 0.5);
    const bluePlayer = shuffled[0];
    const redPlayer = shuffled[1];

    // 최종 색상 맵 설정
    const finalColorMap: Record<string, TeamColor> = {};
    selectedTeamLeader.forEach((player) => {
      if (player.id === bluePlayer.id) {
        finalColorMap[player.id] = "blue";
      } else if (player.id === redPlayer.id) {
        finalColorMap[player.id] = "red";
      } else {
        finalColorMap[player.id] = null;
      }
    });

    setColorMap(finalColorMap);
    setBlueCaptain(bluePlayer);
    setRedCaptain(redPlayer);
  }, [selectedTeamLeader, setBlueCaptain, setRedCaptain]);

  // 애니메이션 실행
  useEffect(() => {
    if (!isDrawing) return;

    startTimeRef.current = Date.now();
    let currentInterval = 50; // 시작 간격 (ms)

    const runAnimation = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = elapsed / duration;

      if (progress >= 1) {
        // 애니메이션 종료
        if (intervalRef.current) {
          clearTimeout(intervalRef.current);
        }
        finalizeResult();
        onDrawComplete();
        return;
      }

      // 색상 셔플
      shuffleColors();

      // 점점 느려지는 간격 계산 (이징 함수 적용)
      // progress가 1에 가까워질수록 간격이 급격히 늘어남
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentInterval = 50 + easeOut * 500; // 50ms → 550ms

      intervalRef.current = setTimeout(runAnimation, currentInterval);
    };

    runAnimation();

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isDrawing, duration, shuffleColors, finalizeResult, onDrawComplete]);

  // 색상에 따른 outline 클래스
  const getOutlineClass = (playerId: string) => {
    const color = colorMap[playerId];
    if (color === "blue") return "outline-4 outline-blue-400";
    if (color === "red") return "outline-4 outline-red-400";
    return "";
  };

  return (
    <ul
      className={`grid grid-cols-1 ${gridClassMap[columnCount]} gap-4 mb-8 text-center`}
    >
      {selectedTeamLeader?.map((player) => (
        <li
          key={player.id}
          className={`p-10 bg-slate-700 transition-all duration-100 ${getOutlineClass(
            player.id
          )}`}
        >
          {player.name}
        </li>
      ))}
    </ul>
  );
};

export default SelectLeader;
