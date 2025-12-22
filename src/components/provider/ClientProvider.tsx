"use client";

import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Snackbar from "@/components/common/Snackbar";
import { userInfoAtom, isAuthLoadingAtom } from "@/store/user.store";
import { LoginInfoItem } from "@/types/user";

type ClientProviderProps = {
  children: React.ReactNode;
  initialUser: LoginInfoItem | null;
};

// 서버에서 받은 초기값으로 Jotai 상태 hydrate
const HydrateAtoms = ({
  initialUser,
  children,
}: {
  initialUser: LoginInfoItem | null;
  children: React.ReactNode;
}) => {
  useHydrateAtoms([
    [userInfoAtom, initialUser],
    [isAuthLoadingAtom, false], // 서버에서 이미 확인했으므로 로딩 완료
  ]);
  return <>{children}</>;
};

const ClientProvider = ({ children, initialUser }: ClientProviderProps) => {
  return (
    <Provider>
      <HydrateAtoms initialUser={initialUser}>
        {children}
        <Snackbar />
      </HydrateAtoms>
    </Provider>
  );
};

export default ClientProvider;
