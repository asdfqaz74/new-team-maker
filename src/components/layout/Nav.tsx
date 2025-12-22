"use client";

import { isLoggedInAtom, isAuthLoadingAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";
import Link from "next/link";

const Nav = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  // 인증 확인 중에는 로그인 관련 메뉴 숨김 (깜빡임 방지)
  const showAuthMenu = !isAuthLoading && isLoggedIn;

  return (
    <nav className="text-white">
      <ul className="flex gap-8 text-2xl font-bold">
        <li className="hover-underline-animation cursor-pointer">
          <Link href="/">홈</Link>
        </li>
        <li className="hover-underline-animation cursor-pointer">
          <Link href="">팀메이커</Link>
        </li>
        {showAuthMenu && (
          <li className="hover-underline-animation cursor-pointer">
            <Link href="">통계</Link>
          </li>
        )}
        <li className="hover-underline-animation cursor-pointer">
          <Link href="">뉴스</Link>
        </li>
        <li className="hover-underline-animation cursor-pointer">
          <Link href="">패치노트</Link>
        </li>
        <li className="hover-underline-animation cursor-pointer">
          <Link href="">문의</Link>
        </li>
        {showAuthMenu && (
          <li className="hover-underline-animation cursor-pointer">
            <Link href="">마이페이지</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
