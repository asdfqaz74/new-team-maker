import SignIn from "@/components/form/SignIn";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-(image:--bg-login)">
      {/* 돌아가기 */}
      <div className="absolute top-5 left-5">
        <Link
          href="/"
          className="font-bold text-2xl text-white flex items-center gap-2"
        >
          <Image
            src="/icon/Arrow_Left.png"
            alt="돌아가기 아이콘"
            width={24}
            height={24}
          />
          <span className="hidden sm:block">돌아가기</span>
          <Image
            src="/icon/Home.png"
            alt="메인"
            width={24}
            height={24}
            className="block sm:hidden"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div />
        <div className="w-80 mb-10 sm:mb-0 sm:w-md md:w-xl">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Signin;
