"use client";

import { AddPlayer, ParticipantPlayer } from "@/components/team-maker";

const SelectStep2 = () => {
  return (
    <div className="flex flex-col">
      <AddPlayer />
      <ParticipantPlayer />
    </div>
  );
};

export default SelectStep2;
