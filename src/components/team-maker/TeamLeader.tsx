import {
  captainPlayerAtom,
  loginSessionPlayersAtom,
  sessionPlayersAtom,
} from "@/store/player.store";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtom, useAtomValue } from "jotai";

import type { ParticipantPlayer } from "@/types/team-maker";

const TeamLeader = () => {
  /* -------------------------------------------- */
  /*                     상태 관리                    */
  /* -------------------------------------------- */
  const isLogin = useAtomValue(isLoggedInAtom);
  const playerList = useAtomValue(
    isLogin ? loginSessionPlayersAtom : sessionPlayersAtom
  );
  const [teamLeaders, setTeamLeaders] = useAtom(captainPlayerAtom);

  /* -------------------------------------------- */
  /*                    이벤트 핸들러                   */
  /* -------------------------------------------- */
  // 팀장 선택 핸들러
  const handleTeamLeaderSelect = (player: ParticipantPlayer) => {
    setTeamLeaders((prev) => {
      if (prev) {
        // 이미 선택된 팀장일 경우 해제;
        if (prev.some((leader) => leader.id === player.id)) {
          return prev.filter((leader) => leader.id !== player.id);
        }
        return [...prev, player];
      } else {
        return [player];
      }
    });
  };

  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center"
      role="listbox"
      aria-multiselectable="true"
    >
      {playerList.map((player) => (
        <li
          key={player.id}
          className={`p-10 bg-slate-700 hover:bg-slate-900 cursor-pointer focus-visible:outline-2 focus-visible:outline-yellow-300 focus-visible:bg-slate-900 ${
            teamLeaders?.some((leader) => leader.id === player.id)
              ? "outline-4 outline-blue-500"
              : ""
          }`}
          onClick={() => handleTeamLeaderSelect(player)}
          role="option"
          aria-selected={teamLeaders?.some((leader) => leader.id === player.id)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleTeamLeaderSelect(player);
            }
          }}
        >
          {player.name}
        </li>
      ))}
    </ul>
  );
};

export default TeamLeader;
