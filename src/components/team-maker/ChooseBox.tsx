"use client";

import { useSnackbar } from "@/hooks/useSnackbar";
import { isLoggedInAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ChooseBoxProps = {
  type: "select" | "ai";
};

const boxType: Record<
  ChooseBoxProps["type"],
  { title: string; desc: string; desc2?: string }
> = {
  select: {
    title: "직접 선택",
    desc: "팀원을 직접 선택하여 팀을 구성합니다.",
    desc2: "로그인 없이 이용 가능합니다.",
  },
  ai: {
    title: "AI 추천",
    desc: "AI가 최적의 팀 구성을 추천해드립니다.",
    desc2: "로그인 후 이용 가능합니다.",
  },
};

const ChooseBox = ({ type }: ChooseBoxProps) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();

  const { info } = useSnackbar();
  const { title, desc, desc2 } = boxType[type];

  const handleTypeButton = async (type: ChooseBoxProps["type"]) => {
    if (!isLoggedIn && type === "ai") {
      info("로그인 후 이용 가능합니다.");
      return;
    }

    await localStorage.setItem("teamMakerType", type);
    if (type === "select") {
      router.push("/team-maker/select/step2");
    }
    if (type === "ai") {
      router.push("/team-maker/ai/step2");
    }
  };

  return (
    <button
      className="border rounded-lg px-10 py-6 hover:bg-gray-600 transition-all hover:scale-105 duration-200 cursor-pointer relative"
      onClick={() => handleTypeButton(type)}
    >
      {type === "ai" && (
        <Image
          src={"/icon/Ai.png"}
          alt="ai"
          width={20}
          height={20}
          className="absolute right-4 top-4 invert"
        />
      )}
      <h3 className="text-3xl font-bold mb-4">{title}</h3>
      <p>{desc}</p>
      {desc2 && <p className="mt-2 text-sm text-gray-400">{desc2}</p>}
    </button>
  );
};

export default ChooseBox;
