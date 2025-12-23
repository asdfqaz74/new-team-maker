"use client";

import Link from "next/link";
import { AxiosError } from "axios";
import { logout } from "@/api/user.api";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isLoggedInAtom,
  userInfoAtom,
  isAuthLoadingAtom,
} from "@/store/user.store";

const Login = () => {
  const userInfo = useAtomValue(userInfoAtom);
  const setUserInfo = useSetAtom(userInfoAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  const { success, error: showError } = useSnackbar();

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
    <div className="px-6 py-4 border-t border-white/10 text-white">
      {showLoggedIn ? (
        <div className="flex flex-col gap-3">
          <span className="text-sm">
            <span className="font-bold">{userName}</span>님, 환영합니다.
          </span>
          <button
            type="button"
            className="w-full py-2 text-center font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/signin" className="block">
          <button
            type="button"
            className="w-full py-2 text-center font-bold rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
          >
            로그인
          </button>
        </Link>
      )}
    </div>
  );
};

export default Login;
