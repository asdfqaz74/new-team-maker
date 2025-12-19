import { atom } from "jotai";

export type SnackbarSeverity = "success" | "error" | "warning" | "info";

export type SnackbarState = {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
};

export const snackbarAtom = atom<SnackbarState>({
  open: false,
  message: "",
  severity: "info",
});
