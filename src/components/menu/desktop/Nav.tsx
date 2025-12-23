"use client";

import { isLoggedInAtom, isAuthLoadingAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  // 인증 확인 중에는 로그인 관련 메뉴 숨김 (깜빡임 방지)
  const showAuthMenu = !isAuthLoading && isLoggedIn;
  const path = usePathname();

  const isActive = (target: string) => {
    return path === target || path.startsWith(`${target}/`);
  };

  return (
    <nav className="text-white text-lg md:text-2xl text-nowrap">
      <ul className="flex gap-8 font-bold">
        <li
          className={`hover-underline-animation cursor-pointer ${
            isActive("/") ? "active-link" : ""
          }`}
        >
          <Link href="/">홈</Link>
        </li>
        <li
          className={`hover-underline-animation cursor-pointer ${
            isActive("/team-maker") ? "active-link" : ""
          }`}
        >
          <Link href="/team-maker">팀메이커</Link>
        </li>
        {showAuthMenu && (
          <li
            className={`hover-underline-animation cursor-pointer ${
              isActive("/statistics") ? "active-link" : ""
            }`}
          >
            <Link href="">통계</Link>
          </li>
        )}
        <li
          className={`hover-underline-animation cursor-pointer ${
            isActive("/news") ? "active-link" : ""
          }`}
        >
          <Link href="">뉴스</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
