import { ChooseBox } from "@/components/team-maker";

const TeamMaker = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <h2 className="text-6xl font-bold mb-20 text-center">
        팀 선정 방식을 선택해주세요
      </h2>
      <div className="flex gap-10 justify-center">
        <ChooseBox type="select" />
        <ChooseBox type="ai" />
      </div>
    </div>
  );
};

export default TeamMaker;
