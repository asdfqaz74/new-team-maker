import { getDashboardPlayerList } from "@/api/mypage.api";
import { dashboardPlayerList } from "@/store/mypage.store";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const positionMap: { [key: string]: string } = {
  TOP: "탑",
  JUNGLE: "정글",
  MIDDLE: "미드",
  BOTTOM: "원딜",
  UTILITY: "서포터",
};

const RegisterPlayer = () => {
  const [playerList, setPlayerList] = useAtom(dashboardPlayerList);

  useEffect(() => {
    if (!playerList && playerList === null) {
      try {
        getDashboardPlayerList().then((response) => {
          setPlayerList(response.data || null);
        });
      } catch (error) {
        console.error("플레이어 목록 조회에 실패했습니다.", error);
      }
    }
  }, [playerList, setPlayerList]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-2xl">최근 등록된 플레이어</div>
        <Link
          href={"/mypage/player-management"}
          className="flex items-center gap-1 text-sm transition-transform hover:scale-105"
        >
          <Image
            src={"/icon/Plus.png"}
            alt=""
            width={12}
            height={12}
            className="invert"
          />
          더보기
        </Link>
      </div>
      <div className="border-2 p-4 border-white/10 rounded-lg bg-[#0E1625]">
        {playerList ? (
          <div className="flex gap-10">
            <ul className="space-y-3">
              {playerList.first.map((player) => (
                <li key={player.gameName} className="w-28 ">
                  <p className="font-bold text-lg">{player.realName}</p>
                  <p className="text-sm truncate text-ellipsis">
                    <span>{player.gameName}</span>#<span>{player.tagLine}</span>
                  </p>
                  <p>{positionMap[player.mainPosition]}</p>
                </li>
              ))}
            </ul>

            <ul className="space-y-3">
              {playerList.second.map((player) => (
                <li key={player.gameName} className="w-28 ">
                  <p className="font-bold text-lg">{player.realName}</p>
                  <p className="text-sm truncate text-ellipsis">
                    <span>{player.gameName}</span>#<span>{player.tagLine}</span>
                  </p>
                  <p>{positionMap[player.mainPosition]}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>플레이어 목록을 불러오는 중입니다...</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPlayer;
