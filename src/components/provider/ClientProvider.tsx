"use client";

import { Provider } from "jotai";
import Snackbar from "@/components/common/Snackbar";

type ClientProviderProps = {
  children: React.ReactNode;
};

const ClientProvider = ({ children }: ClientProviderProps) => {
  return (
    <Provider>
      {children}
      <Snackbar />
    </Provider>
  );
};

export default ClientProvider;
