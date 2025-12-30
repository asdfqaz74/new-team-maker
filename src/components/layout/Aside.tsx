"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Aside = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="border border-white/10 rounded-lg py-10 px-4 bg-[#0E1625] w-72 h-250 flex flex-col justify-between">
      <div className="w-full">
        <div className="text-4xl pb-4 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-px after:w-[90%] after:bg-white/30 text-center font-bold">
          마이페이지
        </div>
        <ul className="flex flex-col gap-10 mt-10 px-4 text-2xl">
          <li>
            <Link
              href="/mypage"
              className={`block p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                isActive("/mypage") ? "bg-white/10" : ""
              }`}
            >
              내 정보
            </Link>
          </li>
          <li>
            <Link
              href="/mypage/player-management"
              className={`block p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                isActive("/mypage/player-management") ? "bg-white/10" : ""
              }`}
            >
              선수 관리
            </Link>
          </li>
          <li>
            <Link
              href="/mypage/match-management"
              className={`block p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40 ${
                isActive("/mypage/match-management") ? "bg-white/10" : ""
              }`}
            >
              매치 관리
            </Link>
          </li>
        </ul>
      </div>
      <button className="mt-30 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer w-full">
        회원탈퇴
      </button>
    </aside>
  );
};

export default Aside;
