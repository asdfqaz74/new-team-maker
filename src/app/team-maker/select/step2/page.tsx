"use client";

import { AddPlayer, ParticipantPlayer } from "@/components/team-maker";
import JoinList from "@/components/team-maker/JoinList";

const SelectStep2 = () => {
  return (
    <div className="min-h-142 flex flex-col justify-center items-center my-10">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-center md:items-stretch gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <AddPlayer />
          <ParticipantPlayer />
        </div>
        <JoinList />
      </div>
    </div>
  );
};

export default SelectStep2;
