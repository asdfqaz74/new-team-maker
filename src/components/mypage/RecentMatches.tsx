import { getDashboardRecentMatches } from "@/api/mypage.api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const teamMap: { [key: string]: string } = {
  RED: "레드팀",
  BLUE: "블루팀",
};

const RecentMatches = () => {
  const {
    data: recentMatches,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentMatches"],
    queryFn: () => getDashboardRecentMatches().then((res) => res.data || []),
  });

  return (
    <div>
      <p className="text-2xl font-bold">최근 경기</p>
      <div className="border-2 p-4 border-white/10 rounded-lg bg-[#0E1625] mt-4">
        {isLoading ? (
          <p className="text-center text-gray-400">불러오는 중...</p>
        ) : isError ? (
          <p className="text-center text-red-400">
            경기 정보를 불러오는데 실패했습니다.
          </p>
        ) : !recentMatches?.length ? (
          <p className="text-center text-gray-400">최근 경기가 없습니다.</p>
        ) : (
          recentMatches.map((match) => (
            <div key={match._id}>
              <p>{teamMap[match.metadata.winTeam]} 승리</p>
              <div>
                {match.players.map((player) => {
                  const reds = player.team === "RED";
                  return (
                    <div key={reds} className="flex justify-between">
                      <Image
                        src={
                          "https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Aatrox.png"
                        }
                        alt=""
                        width={32}
                        height={32}
                      />
                      <span>{reds.riotIdGameName}</span>
                      <span>
                        {reds.kills} / {reds.deaths} / {reds.assists}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentMatches;
