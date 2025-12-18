import SignUp from "@/components/form/SignUp";
import Image from "next/image";

const Signup = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center flex-col md:flex-row"
      style={{ backgroundImage: "url('/image/signup_bg.jpg')" }}
    >
      <Image src="/image/logo.png" alt="" width={500} height={300} />
      <div className="w-80 sm:w-xl md:w-3xl">
        <SignUp />
      </div>
    </div>
  );
};

export default Signup;
