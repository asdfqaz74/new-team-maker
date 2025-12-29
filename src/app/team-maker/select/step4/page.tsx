"use client";

import TeamMakerButton from "@/components/team-maker/button/TeamMakerButton";
import MakeTeam from "@/components/team-maker/MakeTeam";
import { useRouter } from "next/navigation";

const SelectStep4 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center my-20">
      <h1 className="text-3xl font-bold mb-8">팀원 정하기</h1>
      <MakeTeam />
      <div className="flex justify-center gap-4">
        <TeamMakerButton
          label="이전으로"
          onClick={() => {
            router.push("/team-maker/select/step3?phase=draw");
          }}
        />
        <TeamMakerButton
          label="다음으로"
          onClick={() => {
            router.push("/team-maker/select/step5");
          }}
        />
      </div>
    </div>
  );
};

export default SelectStep4;
