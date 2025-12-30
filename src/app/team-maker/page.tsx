import { ChooseBox } from "@/components/team-maker";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팀 선정 선택",
  description:
    "직접 선택 또는 AI 자동 매칭으로 공정한 팀을 구성하세요. 포지션과 실력을 고려한 내전 팀 밸런싱.",
  openGraph: {
    title: "팀 선정 선택 | 팀메이커",
    description:
      "직접 선택 또는 AI 자동 매칭으로 공정한 팀을 구성하세요. 포지션과 실력을 고려한 내전 팀 밸런싱.",
  },
};

const TeamMaker = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-6xl font-bold mb-20 text-center">
        팀 선정 방식을 선택해주세요
      </h2>
      <div className="flex flex-col md:flex-row gap-10 justify-center px-2">
        <ChooseBox type="select" />
        <ChooseBox type="ai" />
      </div>
    </div>
  );
};

export default TeamMaker;
