import Aside from "@/components/layout/Aside";

const MyPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-bg-login bg-cover flex">
      <Aside />
      {children}
    </div>
  );
};

export default MyPageLayout;
