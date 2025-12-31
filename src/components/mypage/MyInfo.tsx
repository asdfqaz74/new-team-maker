"use client";

import { userInfoAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";

const MyInfo = () => {
  const userInfo = useAtomValue(userInfoAtom);

  const userName = userInfo?.realName || "게스트";
  const userEmail = userInfo?.email || "이메일 없음";
  const userNickname = userInfo?.userId || "닉네임 없음";
  const userSubAccount = !!userInfo?.subAccount?.isEnabled;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">내 정보</h2>
      <p className="mb-2 text-xl">
        <strong>{userName}</strong>
      </p>
      <p className="mb-2 text-white/60">
        <strong>{userNickname}</strong>
      </p>
      <p className="mb-2 text-white/60">
        <strong>{userEmail}</strong>
      </p>
      <div className="flex items-center gap-1">
        <span>서브 계정:</span>
        <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-xs">
          {userSubAccount ? "활성화됨" : "비활성화됨"}
        </span>
      </div>
    </div>
  );
};

export default MyInfo;
