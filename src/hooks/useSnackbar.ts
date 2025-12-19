"use client";

import { useAtom } from "jotai";
import { useCallback } from "react";
import { snackbarAtom, SnackbarSeverity } from "@/store/snackbar.store";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useAtom(snackbarAtom);

  const showSnackbar = useCallback(
    (message: string, severity: SnackbarSeverity = "info") => {
      setSnackbar({ open: true, message, severity });
    },
    [setSnackbar]
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, [setSnackbar]);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
    // 편의 메서드
    success: (message: string) => showSnackbar(message, "success"),
    error: (message: string) => showSnackbar(message, "error"),
    warning: (message: string) => showSnackbar(message, "warning"),
    info: (message: string) => showSnackbar(message, "info"),
  };
};
