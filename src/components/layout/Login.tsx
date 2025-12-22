"use client";

import { logout } from "@/api/user.api";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  isLoggedInAtom,
  userInfoAtom,
  isAuthLoadingAtom,
} from "@/store/user.store";
import { AxiosError } from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const userInfo = useAtomValue(userInfoAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  const setUserInfo = useSetAtom(userInfoAtom);

  const { success, error: showError } = useSnackbar();

  // 인증 확인 중에는 기본 상태(비로그인)로 표시
  const showLoggedIn = !isAuthLoading && isLoggedIn;
  const userName = userInfo?.realName ?? "Guest";

  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo(null);
      success("로그아웃 되었습니다.");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error(error.response?.data.error.code);

      showError("로그아웃에 실패했습니다.");
    }
  };

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
        {!showLoggedIn ? (
          <Link href="/signin">
            <button
              type="button"
              className="px-2 py-1 border font-bold rounded-4xl transition-colors cursor-pointer bg-blue-300 border-blue-400 hover:bg-blue-400 focus-visible:bg-blue-400
              "
            >
              로그인
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="px-2 py-1 border font-bold rounded-4xl transition-colors cursor-pointer bg-red-300 border-red-400 hover:bg-red-400 focus-visible:bg-red-400"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
