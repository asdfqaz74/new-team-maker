import { useSnackbar } from "@/hooks/useSnackbar";
import { playersAtom, sessionPlayersAtom } from "@/store/player.store";
import { ParticipantPlayer } from "@/types/team-maker";
import { useAtom, useSetAtom } from "jotai";
import Image from "next/image";

const PlayerGroup = ({ players }: { players: ParticipantPlayer[] }) => {
  const { error: showError } = useSnackbar();

  const setPlayerList = useSetAtom(playersAtom);
  const [sessionPlayers, setSessionPlayers] = useAtom(sessionPlayersAtom);

  const sessionPlayersLength = sessionPlayers.length;

  const handleRemovePlayerButton = (playerId: string) => {
    setPlayerList((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        value: prev.value.filter((player) => player.id !== playerId),
      };
    });

    setSessionPlayers((prev) =>
      prev.filter((player) => player.id !== playerId)
    );
  };

  const handleAddPlayer = (player: ParticipantPlayer) => {
    if (sessionPlayersLength >= 10) {
      showError("참가명단은 최대 10명까지 추가할 수 있습니다.");
      return;
    }

    setSessionPlayers((prev) => {
      // 중복 추가 방지
      if (prev.find((p) => p.id === player.id)) {
        showError("이미 참가명단에 추가된 플레이어입니다.");
        return prev;
      }
      return [...prev, player];
    });
  };

  return (
    <div className="flex flex-col gap-2 w-24">
      {players.map((player) => (
        <div
          key={player.id}
          className="flex flex-row-reverse items-center justify-between"
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
              width={18}
              height={18}
              aria-hidden="true"
            />
          </button>
          <span
            className="peer-hover:scale-105 peer-hover:font-bold peer-hover:text-rose-400 transition-transform w-20 truncate hover:scale-105 cursor-pointer hover:font-bold hover:text-cyan-400 focus-visible:scale-105 focus-visible:font-bold focus-visible:text-cyan-400 focus-visible:outline-none"
            onClick={() => handleAddPlayer(player)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleAddPlayer(player);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${player.name}를 참가명단에 추가하기`}
          >
            {player.name}
          </span>
        </div>
      ))}
    </div>
  );
};
export default PlayerGroup;
