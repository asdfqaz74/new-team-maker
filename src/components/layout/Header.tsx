"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";
import Desktop from "../menu/desktop/Desktop";
import Mobile from "../menu/mobile/Mobile";

const Header = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // signup 경로에서는 Header 숨김
  if (pathname.includes("signup") || pathname.includes("signin")) {
    return null;
  }

  return (
    <header className="flex items-center justify-between px-8 py-4">
      <Link href="/" aria-label="홈으로 이동">
        <Image src={"/image/logo.png"} alt="팀메이커" width={90} height={90} />
      </Link>
      {isMobile ? (
        <Mobile />
      ) : (
        <>
          <Desktop />
        </>
      )}
    </header>
  );
};

export default Header;
