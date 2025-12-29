import Image from "next/image";
import { useAtom, useAtomValue } from "jotai";
import { isLoggedInAtom } from "@/store/user.store";
import {
  loginSessionPlayersAtom,
  sessionPlayersAtom,
} from "@/store/player.store";

const JoinList = () => {
  /* -------------------------------------------- */
  /*                     상태 관리                    */
  /* -------------------------------------------- */
  const isLogin = useAtomValue(isLoggedInAtom);

  const [players, setPlayers] = useAtom(
    isLogin ? loginSessionPlayersAtom : sessionPlayersAtom
  );

  /* -------------------------------------------- */
  /*                     파생 상태                    */
  /* -------------------------------------------- */
  const playerCount = players.length;

  /* -------------------------------------------- */
  /*                    이벤트 핸들러                   */
  /* -------------------------------------------- */

  // 대기명단에서 플레이어 삭제 버튼
  const handleRemovePlayerButton = (playerId: string) => {
    setPlayers((prev) => prev.filter((player) => player.id !== playerId));
  };

  return (
    <div className="border py-4 px-8 w-80 md:w-96">
      <p className="text-2xl text-center font-bold mb-10">
        참가명단 [ {playerCount} / 10 ]
      </p>
      {players.length === 0 ? (
        <p className="text-center">플레이어가 없습니다.</p>
      ) : (
        <ul className="list-disc list-inside flex flex-col gap-4 justify-center items-center">
          {players.map((player) => (
            <li
              key={player.id}
              className="truncate flex flex-row-reverse items-center justify-between w-52"
            >
              <button
                type="button"
                aria-label={`${player.name}를 대기명단에서 삭제`}
                className="peer cursor-pointer hover:scale-105 transition-transform"
                onClick={() => handleRemovePlayerButton(player.id)}
              >
                <Image
                  src={"/icon/Close.png"}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </button>
              <span className="peer-hover:scale-105 peer-hover:font-bold peer-hover:text-rose-400 transition-transform">
                {player.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JoinList;
