import { isAuthLoadingAtom, isLoggedInAtom } from "@/store/user.store";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavProps = {
  onClose: () => void;
};

const Nav = ({ onClose }: NavProps) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const isAuthLoading = useAtomValue(isAuthLoadingAtom);

  const showAuthMenu = !isAuthLoading && isLoggedIn;
  const path = usePathname();

  const isActive = (target: string) => {
    return path === target || path.startsWith(`${target}/`);
  };

  const menuItems = [
    { href: "/", label: "홈", show: true },
    { href: "/team-maker", label: "팀메이커", show: true },
    { href: "/statistics", label: "통계", show: showAuthMenu },
    { href: "/news", label: "뉴스", show: true },
  ];

  return (
    <nav className="text-white">
      <ul className="flex flex-col">
        {menuItems
          .filter((item) => item.show)
          .map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`block px-6 py-4 text-lg font-medium border-b border-white/10 transition-colors hover:bg-white/10 ${
                  isActive(item.href) ? "bg-white/20 text-blue-400" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Nav;
