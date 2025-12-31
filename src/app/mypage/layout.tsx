import Aside from "@/components/layout/Aside";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="py-20 px-10 flex w-full min-h-[calc(100vh-100px)]">
      <Aside />
      <div className="bg-[#070C18] w-full p-10 ml-10">{children}</div>
    </div>
  );
};

export default MyPageLayout;
