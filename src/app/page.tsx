import Image from "next/image";
import Counter from "@/components/Counter";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-(family-name:--font-geist-sans)">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">
            넥스트 + 테일윈드 + 조타이 스타터 템플릿
          </h1>
          <p className="text-sm text-gray-500">
            This is a starter template initialized with Next.js 15, Tailwind CSS
            v4, and Jotai.
          </p>

          <Counter />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/signup"
          className="font-bold text-2xl text-black flex items-center gap-2"
        >
          Sign Up
        </Link>
      </footer>
    </div>
  );
}
