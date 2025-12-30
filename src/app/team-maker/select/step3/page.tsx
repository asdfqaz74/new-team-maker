"use client";

import { getPlayerList } from "@/api/team-maker.api";
import TeamMakerButton from "@/components/team-maker/button/TeamMakerButton";
import SelectLeader from "@/components/team-maker/SelectLeader";
import TeamLeader from "@/components/team-maker/TeamLeader";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  blueCaptainAtom,
  captainPlayerAtom,
  loginSessionPlayersAtom,
  playerInfoAtom,
  redCaptainAtom,
  sessionPlayersAtom,
} from "@/store/player.store";
import { isLoggedInAtom } from "@/store/user.store";
import { AxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const SelectStep3Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phase = searchParams.get("phase") || "select";
  const selectedTeamLeader = useAtomValue(captainPlayerAtom);
  const blueCaptain = useAtomValue(blueCaptainAtom);
  const redCaptain = useAtomValue(redCaptainAtom);
  const isLogin = useAtomValue(isLoggedInAtom);
  const playerList = useAtomValue(
    isLogin ? loginSessionPlayersAtom : sessionPlayersAtom
  );
  const setPlayerInfo = useSetAtom(playerInfoAtom);

  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawComplete, setIsDrawComplete] = useState(false);

  const { error: showError } = useSnackbar();

  const isSlectPhase = phase === "select";
  const isDrawPhase = phase === "draw";
  const isDisabled =
    selectedTeamLeader === null || selectedTeamLeader.length < 2;

  const playerIds = playerList.map((player) => player.id);

  const handleStartDraw = () => {
    setIsDrawing(true);
    setIsDrawComplete(false);
  };

  const handleDrawComplete = () => {
    setIsDrawing(false);
    setIsDrawComplete(true);
  };

  const handleNextPage = async () => {
    try {
      if (isLogin) {
        const response = await getPlayerList(playerIds);
        const playersData = response.data.players;
        setPlayerInfo(playersData);
      }
      router.push("/team-maker/select/step4");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error(error.response?.data.error.code);

      showError("선수 정보를 불러오는 데 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <h1 className="text-3xl font-bold mb-8">팀장 정하기</h1>
      {isSlectPhase && (
        <>
          <h2 className="text-xl font-bold mb-4">
            1. 팀장에 선택될 인원을 고르세요.
          </h2>
          <TeamLeader />
          <div className="flex justify-center gap-4">
            <TeamMakerButton
              label="이전으로"
              onClick={() => {
                router.push("/team-maker/select/step2");
              }}
            />
            <TeamMakerButton
              label="다음으로"
              onClick={() => {
                router.push("/team-maker/select/step3?phase=draw");
              }}
              disabled={isDisabled}
            />
          </div>
        </>
      )}
      {isDrawPhase && (
        <>
          <h2 className="text-xl font-bold mb-4">
            2. 무작위로 팀장을 선정합니다.
          </h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-400" />
              <span> = 블루팀 </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-red-400" />
              <span> = 레드팀 </span>
            </div>
          </div>
          <SelectLeader
            isDrawing={isDrawing}
            onDrawComplete={handleDrawComplete}
            duration={7000}
          />

          {/* 추첨 결과 표시 */}
          {isDrawComplete && blueCaptain && redCaptain && (
            <div className="mb-6 text-center">
              <p className="text-xl font-bold text-yellow-400 mb-2">
                🎉 팀장 선정 완료!
              </p>
              <div className="flex gap-8 justify-center">
                <p className="text-blue-400 font-semibold">
                  블루팀: {blueCaptain.name}
                </p>
                <p className="text-red-400 font-semibold">
                  레드팀: {redCaptain.name}
                </p>
              </div>
            </div>
          )}

          {/* 다시뽑기 버튼 */}
          {isDrawComplete && (
            <div className="flex justify-center mb-4">
              <TeamMakerButton label="🎲 다시뽑기" onClick={handleStartDraw} />
            </div>
          )}

          <div className="flex justify-center gap-4">
            <TeamMakerButton
              label="이전으로"
              onClick={() => {
                router.push("/team-maker/select/step3?phase=select");
              }}
              disabled={isDrawing}
            />
            {!isDrawComplete ? (
              <TeamMakerButton
                label={isDrawing ? "추첨 중..." : "팀장뽑기"}
                onClick={handleStartDraw}
                disabled={isDisabled || isDrawing}
              />
            ) : (
              <TeamMakerButton label="다음으로" onClick={handleNextPage} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const SelectStep3 = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center my-20">
          불러오는 중...
        </div>
      }
    >
      <SelectStep3Content />
    </Suspense>
  );
};

export default SelectStep3;
