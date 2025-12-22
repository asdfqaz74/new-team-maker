"use client";

import { useSnackbar } from "@/hooks/useSnackbar";
import { useForm, useWatch } from "react-hook-form";
import { useAtom } from "jotai";
import { playersAtom } from "@/store/player.store";

type AddPlayerForm = {
  playerName: string;
};

const AddPlayer = () => {
  const { register, handleSubmit, control, reset } = useForm<AddPlayerForm>();
  const [players, setPlayers] = useAtom(playersAtom);
  const { success } = useSnackbar();

  const playerName = useWatch({
    control,
    name: "playerName",
  });

  const onSubmit = (data: AddPlayerForm) => {
    setPlayers((prev) => [...prev, data.playerName]);
    success("플레이어가 추가되었습니다!");
    reset();
  };

  const playerCount = players.length;

  return (
    <div className="border p-4 w-80">
      <p className="text-2xl font-bold">플레이어 추가 [ {playerCount} / 10 ]</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="플레이어 이름"
          {...register("playerName")}
          className={`border p-2 rounded-md mt-4 ${
            playerCount >= 10 ? "bg-gray-500/50 cursor-not-allowed" : ""
          }`}
          disabled={playerCount >= 10}
        />
        <button
          type="submit"
          className={`ml-2 px-4 py-2  text-white rounded-md  transition-colors  ${
            playerName
              ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-400"
          }`}
          disabled={!playerName || playerCount >= 10}
        >
          추가
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
