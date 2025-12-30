import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팀원 정하기",
  description:
    "스네이크 드래프트 방식으로 팀원을 선택하세요. 블루팀과 레드팀의 균형 잡힌 팀 구성.",
  openGraph: {
    title: "팀원 정하기 | 팀메이커",
    description:
      "스네이크 드래프트 방식으로 팀원을 선택하세요. 블루팀과 레드팀의 균형 잡힌 팀 구성.",
  },
};

export default function Step4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
