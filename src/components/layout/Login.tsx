"use client";

import {
  isLoggedInAtom,
  userInfoAtom,
  isHydratedAtom,
} from "@/store/user.store";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const userInfo = useAtomValue(userInfoAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isHydrated = useAtomValue(isHydratedAtom);

  // Hydration 전에는 기본 상태(비로그인)로 표시
  const showLoggedIn = isHydrated && isLoggedIn;
  const userName = userInfo?.realName ?? "Guest";

  console.log(userInfo);

  return (
    <div className="flex items-center text-white">
      <span className="mr-4">
        {showLoggedIn ? (
          <>
            <span className="font-bold">{userName}</span>님, 환영합니다.
          </>
        ) : (
          "로그인 해주세요"
        )}
      </span>
      <div className="flex justify-center items-center gap-4">
        {showLoggedIn && (
          <Link
            href=""
            aria-label="마이페이지로 이동"
            className="interactive-scale"
          >
            <Image
              src={"/icon/Setting.webp"}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </Link>
        )}
        <Link href="/signin">
          <button
            type="button"
            className={`px-2 py-1 border font-bold rounded-4xl transition-colors cursor-pointer ${
              showLoggedIn
                ? "bg-red-300 border-red-400 hover:bg-red-400 focus-visible:bg-red-400"
                : "bg-blue-300 border-blue-400 hover:bg-blue-400 focus-visible:bg-blue-400"
            }`}
          >
            {showLoggedIn ? "로그아웃" : "로그인"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
