"use client";

import MyInfo from "@/components/mypage/MyInfo";
import RegisterPlayer from "@/components/mypage/RegisterPlayer";

const MyPage = () => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-between">
        <MyInfo />
        <RegisterPlayer />
      </div>
    </div>
  );
};

export default MyPage;
