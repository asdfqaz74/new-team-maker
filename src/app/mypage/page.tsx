"use client";

import MyInfo from "@/components/mypage/MyInfo";
import RecentMatches from "@/components/mypage/RecentMatches";
import RegisterPlayer from "@/components/mypage/RegisterPlayer";

const MyPage = () => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-10 justify-between">
        <MyInfo />
        <RegisterPlayer />
      </div>
      <RecentMatches />
    </div>
  );
};

export default MyPage;
