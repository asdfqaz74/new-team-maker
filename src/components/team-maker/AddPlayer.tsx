"use client";

import { useSnackbar } from "@/hooks/useSnackbar";
import { useForm, useWatch } from "react-hook-form";
import { useAtom } from "jotai";
import { playersAtom } from "@/store/player.store";
import Image from "next/image";
import { v4 } from "uuid";

type AddPlayerForm = {
  playerName: string;
  id: string;
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
    setPlayers((prev) => {
      const currentPlayers = prev?.value || [];
      return {
        value: [...currentPlayers, { id: v4(), name: data.playerName }],
        expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7일 후 만료
      };
    });
    success("플레이어가 추가되었습니다!");
    reset();
  };

  const playerCount = players?.value?.length || 0;

  return (
    <div className="border p-4 w-80 md:w-96">
      <div className="flex items-start justify-between">
        <p className="text-2xl font-bold">
          플레이어 추가 [ {playerCount} / 15 ]
        </p>
        <div className="relative group inline-block">
          <Image
            src={"/icon/Info.png"}
            alt="도움말"
            width={24}
            height={24}
            className="cursor-help"
            tabIndex={0}
          />
          <div
            role="tooltip"
            className="
      pointer-events-none
      absolute bottom-full -left-52 md:left-1/2 md:-translate-x-1/2 mb-2
      whitespace-nowrap
      rounded-md bg-gray-800 px-3 py-2 text-xs text-white
      opacity-0 scale-95
      transition
      group-hover:opacity-100 group-hover:scale-100
      group-focus-within:opacity-100 group-focus-within:scale-100
    "
          >
            <ul>
              <li className="list-inside list-disc">
                비로그인은 최대 15명까지 추가할 수 있습니다.
              </li>
              <li className="list-inside list-disc">
                플레이어는 최대 7일간 저장됩니다.
              </li>
              <li className="list-inside list-disc">
                플레이어가 추가되면 저장 기간이 갱신됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="플레이어 이름(10자 이내)"
            {...register("playerName")}
            className={`border p-2 rounded-md flex-1 min-w-0 ${
              playerCount >= 15 ? "bg-gray-500/50 cursor-not-allowed" : ""
            }`}
            disabled={playerCount >= 15}
            maxLength={10}
          />
          <button
            type="submit"
            className={`px-4 py-2 text-white rounded-md transition-colors shrink-0 ${
              playerName
                ? "cursor-pointer bg-blue-500 hover:bg-blue-600"
                : "cursor-not-allowed bg-gray-400"
            }`}
            disabled={!playerName || playerCount >= 15}
          >
            추가
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlayer;
