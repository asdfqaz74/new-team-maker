"use client";

import { useSnackbar } from "@/hooks/useSnackbar";
import { useForm, useWatch } from "react-hook-form";
import type { Dispatch, SetStateAction } from "react";

type AddPlayerForm = {
  playerName: string;
};

type AddPlayerProps = {
  setPlayerList?: Dispatch<SetStateAction<string[]>>;
};

const AddPlayer = ({ setPlayerList }: AddPlayerProps) => {
  const { register, handleSubmit, control, reset } = useForm<AddPlayerForm>();

  const { success } = useSnackbar();

  const playerName = useWatch({
    control,
    name: "playerName",
  });

  const onSubmit = (data: AddPlayerForm) => {
    const storedPlayers = localStorage.getItem("players");
    const players = storedPlayers ? JSON.parse(storedPlayers) : [];

    const newPlayers = [...players, data.playerName];
    localStorage.setItem("players", JSON.stringify(newPlayers));

    if (setPlayerList) {
      setPlayerList(newPlayers);
    }

    success("플레이어가 추가되었습니다!");
    reset();
  };

  return (
    <div className="border p-4">
      <p className="text-2xl font-bold">플레이어 추가</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="플레이어 이름"
          {...register("playerName")}
          className="border p-2 rounded-md mt-4"
        />
        <button
          type="submit"
          className={`ml-2 px-4 py-2  text-white rounded-md  transition-colors  ${
            playerName
              ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          추가
        </button>
      </form>
    </div>
  );
};

export default AddPlayer;
