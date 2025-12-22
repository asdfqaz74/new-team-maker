"use client";

type ParticipantPlayerProps = {
  playerList?: string[];
};

const ParticipantPlayer = ({ playerList = [] }: ParticipantPlayerProps) => {
  return <div>{playerList.join(", ")}</div>;
};

export default ParticipantPlayer;
