import Link from "next/link";
import Login from "../Login";
import Nav from "./Nav";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8">
      <Link href="/" aria-label="홈으로 이동">
        <Image src={"/image/logo.png"} alt="팀메이커" width={90} height={90} />
      </Link>
      <Nav />
      <Login />
    </header>
  );
};

export default Header;
