import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUp from "@/components/form/SignUp";

// API mock
vi.mock("@/api/user.api", () => ({
  signup: vi.fn(),
}));

// useSnackbar mock
vi.mock("@/hooks/useSnackbar", () => ({
  useSnackbar: () => ({
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
  }),
}));

describe("SignUp Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("회원가입 폼이 렌더링되어야 한다", () => {
    render(<SignUp />);

    expect(
      screen.getByPlaceholderText(/이메일을 입력하세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/이름을 입력하세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/아이디를 입력하세요/)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/문자\+숫자 조합 8자 이상/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /회원가입/ })
    ).toBeInTheDocument();
  });

  it("개인정보 동의 체크박스가 체크되지 않으면 버튼이 비활성화되어야 한다", () => {
    render(<SignUp />);

    const submitButton = screen.getByRole("button", { name: /회원가입/ });
    expect(submitButton).toBeDisabled();
  });

  it("개인정보 동의 체크박스를 체크하면 버튼이 활성화되어야 한다", async () => {
    render(<SignUp />);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    const submitButton = screen.getByRole("button", { name: /회원가입/ });
    expect(submitButton).toBeEnabled();
  });

  it("필수 필드가 비어있으면 에러 메시지가 표시되어야 한다", async () => {
    render(<SignUp />);

    // 체크박스 체크
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    // 폼 제출
    const submitButton = screen.getByRole("button", { name: /회원가입/ });
    await userEvent.click(submitButton);

    // 에러 메시지 확인
    await waitFor(() => {
      expect(screen.getByText(/이메일을 입력해주세요/)).toBeInTheDocument();
    });
  });

  it("잘못된 이메일 형식에 에러 메시지가 표시되어야 한다", async () => {
    render(<SignUp />);

    // @ 포함하지만 형식이 잘못된 이메일 사용 (HTML5 validation 통과, pattern validation 실패)
    const emailInput = screen.getByPlaceholderText(/이메일을 입력하세요/);
    await userEvent.type(emailInput, "invalid@email");

    // 체크박스 체크 및 제출
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    const submitButton = screen.getByRole("button", { name: /회원가입/ });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/올바른 이메일 형식이 아닙니다/)
      ).toBeInTheDocument();
    });
  });

  it("비밀번호가 일치하지 않으면 에러 메시지가 표시되어야 한다", async () => {
    render(<SignUp />);

    // 모든 필드 채우기
    await userEvent.type(
      screen.getByPlaceholderText(/이메일을 입력하세요/),
      "test@example.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/이름을 입력하세요/),
      "홍길동"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/아이디를 입력하세요/),
      "testuser1"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/문자\+숫자 조합 8자 이상/),
      "Test1234!"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/비밀번호를 입력하세요/),
      "Different1!"
    );

    // 체크박스 체크 및 제출
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    const submitButton = screen.getByRole("button", { name: /회원가입/ });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/비밀번호가 일치하지 않습니다/)
      ).toBeInTheDocument();
    });
  });
});
