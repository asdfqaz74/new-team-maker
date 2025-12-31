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
      <p className="mb-2 text-4xl">
        <strong>{userName}</strong>
      </p>
      <p className="mb-2">
        <strong>{userNickname}</strong>
      </p>
      <p className="mb-2">
        <strong>{userEmail}</strong>
      </p>
      <p className="mb-2">
        <strong>서브계정: {userSubAccount ? "활성화" : "비활성화"}</strong>
      </p>
    </div>
  );
};

export default MyInfo;
