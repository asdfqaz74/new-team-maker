"use client";

import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";
import { logout } from "@/api/user.api";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useResetGameState } from "@/hooks/useResetGameState";
import { useAtomValue, useSetAtom } from "jotai";
import {
  isLoggedInAtom,
  userInfoAtom,
  isAuthLoadingAtom,
} from "@/store/user.store";
import { useRouter } from "next/navigation";

const Login = () => {
  /* -------------------------------------------- */
  /*                     상태관리                     */
  /* -------------------------------------------- */
  const userInfo = useAtomValue(userInfoAtom);
  const setUserInfo = useSetAtom(userInfoAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  /* -------------------------------------------- */
  /*                    커스텀훅 사용                   */
  /* -------------------------------------------- */
  const { success, error: showError } = useSnackbar();
  const { resetGameState } = useResetGameState();

  /* -------------------------------------------- */
  /*                     기본설정                     */
  /* -------------------------------------------- */
  const showLoggedIn = !isAuthLoading && isLoggedIn;
  const userName = userInfo?.realName ?? "Guest";
  const router = useRouter();

  /* -------------------------------------------- */
  /*                    이벤트 핸들러                   */
  /* -------------------------------------------- */
  const handleLogout = async () => {
    try {
      await logout();
      setUserInfo(null);
      resetGameState(); // 게임 상태 초기화
      router.push("/");

      success("로그아웃 되었습니다.");
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      console.error(error.response?.data.error.code);

      showError("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="flex items-center text-white text-nowrap">
      <span className="mr-4 text-sm">
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
            href="/mypage"
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
