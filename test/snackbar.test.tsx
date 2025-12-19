import { describe, it, expect } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import Snackbar from "@/components/common/Snackbar";
import { useSnackbar } from "@/hooks/useSnackbar";
import { snackbarAtom, SnackbarState } from "@/store/snackbar.store";

// Jotai Provider with initial values
const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: [[typeof snackbarAtom, SnackbarState]];
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const TestProvider = ({
  initialState,
  children,
}: {
  initialState?: SnackbarState;
  children: React.ReactNode;
}) => (
  <Provider>
    <HydrateAtoms
      initialValues={[
        [
          snackbarAtom,
          initialState || { open: false, message: "", severity: "info" },
        ],
      ]}
    >
      {children}
    </HydrateAtoms>
  </Provider>
);

// 테스트용 컴포넌트 - Snackbar 제어
const SnackbarTestController = () => {
  const { success, error, warning, info, hideSnackbar } = useSnackbar();

  return (
    <div>
      <button onClick={() => success("성공 메시지")}>Success</button>
      <button onClick={() => error("에러 메시지")}>Error</button>
      <button onClick={() => warning("경고 메시지")}>Warning</button>
      <button onClick={() => info("정보 메시지")}>Info</button>
      <button onClick={hideSnackbar}>Close</button>
      <Snackbar />
    </div>
  );
};

describe("Snackbar Store", () => {
  it("snackbarAtom 초기 상태가 올바르게 설정되어야 한다", () => {
    const initialState: SnackbarState = {
      open: false,
      message: "",
      severity: "info",
    };

    expect(initialState.open).toBe(false);
    expect(initialState.message).toBe("");
    expect(initialState.severity).toBe("info");
  });
});

describe("useSnackbar Hook", () => {
  // Hook 테스트를 위한 컴포넌트
  const HookTestComponent = ({
    onRender,
  }: {
    onRender: (hook: ReturnType<typeof useSnackbar>) => void;
  }) => {
    const hookResult = useSnackbar();
    onRender(hookResult);
    return null;
  };

  it("showSnackbar가 상태를 올바르게 업데이트해야 한다", async () => {
    let hookResult: ReturnType<typeof useSnackbar>;

    render(
      <TestProvider>
        <HookTestComponent onRender={(result) => (hookResult = result)} />
      </TestProvider>
    );

    // 초기 상태 확인
    expect(hookResult!.snackbar.open).toBe(false);

    // showSnackbar 호출
    await act(async () => {
      hookResult!.showSnackbar("테스트 메시지", "success");
    });

    expect(hookResult!.snackbar.open).toBe(true);
    expect(hookResult!.snackbar.message).toBe("테스트 메시지");
    expect(hookResult!.snackbar.severity).toBe("success");
  });

  it("hideSnackbar가 open을 false로 변경해야 한다", async () => {
    let hookResult: ReturnType<typeof useSnackbar>;

    render(
      <TestProvider
        initialState={{ open: true, message: "열린 상태", severity: "info" }}
      >
        <HookTestComponent onRender={(result) => (hookResult = result)} />
      </TestProvider>
    );

    expect(hookResult!.snackbar.open).toBe(true);

    await act(async () => {
      hookResult!.hideSnackbar();
    });

    expect(hookResult!.snackbar.open).toBe(false);
  });

  it("편의 메서드들이 올바른 severity를 설정해야 한다", async () => {
    let hookResult: ReturnType<typeof useSnackbar>;

    render(
      <TestProvider>
        <HookTestComponent onRender={(result) => (hookResult = result)} />
      </TestProvider>
    );

    // success
    await act(async () => {
      hookResult!.success("성공!");
    });
    expect(hookResult!.snackbar.severity).toBe("success");

    // error
    await act(async () => {
      hookResult!.error("에러!");
    });
    expect(hookResult!.snackbar.severity).toBe("error");

    // warning
    await act(async () => {
      hookResult!.warning("경고!");
    });
    expect(hookResult!.snackbar.severity).toBe("warning");

    // info
    await act(async () => {
      hookResult!.info("정보!");
    });
    expect(hookResult!.snackbar.severity).toBe("info");
  });
});

describe("Snackbar Component", () => {
  it("open이 true일 때 Snackbar가 표시되어야 한다", async () => {
    render(
      <TestProvider
        initialState={{ open: true, message: "테스트 알림", severity: "info" }}
      >
        <Snackbar />
      </TestProvider>
    );

    expect(screen.getByText("테스트 알림")).toBeInTheDocument();
  });

  it("open이 false일 때 Snackbar가 숨겨져야 한다", () => {
    render(
      <TestProvider
        initialState={{ open: false, message: "숨김 메시지", severity: "info" }}
      >
        <Snackbar />
      </TestProvider>
    );

    expect(screen.queryByText("숨김 메시지")).not.toBeInTheDocument();
  });

  it("success severity로 Snackbar가 표시되어야 한다", async () => {
    render(
      <TestProvider>
        <SnackbarTestController />
      </TestProvider>
    );

    const successButton = screen.getByRole("button", { name: "Success" });
    await userEvent.click(successButton);

    await waitFor(() => {
      expect(screen.getByText("성공 메시지")).toBeInTheDocument();
    });

    // MUI Alert의 success severity 클래스 확인
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledSuccess");
  });

  it("error severity로 Snackbar가 표시되어야 한다", async () => {
    render(
      <TestProvider>
        <SnackbarTestController />
      </TestProvider>
    );

    const errorButton = screen.getByRole("button", { name: "Error" });
    await userEvent.click(errorButton);

    await waitFor(() => {
      expect(screen.getByText("에러 메시지")).toBeInTheDocument();
    });

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledError");
  });

  it("warning severity로 Snackbar가 표시되어야 한다", async () => {
    render(
      <TestProvider>
        <SnackbarTestController />
      </TestProvider>
    );

    const warningButton = screen.getByRole("button", { name: "Warning" });
    await userEvent.click(warningButton);

    await waitFor(() => {
      expect(screen.getByText("경고 메시지")).toBeInTheDocument();
    });

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledWarning");
  });

  it("info severity로 Snackbar가 표시되어야 한다", async () => {
    render(
      <TestProvider>
        <SnackbarTestController />
      </TestProvider>
    );

    const infoButton = screen.getByRole("button", { name: "Info" });
    await userEvent.click(infoButton);

    await waitFor(() => {
      expect(screen.getByText("정보 메시지")).toBeInTheDocument();
    });

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledInfo");
  });

  it("닫기 버튼 클릭 시 Snackbar가 닫혀야 한다", async () => {
    render(
      <TestProvider>
        <SnackbarTestController />
      </TestProvider>
    );

    // Snackbar 열기
    const successButton = screen.getByRole("button", { name: "Success" });
    await userEvent.click(successButton);

    await waitFor(() => {
      expect(screen.getByText("성공 메시지")).toBeInTheDocument();
    });

    // MUI Alert 내부의 닫기 아이콘 버튼 클릭 (data-testid로 선택)
    const closeIcon = screen.getByTestId("CloseIcon");
    await userEvent.click(closeIcon);

    await waitFor(() => {
      expect(screen.queryByText("성공 메시지")).not.toBeInTheDocument();
    });
  });
});

describe("Snackbar Props", () => {
  it("다양한 position props가 적용되어야 한다", () => {
    const { rerender } = render(
      <TestProvider
        initialState={{ open: true, message: "위치 테스트", severity: "info" }}
      >
        <Snackbar vertical="top" horizontal="right" />
      </TestProvider>
    );

    // Snackbar가 렌더링되는지 확인
    expect(screen.getByText("위치 테스트")).toBeInTheDocument();

    // 다른 위치로 rerender
    rerender(
      <TestProvider
        initialState={{ open: true, message: "위치 테스트", severity: "info" }}
      >
        <Snackbar vertical="bottom" horizontal="left" />
      </TestProvider>
    );

    expect(screen.getByText("위치 테스트")).toBeInTheDocument();
  });

  it("다양한 variant props가 적용되어야 한다", () => {
    const { rerender } = render(
      <TestProvider
        initialState={{
          open: true,
          message: "variant 테스트",
          severity: "success",
        }}
      >
        <Snackbar variant="outlined" />
      </TestProvider>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-outlinedSuccess");

    rerender(
      <TestProvider
        initialState={{
          open: true,
          message: "variant 테스트",
          severity: "success",
        }}
      >
        <Snackbar variant="standard" />
      </TestProvider>
    );

    const alertStandard = screen.getByRole("alert");
    expect(alertStandard).toHaveClass("MuiAlert-standardSuccess");
  });
});
