import {
  blueCaptainAtom,
  blueTeamAtom,
  playerInfoAtom,
  redCaptainAtom,
  redTeamAtom,
} from "@/store/player.store";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";

const Final = () => {
  const redTeamPlayers = useAtomValue(redTeamAtom);
  const redTeamCaptain = useAtomValue(redCaptainAtom);
  const blueTeamPlayers = useAtomValue(blueTeamAtom);
  const blueTeamCaptain = useAtomValue(blueCaptainAtom);
  const playersInfo = useAtomValue(playerInfoAtom);
  const isLogin = useAtomValue(isLoggedInAtom);

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

  return (
    <div className="w-full max-w-4xl">
      <div className="flex gap-8 justify-center">
        {/* 블루팀 */}
        <div className="flex-1 max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">
            🔵 블루팀
          </h2>
          <ul className="space-y-3">
            {/* 팀장 */}
            {blueTeamCaptain && (
              <li className="p-4 bg-blue-900/50 border-2 border-blue-400 rounded-lg">
                <div
                  className={`flex items-center ${
                    isLogin ? "justify-between" : "justify-center"
                  } `}
                >
                  <span className="font-semibold">
                    👑 {blueTeamCaptain.name}
                  </span>
                  {getPlayerInfo(blueTeamCaptain.id) && (
                    <span className="text-sm text-blue-300">
                      {getPositionShort(
                        getPlayerInfo(blueTeamCaptain.id)!.mainPosition
                      )}
                    </span>
                  )}
                </div>
                {getPlayerInfo(blueTeamCaptain.id) && (
                  <div className="text-xs text-gray-400 mt-2">
                    승률: {getPlayerInfo(blueTeamCaptain.id)!.recentWinRate}% |
                    게임: {getPlayerInfo(blueTeamCaptain.id)!.recentGames}
                  </div>
                )}
              </li>
            )}
            {/* 팀원 */}
            {blueTeamPlayers.map((player) => {
              const info = getPlayerInfo(player.id);
              return (
                <li
                  key={player.id}
                  className="p-4 bg-blue-900/30 border border-blue-600 rounded-lg"
                >
                  <div
                    className={`flex items-center ${
                      isLogin ? "justify-between" : "justify-center"
                    } `}
                  >
                    <span>{player.name}</span>
                    {info && (
                      <span className="text-sm text-blue-300">
                        {getPositionShort(info.mainPosition)}
                      </span>
                    )}
                  </div>
                  {info && (
                    <div className="text-xs text-gray-400 mt-2">
                      승률: {info.recentWinRate}% | 게임: {info.recentGames}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* 레드팀 */}
        <div className="flex-1 max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-red-400 text-center">
            🔴 레드팀
          </h2>
          <ul className="space-y-3">
            {/* 팀장 */}
            {redTeamCaptain && (
              <li className="p-4 bg-red-900/50 border-2 border-red-400 rounded-lg">
                <div
                  className={`flex items-center ${
                    isLogin ? "justify-between" : "justify-center"
                  } `}
                >
                  <span className="font-semibold">
                    👑 {redTeamCaptain.name}
                  </span>
                  {getPlayerInfo(redTeamCaptain.id) && (
                    <span className="text-sm text-red-300">
                      {getPositionShort(
                        getPlayerInfo(redTeamCaptain.id)!.mainPosition
                      )}
                    </span>
                  )}
                </div>
                {getPlayerInfo(redTeamCaptain.id) && (
                  <div className="text-xs text-gray-400 mt-2">
                    승률: {getPlayerInfo(redTeamCaptain.id)!.recentWinRate}% |
                    게임: {getPlayerInfo(redTeamCaptain.id)!.recentGames}
                  </div>
                )}
              </li>
            )}
            {/* 팀원 */}
            {redTeamPlayers.map((player) => {
              const info = getPlayerInfo(player.id);
              return (
                <li
                  key={player.id}
                  className="p-4 bg-red-900/30 border border-red-600 rounded-lg"
                >
                  <div
                    className={`flex items-center ${
                      isLogin ? "justify-between" : "justify-center"
                    } `}
                  >
                    <span>{player.name}</span>
                    {info && (
                      <span className="text-sm text-red-300">
                        {getPositionShort(info.mainPosition)}
                      </span>
                    )}
                  </div>
                  {info && (
                    <div className="text-xs text-gray-400 mt-2">
                      승률: {info.recentWinRate}% | 게임: {info.recentGames}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Final;
