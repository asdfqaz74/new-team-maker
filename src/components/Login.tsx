import { isLoggedInAtom, userInfoAtom } from "@/store/user.store";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [userInfo] = useAtom(userInfoAtom);
  const [isLoggedIn] = useAtom(isLoggedInAtom);

  const userName = userInfo ? userInfo.realName : "Guest";

  return (
    <div className="flex items-center text-white">
      <span className="mr-4">
        {isLoggedIn ? (
          <>
            <span className="font-bold">{userName}</span>님, 환영합니다.
          </>
        ) : (
          "로그인 해주세요"
        )}
      </span>
      <div className="flex justify-center items-center gap-4">
        {isLoggedIn && (
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
        <button
          type="button"
          className={`px-2 py-1 border font-bold rounded-4xl transition-colors cursor-pointer ${
            isLoggedIn
              ? "bg-red-300 border-red-400 hover:bg-red-400 focus-visible:bg-red-400"
              : "bg-blue-300 border-blue-400 hover:bg-blue-400 focus-visible:bg-blue-400"
          }`}
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
      </div>
    </div>
  );
};

export default Login;
