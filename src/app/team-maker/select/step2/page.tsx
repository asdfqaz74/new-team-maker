"use client";

import { AddPlayer, ParticipantPlayer } from "@/components/team-maker";
import JoinList from "@/components/team-maker/JoinList";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";

const SelectStep2 = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <div className="min-h-142 flex flex-col justify-center items-center my-20">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-stretch gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <AddPlayer isLogin={isLoggedIn} />
          <ParticipantPlayer />
        </div>
        <JoinList />
      </div>
    </div>
  );
};

export default SelectStep2;
