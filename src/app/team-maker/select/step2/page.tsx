"use client";

import { AddPlayer, ParticipantPlayer } from "@/components/team-maker";
import TeamMakerButton from "@/components/team-maker/button/TeamMakerButton";
import JoinList from "@/components/team-maker/JoinList";
import {
  loginSessionPlayersAtom,
  sessionPlayersAtom,
} from "@/store/player.store";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";

const SelectStep2 = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const playerList = useAtomValue(
    isLoggedIn ? loginSessionPlayersAtom : sessionPlayersAtom
  );

  const isDisabled = playerList.length !== 10;

  return (
    <div className="min-h-142 flex flex-col justify-center items-center my-20">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-stretch gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <AddPlayer isLogin={isLoggedIn} />
          <ParticipantPlayer />
        </div>
        <JoinList />
      </div>
      <div className="flex justify-center gap-4">
        <TeamMakerButton
          label="이전으로"
          onClick={() => {
            router.push("/team-maker");
          }}
        />
        <TeamMakerButton
          label="다음으로"
          onClick={() => {
            router.push("/team-maker/select/step3?phase=select");
          }}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default SelectStep2;
