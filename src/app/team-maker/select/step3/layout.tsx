import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팀장 정하기",
  description:
    "팀장 후보를 선택하고 무작위 추첨으로 블루팀/레드팀 팀장을 선정하세요.",
  openGraph: {
    title: "팀장 정하기 | 팀메이커",
    description:
      "팀장 후보를 선택하고 무작위 추첨으로 블루팀/레드팀 팀장을 선정하세요.",
  },
};

export default function Step3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
