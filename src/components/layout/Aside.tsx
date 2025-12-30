const Aside = () => {
  return (
    <aside className="border border-white/10 rounded-lg py-10 px-4 bg-[#0E1625] w-72">
      <div className="px-10 text-4xl pb-4 relative after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 after:h-px after:w-[90%] after:bg-white/30">
        마이페이지
      </div>
      <ul className="flex flex-col gap-10 mt-10 px-4 text-2xl">
        <li className="cursor-pointer hover:bg-white/10">내 정보</li>
        <li className="cursor-pointer hover:bg-white/10">선수 관리</li>
        <li className="cursor-pointer hover:bg-white/10">매치 관리</li>
      </ul>
      <button className="mt-30 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer w-full">
        회원탈퇴
      </button>
    </aside>
  );
};

export default Aside;
