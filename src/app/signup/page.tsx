import Image from "next/image";
import SignUp from "@/components/form/SignUp";
import Link from "next/link";

const Signup = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-no-repeat bg-cover bg-center bg-(image:--bg-signup)">
      {/* 돌아가기 */}
      <div className="absolute top-5 left-5">
        <Link
          href="/"
          className="font-bold text-2xl text-black flex items-center gap-2"
        >
          <Image
            src="/icon/Arrow_Left.png"
            alt="돌아가기 아이콘"
            width={24}
            height={24}
            className="invert"
          />
          <span className="hidden sm:block">돌아가기</span>
          <Image
            src="/icon/Home.png"
            alt="메인"
            width={24}
            height={24}
            className="invert block sm:hidden"
          />
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image
          src="/image/logo.png"
          alt="팀메이커 로고"
          width={500}
          height={300}
        />
        <div className="w-80 mb-10 sm:mb-0 sm:w-md md:w-xl">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Signup;
