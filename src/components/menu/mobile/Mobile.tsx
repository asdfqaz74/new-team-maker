import Image from "next/image";
import { useState } from "react";
import Nav from "./Nav";
import Login from "./Login";
import Link from "next/link";
import { useAtomValue } from "jotai";
import { isAuthLoadingAtom, isLoggedInAtom } from "@/store/user.store";

const Mobile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  const showLoggedIn = !isAuthLoading && isLoggedIn;

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        className="cursor-pointer"
        onClick={handleMenuClick}
      >
        <Image
          src={"/icon/Menu.png"}
          alt=""
          aria-hidden="true"
          width={46}
          height={46}
        />
      </button>

      {/* 배경 오버레이 */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* 슬라이드 메뉴 */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 닫기 버튼 */}
        <div
          className={`flex items-center p-4 ${
            showLoggedIn ? "justify-between" : "justify-end"
          }`}
        >
          {showLoggedIn && (
            <Link
              href=""
              aria-label="마이페이지로 이동"
              className="interactive-scale"
            >
              <Image
                src={"/icon/Setting.webp"}
                alt=""
                width={32}
                height={32}
                aria-hidden="true"
              />
            </Link>
          )}
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="cursor-pointer"
            onClick={handleClose}
          >
            <Image
              src={"/icon/Close.png"}
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
            />
          </button>
        </div>
        <Nav onClose={handleClose} />
        <Login />
      </div>
    </div>
  );
};

export default Mobile;
