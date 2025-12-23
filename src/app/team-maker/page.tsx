import { ChooseBox } from "@/components/team-maker";

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
