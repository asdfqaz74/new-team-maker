"use client";

import {
  Snackbar as MuiSnackbar,
  Alert,
  Fade,
  Slide,
  Grow,
} from "@mui/material";
import { SlideProps } from "@mui/material/Slide";
import { useSnackbar } from "@/hooks/useSnackbar";

// Slide는 direction 설정이 필요
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

// transition 컴포넌트 매핑
const transitionComponents = {
  fade: Fade,
  slide: SlideTransition,
  grow: Grow,
};

type SnackbarProps = {
  vertical?: "top" | "bottom";
  horizontal?: "left" | "center" | "right";
  variant?: "filled" | "outlined" | "standard";
  transition?: "fade" | "slide" | "grow";
};

const Snackbar = ({
  vertical = "bottom",
  horizontal = "center",
  variant = "filled",
  transition = "slide",
}: SnackbarProps) => {
  const { snackbar, hideSnackbar } = useSnackbar();

  return (
    <MuiSnackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      slots={{ transition: transitionComponents[transition] }}
    >
      <Alert
        onClose={hideSnackbar}
        severity={snackbar.severity}
        variant={variant}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
