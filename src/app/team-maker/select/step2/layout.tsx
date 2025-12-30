import { Metadata } from "next";

export const metadata: Metadata = {
  title: "참가선수명단",
  description:
    "직접 선택 또는 AI 자동 매칭으로 공정한 팀을 구성하세요. 포지션과 실력을 고려한 내전 팀 밸런싱.",
  openGraph: {
    title: "참가선수명단 | 팀메이커",
    description:
      "직접 선택 또는 AI 자동 매칭으로 공정한 팀을 구성하세요. 포지션과 실력을 고려한 내전 팀 밸런싱.",
  },
};

export default function Step2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
