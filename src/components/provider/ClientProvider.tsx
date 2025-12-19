"use client";

import { Provider, useSetAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useEffect } from "react";
import Snackbar from "@/components/common/Snackbar";
import { isHydratedAtom } from "@/store/user.store";

type ClientProviderProps = {
  children: React.ReactNode;
};

// Hydration 완료를 추적하는 컴포넌트
const HydrateTracker = ({ children }: { children: React.ReactNode }) => {
  const setHydrated = useSetAtom(isHydratedAtom);

  useEffect(() => {
    setHydrated(true);
  }, [setHydrated]);

  return <>{children}</>;
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <Provider>
      <HydrateTracker>
        {children}
        <Snackbar />
      </HydrateTracker>
    </Provider>
  );
};

export default ClientProvider;
