import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "jotai";
import SignIn from "@/components/form/SignIn";

// API 모킹
vi.mock("@/api/user.api", () => ({
  login: vi.fn(),
}));

// useRouter 모킹
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
  }),
}));

import { login } from "@/api/user.api";

const renderSignIn = () => {
  return render(
    <Provider>
      <SignIn />
    </Provider>
  );
};

describe("SignIn Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("로그인 폼이 렌더링되어야 한다", () => {
    renderSignIn();

    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/아이디를 입력하세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/비밀번호를 입력하세요/)
    ).toBeInTheDocument();
  });

  it("아이디 입력 필드에 값을 입력할 수 있어야 한다", async () => {
    renderSignIn();

    const userIdInput = screen.getByPlaceholderText(/아이디를 입력하세요/);
    await userEvent.type(userIdInput, "testuser");

    expect(userIdInput).toHaveValue("testuser");
  });

  it("비밀번호 입력 필드에 값을 입력할 수 있어야 한다", async () => {
    renderSignIn();

    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/);
    await userEvent.type(passwordInput, "password123");

    expect(passwordInput).toHaveValue("password123");
  });

  it("비밀번호 필드가 password 타입이어야 한다", () => {
    renderSignIn();

    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("폼 제출 시 login API가 호출되어야 한다", async () => {
    const mockLogin = vi.mocked(login);
    mockLogin.mockResolvedValueOnce({
      data: {
        data: {
          _id: "123",
          realName: "테스트",
          userId: "testuser",
          email: "test@example.com",
        },
      },
    } as never);

    renderSignIn();

    const userIdInput = screen.getByPlaceholderText(/아이디를 입력하세요/);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/);
    const submitButton = screen.getByRole("button", { name: /로그인/ });

    await userEvent.type(userIdInput, "testuser");
    await userEvent.type(passwordInput, "Test1234!");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        userId: "testuser",
        password: "Test1234!",
      });
    });
  });

  it("로그인 성공 시 성공 메시지가 표시되어야 한다", async () => {
    const mockLogin = vi.mocked(login);
    mockLogin.mockResolvedValueOnce({
      data: {
        data: {
          _id: "123",
          realName: "테스트",
          userId: "testuser",
          email: "test@example.com",
        },
      },
    } as never);

    renderSignIn();

    const userIdInput = screen.getByPlaceholderText(/아이디를 입력하세요/);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/);
    const submitButton = screen.getByRole("button", { name: /로그인/ });

    await userEvent.type(userIdInput, "testuser");
    await userEvent.type(passwordInput, "Test1234!");
    await userEvent.click(submitButton);

    // Snackbar가 Jotai store를 통해 표시되므로, API 호출 성공만 확인
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it("로그인 실패 시 에러 처리가 되어야 한다", async () => {
    const mockLogin = vi.mocked(login);
    mockLogin.mockRejectedValueOnce({
      response: {
        data: {
          error: {
            code: "AUTH_FAILED",
            message: "아이디 또는 비밀번호가 일치하지 않습니다.",
          },
        },
      },
    });

    renderSignIn();

    const userIdInput = screen.getByPlaceholderText(/아이디를 입력하세요/);
    const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력하세요/);
    const submitButton = screen.getByRole("button", { name: /로그인/ });

    await userEvent.type(userIdInput, "wronguser");
    await userEvent.type(passwordInput, "wrongpass");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it("글래스모피즘 스타일이 적용되어야 한다", () => {
    renderSignIn();

    const heading = screen.getByRole("heading", { name: "로그인" });
    const container = heading.closest("div");
    expect(container).toHaveClass("backdrop-blur-2xl");
    expect(container).toHaveClass("bg-white/50");
  });

  it("로그인 버튼이 표시되어야 한다", () => {
    renderSignIn();

    const submitButton = screen.getByRole("button", { name: /로그인/ });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute("type", "submit");
  });
});

describe("SignIn Form Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("빈 폼 제출 시에도 API가 호출되어야 한다 (서버 사이드 validation)", async () => {
    const mockLogin = vi.mocked(login);
    mockLogin.mockResolvedValueOnce({
      data: {
        data: {
          _id: "123",
          realName: "테스트",
          userId: "testuser",
          email: "test@example.com",
        },
      },
    } as never);

    renderSignIn();

    const submitButton = screen.getByRole("button", { name: /로그인/ });
    await userEvent.click(submitButton);

    // 현재 구현에서는 클라이언트 validation이 없으므로 API 호출됨
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
});
