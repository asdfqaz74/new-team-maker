import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import ClientProvider from "@/components/provider/ClientProvider";
import { getServerAuth } from "@/lib/auth";

export const metadata: Metadata = {
  metadataBase: new URL("https://team-maker.xyz"),

  title: {
    default: "팀메이커",
    template: "팀메이커 | %s",
  },
  description:
    "리그오브레전드 내전 팀을 자동으로 구성해주는 팀메이커. 포지션, 실력, 승률을 고려한 공정한 팀 매칭을 제공합니다.",

  keywords: [
    "팀메이커",
    "LOL 팀짜기",
    "롤 내전",
    "롤 팀 매칭",
    "리그오브레전드 내전",
    "LOL custom game",
  ],

  authors: [{ name: "팀메이커", url: "https://team-maker.xyz" }],
  creator: "JS_Kang",
  publisher: "none",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://team-maker.xyz",
    siteName: "팀메이커",
    title: "팀메이커 | LoL 내전 팀 자동 매칭",
    description: "포지션과 실력을 고려해 공정한 내전 팀을 자동으로 구성하세요.",
    images: [
      {
        url: "/image/logo.png",
        width: 800,
        height: 600,
        alt: "팀메이커 - LoL 내전 팀 자동 매칭",
      },
    ],
  },

  icons: {
    icon: "/logo.ico",
    shortcut: "/logo.ico",
    apple: "/logo.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 서버에서 인증 상태 확인
  const initialUser = await getServerAuth();

  return (
    <html lang="ko-kr">
      <body className={`antialiased`}>
        <ClientProvider initialUser={initialUser}>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
