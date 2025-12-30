import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팀 구성 완료",
  description:
    "최종 팀 구성 결과를 확인하세요. 블루팀과 레드팀의 선수 명단과 포지션 정보.",
  openGraph: {
    title: "팀 구성 완료 | 팀메이커",
    description:
      "최종 팀 구성 결과를 확인하세요. 블루팀과 레드팀의 선수 명단과 포지션 정보.",
  },
};

export default function Step5Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
